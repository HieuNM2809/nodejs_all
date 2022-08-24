export const checkURLEmpty = (req, res,next) => {
  const { URL } = req.body;
  if (!URL) {
    return res.status(500).json({ message: "URL can not be empty" });
  }
  if (!URL.trim()) {
    return res.status(500).json({ message: "URL can not be left blank" });
  }
  next();
};
