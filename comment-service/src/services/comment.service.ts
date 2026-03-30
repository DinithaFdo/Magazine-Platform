import Comment from "../models/comment.model";

export const createComment = async (data: any) => {
  return await Comment.create(data);
};

export const getComments = async (query: any) => {
  const { page = 1, limit = 10, article_id } = query;

  const filter: any = {};
  if (article_id) filter.article_id = article_id;

  return await Comment.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getCommentById = async (id: string) => {
  return await Comment.findOne({ comment_id: id });
};

export const updateComment = async (id: string, data: any) => {
  return await Comment.findOneAndUpdate(
    { comment_id: id },
    { content: data.content },
    { new: true },
  );
};

export const deleteComment = async (id: string) => {
  return await Comment.findOneAndDelete({ comment_id: id });
};

export const getCommentsByArticle = async (articleId: string) => {
  const comments = await Comment.find({ article_id: articleId });

  // simple nested replies structure
  const map: any = {};
  const roots: any[] = [];

  comments.forEach((c: any) => {
    map[c.comment_id] = { ...c.toObject(), replies: [] };
  });

  comments.forEach((c: any) => {
    if (c.parent_comment_id) {
      map[c.parent_comment_id]?.replies.push(map[c.comment_id]);
    } else {
      roots.push(map[c.comment_id]);
    }
  });

  return roots;
};

export const getCommentsByUser = async (userId: string) => {
  return await Comment.find({ user_id: userId });
};
