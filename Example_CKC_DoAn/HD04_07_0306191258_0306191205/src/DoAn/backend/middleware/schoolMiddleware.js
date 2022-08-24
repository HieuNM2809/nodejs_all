export const checkSchoolNameEmpty = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(500).json({ message: "School name can not be empty" });
  }
  if (!name.trim()) {
    return res
      .status(500)
      .json({ message: "School name can not left be blank" });
  }
  next();
};

export const checkAddressEmpty = (req, res, next) => {
  const { address } = req.body;
  if (!address) {
    return res.status(500).json({ message: "School address can not be empty" });
  }
  if (!address.trim()) {
    return res
      .status(500)
      .json({ message: "School address can not left be blank" });
  }
  next();
};

export const checkURLLogoEmpty = (req, res, next) => {
  const { urlLogo } = req.body;
  if (!urlLogo) {
    return res.status(500).json({ message: "Logo can not be empty" });
  }
  if (!urlLogo.trim()) {
    return res.status(500).json({ message: "Logo can not left be blank" });
  }
  next();
};

export const checkIdEmpty = (req, res, next) => {
  const { regionId, schoolLevelId } = req.body;
  if (!regionId || !schoolLevelId) {
    return res
      .status(500)
      .json({ message: "The request could not be fulfilled" });
  }

  if (!regionId.trim() || !schoolLevelId.trim()) {
    return res.status(500).json({ message: "Id can't be empty" });
  }

  next();
};
