import { Post } from "../../../../models/index.js";
import { User } from "../../../../models/index.js";

export default async (req, res) => {
  try {
    const postObj = req.body;
    console.log(postObj);
    const uid = postObj.uid;
    delete postObj.uid;

    const user = await User.findOne({ uid }).catch((err) => {
      return res.status(500).json({ err: err.message });
    });
    let post = new Post({
      ...postObj,
      user,
    });

    post = await post.save().catch((err) => {
      return res.status(500).json({ err: err.message });
    });

    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
