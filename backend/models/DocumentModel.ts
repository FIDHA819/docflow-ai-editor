import { Schema, model } from "mongoose";

const documentSchema = new Schema(
  {
    title: String,

    content: {
      type: Object,
      default: {},
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    sharedWith: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Document", documentSchema);