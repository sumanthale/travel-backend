import { User } from "../../../models/index.js";

export default async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }
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
