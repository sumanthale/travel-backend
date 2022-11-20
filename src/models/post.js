import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    user: {
      type: String,
    },
    rating: {
      type: Number,
    },
    location: {
      type: String,
    },

    price: {
      type: Number,
    },
    likes: {
      type: [String],
    },
    mustVist: {
      type: [String],
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
export default Post;
