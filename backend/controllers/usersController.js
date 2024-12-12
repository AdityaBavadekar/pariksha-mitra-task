import User from "../models/User.js";

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res
                .status(400)
                .json({ error: true, message: "User not found" });
        }
        return res.status(200).json({
            error: false,
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Error occurred" });
    }
};

const updateUserProfile = async (req, res) => {
    const { name, profilePicture, institute, grade } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res
                .status(400)
                .json({ error: true, message: "User not found" });
        }
        if (name) user.name = name;
        if (profilePicture) user.profilePicture = profilePicture;
        if (institute) user.institute = institute;
        if (grade) user.grade = grade;
        user.save();
        return res.status(200).json({
            error: false,
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Error occurred" });
    }
};

const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.usedId);
        if (!user) {
            return res
                .status(400)
                .json({ error: true, message: "User not found" });
        }
        await user.delete();
        return res
            .status(200)
            .json({ error: false, message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Error occurred" });
    }
};

export { getUserProfile, updateUserProfile, deleteUserProfile };
