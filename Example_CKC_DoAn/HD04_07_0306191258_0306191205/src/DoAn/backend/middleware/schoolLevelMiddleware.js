export const checkSchoolLevelNameEmpty = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(500)
      .json({ message: "The school level name can't be empty" });
  }

  if (!name.trim()) {
    return res
      .status(500)
      .json({ message: "The school level name can not be left blank" });
  }

  next();
};
