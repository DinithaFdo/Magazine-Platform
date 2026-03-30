import * as service from "../services/comment.service";

const success = (res: any, message: string, data: any, code = 200) => {
  res.status(code).json({
    success: true,
    message,
    statusCode: code,
    data,
  });
};

const error = (res: any, message: string, code = 400) => {
  res.status(code).json({
    status: "error",
    code,
    message,
    service: "comment-service",
    timestamp: new Date().toISOString(),
  });
};

export const createComment = async (req: any, res: any) => {
  try {
    const comment = await service.createComment(req.body);
    success(res, "Comment created successfully", comment, 201);
  } catch {
    error(res, "Invalid comment data");
  }
};

export const getComments = async (req: any, res: any) => {
  try {
    const data = await service.getComments(req.query);
    success(res, "Comments fetched successfully", data);
  } catch {
    error(res, "Failed to fetch comments", 500);
  }
};

export const getCommentById = async (req: any, res: any) => {
  try {
    const data = await service.getCommentById(req.params.id);
    if (!data) return error(res, "Comment not found", 404);
    success(res, "Comment fetched successfully", data);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const updateComment = async (req: any, res: any) => {
  try {
    const data = await service.updateComment(req.params.id, req.body);
    if (!data) return error(res, "Comment not found", 404);
    success(res, "Comment updated successfully", data);
  } catch {
    error(res, "Invalid update data");
  }
};

export const deleteComment = async (req: any, res: any) => {
  try {
    const deleted = await service.deleteComment(req.params.id);
    if (!deleted) return error(res, "Comment not found", 404);
    res.status(204).send();
  } catch {
    error(res, "Comment not found", 404);
  }
};

export const getCommentsByArticle = async (req: any, res: any) => {
  try {
    const data = await service.getCommentsByArticle(req.params.articleId);
    success(res, "Comments fetched successfully", data);
  } catch {
    error(res, "Article not found", 404);
  }
};

export const getCommentsByUser = async (req: any, res: any) => {
  try {
    const data = await service.getCommentsByUser(req.params.userId);
    success(res, "User comments fetched successfully", data);
  } catch {
    error(res, "User not found", 404);
  }
};
