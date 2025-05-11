import userModel from "../models/user.model.js";

export const getSidebarUsers = async (req, res) => {
  try {
    // Get logged in user id
    const loggedInUserId = req.user._id;

    // Get logged in user id
    // Filter the logged user ID from DB
    // After filter show the all users in response
    const filteredUsers = await userModel.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
    console.log("Got sidebar users");
  } catch (error) {
    console.error("Error in get sidebar users controller", error.message);
    res.sendStatus(500);
  }
};
