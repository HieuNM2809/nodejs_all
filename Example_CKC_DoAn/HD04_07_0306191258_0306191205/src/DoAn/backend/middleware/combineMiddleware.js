export const checkCombineNameEmpty = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(500)
      .json({ message: "The combine name can't be empty" });
  }

  if (!name.trim()) {
    return res
      .status(500)
      .json({ message: "The combine name can not be left blank" });
  }

  next();
};
