import { Post } from "../../../../models/index.js";

export default async (req, res) => {
  const data = req.body;
  const { uid } = data;
  console.log(data);

  let post = await Post.findOneAndUpdate({ uid }, { ...req.body }).catch(
    (err) => {
      return res.status(500).json({ err });
    }
  );
  post = { ...post._doc, ...req.body };

  return res.status(200).json({
    post,
  });
};
