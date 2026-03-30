import * as service from "../services/article.service";

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
    service: "article-service",
    timestamp: new Date().toISOString(),
  });
};

export const createArticle = async (req: any, res: any) => {
  try {
    const article = await service.createArticle(req.body);
    success(res, "Article created successfully", article, 201);
  } catch {
    error(res, "Invalid article data");
  }
};

export const getArticles = async (req: any, res: any) => {
  try {
    const articles = await service.getArticles(req.query);
    success(res, "Articles fetched successfully", articles);
  } catch {
    error(res, "Failed to fetch articles", 500);
  }
};

export const getArticleById = async (req: any, res: any) => {
  try {
    const article = await service.getArticleById(req.params.id);
    if (!article) return error(res, "Article not found", 404);
    success(res, "Article fetched successfully", article);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const updateArticle = async (req: any, res: any) => {
  try {
    const article = await service.updateArticle(req.params.id, req.body);
    if (!article) return error(res, "Article not found", 404);
    success(res, "Article updated successfully", article);
  } catch {
    error(res, "Invalid update data");
  }
};

export const deleteArticle = async (req: any, res: any) => {
  try {
    const deleted = await service.deleteArticle(req.params.id);
    if (!deleted) return error(res, "Article not found", 404);
    res.status(204).send();
  } catch {
    error(res, "Article not found", 404);
  }
};

export const publishArticle = async (req: any, res: any) => {
  try {
    const article = await service.publishArticle(req.params.id);
    success(res, "Article published successfully", article);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const unpublishArticle = async (req: any, res: any) => {
  try {
    const article = await service.unpublishArticle(req.params.id);
    success(res, "Article moved to draft", article);
  } catch (err: any) {
    error(res, err.message);
  }
};
