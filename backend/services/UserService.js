const user = await User.findOne({
  email,
});

if (!user)
  throw new Error("Invalid credentials");

const valid = await bcrypt.compare(
  password,
  user.password
);

if (!valid)
  throw new Error("Invalid credentials");

const token = jwt.sign(
  {
    userId: user._id,
  },
  process.env.JWT_SECRET!
);

return token;