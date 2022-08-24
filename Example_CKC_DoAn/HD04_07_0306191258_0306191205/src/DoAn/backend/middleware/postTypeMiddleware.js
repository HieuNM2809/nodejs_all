export const checkPostTypeNameEmpty = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(500)
      .json({ message: "The post type name can't be empty" });
  }

  if (!name.trim()) {
    return res
      .status(500)
      .json({ message: "The post type name can not be left blank" });
  }

  next();
};
