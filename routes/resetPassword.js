import express from "express";
import { getUserByRS } from "../controllers/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/:randomString", async (req, res) => {
  try {
    const user = await getUserByRS(req);
    if (!user) return res.status(400).send({ message: "Invalid Link or Link Expired"});

    user.password = bcrypt.hashSync(req.body.password, 10);
    user.randomString = undefined;
    user.randomStringExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password Reset sucessfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
    console.log(error);
  }
});

export const resetPassword = router;
