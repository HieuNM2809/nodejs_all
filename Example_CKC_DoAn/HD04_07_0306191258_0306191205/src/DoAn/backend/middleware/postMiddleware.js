export const checkTitleEmpty = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(500).json({ message: "The title can't be empty" });
  }

  if (!title.trim()) {
    return res.status(500).json({ message: "The title can't be left blank" });
  }

  next();
};

export const checkIdEmpty = (req, res, next) => {
  const { postTypeId } = req.body;
  if (!postTypeId) {
    return res
      .status(500)
      .json({ message: "The request could not be fulfilled" });
  }

  if (!postTypeId.trim()) {
    return res.status(500).json({ message: "Id can't be empty" });
  }

  next();
};
