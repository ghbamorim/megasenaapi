import { Response, NextFunction } from "express";

const config = process.env;

const refreshResults = (req: any, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default refreshResults;
