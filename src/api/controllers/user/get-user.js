import { User } from "../../../models/index.js";

export default async (req, res) => {
  const { uid } = req.query;
  console.log(uid);
  const user = await User.findOne({ uid }).catch((err) => {
    return res.status(500).json({ err: err.message });
  });

  return res.status(200).json({
    user,
    status: !!user,
  });
};
