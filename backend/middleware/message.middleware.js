import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.Access_Cookie;

    // if not access token, means user has logged out
    if (!accessToken) { return res.status(403).json({ message: "Unauthorized" }) }

    try {
        // If decoded, means token is still valid and secure
        // If not decoded, means access token has been compromised
      const decoded = jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET); // working
      if(!decoded) { return res.status(401).json({ message: "User data compromised" }) };
      
      const user = await userModel.findById(decoded.userId).select("-password");
      console.log("user", user.name);

      if (!user) { return res.status(401).json({ message: "This user is unathuorized or been tempered with"}) }

      req.user = user; // working
    } catch (error) {
      if (error.name === "TokenExpiredError") { return res.status(401).json({ message: "Token expired error" }) } 
    }

    next();
  } catch (error) {
    console.error(`Unauthorized - Access denied`);
    res.status(401).json({ message: "Unauthorized" });
  }
};
