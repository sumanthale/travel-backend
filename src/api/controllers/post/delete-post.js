import { Post } from "../../../models/index.js";

export default async (req, res) => {
  console.log(req.body);

  const { deletedCount } = await Post.deleteOne(req.body).catch((err) => {
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
