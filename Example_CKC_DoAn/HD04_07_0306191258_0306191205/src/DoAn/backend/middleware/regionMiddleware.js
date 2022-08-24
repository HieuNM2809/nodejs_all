import { RegionNameCannotBlank } from "../configs/appConfig.js";

export const checkRegionNameEmpty = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(500).json({ message: RegionNameCannotBlank });
  }

  if (!name.trim()) {
    return res
      .status(500)
      .json({ message: "The region name cannot be left blank" });
  }

  next();
};