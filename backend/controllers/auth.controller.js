import { redis } from "../lib/redis.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Creates access and refresh tokens for user with unique userid
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESSTOKEN_SECRET, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESHTOKEN_SECRET, {
    expiresIn: "10m",
  });

  return { accessToken, refreshToken };
};

// Sets new http only, access and refresh cookie with respective tokens
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("Access_Cookie", accessToken, {
    httpOnly: true,
    maxAge: 5 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("Refresh_Cookie", refreshToken, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const signup = async (req, res) => {
  const { name, email, password, gender, profilePicture } = req.body;

  try {
    // Check if user is already registered in DB
    if(await userModel.findOne({ email })) {return res.status(400).json({ message: "User with same email already exists" })};
    if(await userModel.findOne({ name })) {return res.status(400).json({ message: "User with same name already exists" })};

    // Dynamic PFP using gender as key
    const assignedProfilePicture = `https://avatar.iran.liara.run/public/${gender}`;

    // Create new user in DB
    const user = await userModel.create({
      name,
      email,
      password,
      gender,
      profilePicture: profilePicture || assignedProfilePicture.toLowerCase()
    });

    // Get Tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Saving refresh token in upstash redis
    await redis.set(`refresh_Token:${user._id}`, refreshToken, "EX", 10 * 60);
    setCookies(res, accessToken, refreshToken);

    // Sending new user in response back
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
  } catch (error) {
    console.error("Signup error", error.message);
    res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  console.log("login route");
};

export const logout = async (req, res) => {
  console.log("logout route");
};
