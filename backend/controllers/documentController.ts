import { Response } from "express";
import Document from "../models/DocumentModel";
import User from "../models/UserModel";
import { AuthRequest } from "../middlewares/JWTMiddleware";

export const createDocument = async (
  req: AuthRequest,
  res: Response
) => {
  const doc = await Document.create({
    title: "Untitled Document",
    content: {},
    owner: req.userId,
  });

  res.status(201).json(doc);
};

export const getDocuments = async (
  req: AuthRequest,
  res: Response
) => {
  const owned = await Document.find({
    owner: req.userId,
  });

  const shared = await Document.find({
    sharedWith: { $in: [req.userId] },
  });

  res.json({
    owned,
    shared,
  });
};

export const getDocument = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const document = await Document.findById(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        message: "Document Not Found",
      });
    }

    res.json(document);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const updateDocument = async (
  req: AuthRequest,
  res: Response
) => {
  const document =
    await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(document);
};

export const deleteDocument = async (
  req: AuthRequest,
  res: Response
) => {
  await Document.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted",
  });
};

export const shareDocument = async (
  req: AuthRequest,
  res: Response
) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  const document =
    await Document.findById(
      req.params.id
    );
console.log("Sharing with:", email);
console.log("Found user:", user);
console.log("Before:", document.sharedWith);

document.sharedWith.push(user._id);

console.log("After:", document.sharedWith);
  if (!document)
    return res.status(404).json({
      message: "Document Not Found",
    });

  document.sharedWith.push(
    user._id
  );

  await document.save();

  res.json({
    message: "Shared Successfully",
  });
};