export const checkURLSchoolImageEmpty = (req, res, next) => {
  const { URL } = req.body;

  if (!URL) {
    return res.status(500).json({ message: "The URL can't be empty" });
  }

  if (!URL.trim()) {
    return res.status(500).json({ message: "The URL can't be left blank" });
  }

  next();
};

export const checkSchoolIdEmpty = (req, res, next) => {
  const { schoolId } = req.body;
  if (!schoolId) {
    return res
      .status(500)
      .json({ message: "The request could not be fulfilled" });
  }

  if (!schoolId.trim()) {
    return res.status(500).json({ message: "Id can't be empty" });
  }

  next();
};

export const checkImageIdEmpty = (req, res, next) => {
  const { imageId } = req.body;
  if (!imageId) {
    return res
      .status(500)
      .json({ message: "The request could not be fulfilled" });
  }

  if (!imageId.trim()) {
    return res.status(500).json({ message: "Id can't be empty" });
  }

  next();
};
