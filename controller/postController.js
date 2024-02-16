const postModel = require("../model/postModel");
const createPost = async (req, res) => {
  try {
    const { id, value } = req.body;
    const user = await postModel.updateOne(
      { _id: id },
      {
        $set: {
          userId: value[0],
          title: value[1],
          url: value[2],
          description: value[3],
          "comments.0.comment": value[4],
          "comments.0.name": value[5],
        },
      }
    );
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
const reportPost = async (req, res) => {
  try {
    const { postid } = req.body;
    const result = await postModel.updateOne(
      { _id: postid },
      { $inc: { report: 1 } }
    );
    const user = await postModel.findOne(
      { _id: postid },
      { report: 1, _id: 0 }
    );
    console.log(user);
    if (user.report >= 15) {
      const report1 = await postModel.findOneAndUpdate(
        { _id: postid },
        { $set: { isDeleted: true } }
      );
      res.json(report1);
    }
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
const showReportPost = async (req, res) => {
  try {
    const user = await postModel.find({ report: { $gte: 15 } });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
const ShowAllPost = async (req, res) => {
  try {
    const user = await postModel.find({ isDeleted: false });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
// const createComments = async(req,res)=>{
//     try{
//         const{postId,comment,name,user} = req.body;
//         const comments = await postModel.updateOne({_id:postId},{$push:{comments:{comment:comment,name:name,user:user}}})
//         const vino=await postModel.findOne({_id:postId},{comments:1})
//         res.json(vino)
//     }
//     catch(err){
//                 console.log(err)
//         }
// }
const createComments = async (req, res) => {
  try {
    const { postId, comment, name, user } = req.body;

    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: postId },
      {
        $push: { comments: { comment: comment, name: name, user: user } },
      }
    );
    const vino = await postModel.findOne({ _id: postId }, { comments: 1 });
    //hi this is vino
    res.json(vino);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const update = async (req, res) => {
  try {
    const { postId, title } = req.body;

    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: postId },
      {
        $set: { title: title },
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};
const showComment = async (req, res) => {
  const { regex } = req.body;
  try {
    const user = await postModel.findById({
      "comments.0.comment": { $regex: regex, $options: "i" },
    });
    // const user = await postModel.find({comments:[{comment:{$regex:"^r"},$option:"i"}]})
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
const deleteParticularComment = async (req, res) => {
  try {
    const { postId } = req.body;
    // const user = await postModel.findOneAndUpdate({"comments.comment":{$regex:regex,$options:"i"}},{$pull:{"comments.comment":1}})
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } }
    );
    if (updatedPost) {
      // Comment successfully deleted
      res.json({ isDeleted: true, updatedPost });
    } else {
      // Post not found or comment not deleted
      res.json({ isDeleted: false, message: "Comment not deleted." });
    }
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
  }
};
const likeCount = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const user = await postModel.updateOne(
      { _id: postId },
      { $push: { like: userId }, $inc: { likeCount: 1 } }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
const unLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const user = await postModel.updateOne(
      { _id: postId },
      { $pull: { like: userId } }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const getTrendingUrl = async (req, res) => {
  try {
    const trending = await postModel
      .aggregate([{ $group: { _id: "$url", count: { $sum: 1 } } }])
      .sort({ count: -1 });
    res.json(trending);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPost,
  reportPost,
  showReportPost,
  ShowAllPost,
  createComments,
  showComments,
  deleteParticularComment,
  likeCount,
  unLike,
  getTrendingUrl,
  update,
};
