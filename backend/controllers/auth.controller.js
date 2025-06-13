import { redis } from "../lib/redis.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Creates access and refresh tokens for user with unique userid
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESSTOKEN_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESHTOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// Sets new http only, access and refresh cookie with respective tokens
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("Access_Cookie", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("Refresh_Cookie", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

// Signup controller
export const signup = async (req, res) => {
  const { name, email, password, gender, profilePicture } = req.body;

  try {
    // Check if user is already registered in DB
    if(await userModel.findOne({ email })) { return res.status(400).json({ message: "User with same email already exists" }) };
    if(await userModel.findOne({ name })) { return res.status(400).json({ message: "User with same name already exists" }) };

    // Dynamic PFP using gender as key
    const assignedProfilePicture = `https://avatar.iran.liara.run/public/${gender}`;

    // Create new user in DB
    const user = await userModel.create({
      name,
      email,
      password,
      gender,
      profilePicture: profilePicture || assignedProfilePicture
    });

    // Get Tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Saving refresh token in upstash redis
    await redis.set(`refresh_Token:${user._id}`, refreshToken, "EX", 7 * 24 * 60 * 60);
    setCookies(res, accessToken, refreshToken);

    // Sending new user in response
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        profilePicture: user.profilePicture
      },
      message: "New user created successfully",
    });
    console.log("User created successfully");
  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.sendStatus(500);
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    // Get email and password from req body
    const { email, password } = req.body;

    // If missing field, throw error
    if (!email || !password) { return res.status(400).json({ message: "Input required to login" }) };

    // Check if user exists in DB
    // Match email and password for validation
    // If not validate, throw error
    // If validate, generate tokens upon login
    const user = await userModel.findOne({ email });
    if(!user || !(await user.comparePasswords(password))) { return res.status(403).json({ message: "Invalid credentials" }) };

      const { accessToken, refreshToken } = generateTokens(user._id);
      await redis.set(`refresh_Token:${user._id}`, refreshToken, "EX", 7 * 24 * 60 * 60);

      // Set cookes with respective tokens on login
      setCookies(res, accessToken, refreshToken);

      // Send user data in response
      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          profilePicture: user.profilePicture
        },
        message: "User logged in successfully"
      });
      console.log("User Logged in successfully");
  } catch (error) {
    console.error("Error in Log in controller", error.message);
    res.sendStatus(500);
  }

};

// Logout controller
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.Refresh_Cookie;

    if(!refreshToken) { return res.status(400).json({ message: "No refresh token found" }) };

      const decoded = jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET);
      await redis.del(`refresh_Token:${decoded.userId}`);

      res.clearCookie("Access_Cookie");
      res.clearCookie("Refresh_Cookie");

      res.status(200).json({ message: "Logout successful. Check cookies clear" });
      console.log("Logout successfully");
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.sendStatus(500);
  }
};
