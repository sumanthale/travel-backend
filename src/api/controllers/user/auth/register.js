import { User } from "../../../../models/index.js";
import { validateRegister } from "../../../validators/user.validator.js";

export default async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    const { email, uid, password } = req.body;
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const exists = await User.exists({ uid }).catch((err) => {
      return res.status(500).json({ req, err: err.message });
    });

    if (exists) return res.status(409).json({ err: "exists" });
    let username = email.split("@")[0]?.toLowerCase();
    let user = new User({
      email,
      username,
      uid,
      password,
    });

    user = await user.save().catch((err) => {
      return res.status(500).json({ err: err.message });
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
