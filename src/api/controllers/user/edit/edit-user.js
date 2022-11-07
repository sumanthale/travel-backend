import { User } from "../../../../models/index.js";

export default async (req, res) => {
  const data = req.body;
  const { uid } = data;
  console.log(data);

  let user = await User.findOneAndUpdate({ uid }, { ...req.body }).catch(
    (err) => {
      return res.status(500).json({ err });
    }
  );
  user = { ...user._doc, ...req.body };

  return res.status(200).json({
    user,
  });
};
