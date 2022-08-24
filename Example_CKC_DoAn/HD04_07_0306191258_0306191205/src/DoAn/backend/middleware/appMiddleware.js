import omitEmpty from "omit-empty";

export const removeEmptyProperties = (req, res, next) => {
  req.body = omitEmpty(req.body);
  req.params = omitEmpty(req.params);
  next();
};
