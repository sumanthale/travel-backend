import { User } from "../../../models/index.js";

export default async (req, res) => {
  const { id } = req.body;

  const { deletedCount } = await User.deleteOne({ id }).catch((err) => {
    return res.status(500).json({ err });
  });
  if (deletedCount > 0) {
    return res.status(200).json({
      status: true,
    });
  } else {
    return res.status(200).json({
      status: false,
    });
  }
};
