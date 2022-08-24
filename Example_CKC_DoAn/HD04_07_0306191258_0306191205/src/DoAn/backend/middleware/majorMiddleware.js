export const checkIdEmpty = (req, res, next) => {
  const { combineId } = req.body;
  if (!combineId) {
    return res
      .status(500)
      .json({ message: "The request could not be fulfilled" });
  }

  if (!combineId.trim()) {
    return res.status(500).json({ message: "Id can't be empty" });
  }

  next();
};

export const checkMajorNameEmpty = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(500).json({ message: "The major name can't be empty" });
  }

  if (!name.trim()) {
    return res
      .status(500)
      .json({ message: "The major name can not be left blank" });
  }

  next();
};

export const checkImageEmpty = (req, res, next) => {
  const { image } = req.body;
  if (!image) {
    return res.status(500).json({ message: "Image can not empty" });
  }
  if (!image.trim()) {
    return res.status(500).json({ message: "Image can not be left blank" });
  }
  next();
};
