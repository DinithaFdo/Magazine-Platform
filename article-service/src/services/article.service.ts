import Article from "../models/article.model";

export const createArticle = async (data: any) => {
  return await Article.create(data);
};

export const getArticles = async (query: any) => {
  const { page = 1, limit = 10, category_id, author_id, status } = query;

  const filter: any = {};
  if (category_id) filter.category_id = category_id;
  if (author_id) filter.author_id = author_id;
  if (status) filter.status = status;

  return await Article.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getArticleById = async (id: string) => {
  return await Article.findOne({ article_id: id });
};

export const updateArticle = async (id: string, data: any) => {
  return await Article.findOneAndUpdate({ article_id: id }, data, {
    new: true,
  });
};

export const deleteArticle = async (id: string) => {
  return await Article.findOneAndDelete({ article_id: id });
};

export const publishArticle = async (id: string) => {
  const article = await Article.findOne({ article_id: id });

  if (!article) throw new Error("Article not found");
  if (article.status === "published")
    throw new Error("Article already published");

  article.status = "published";
  await article.save();

  return article;
};

export const unpublishArticle = async (id: string) => {
  const article = await Article.findOne({ article_id: id });

  if (!article) throw new Error("Article not found");
  if (article.status === "draft")
    throw new Error("Article already in draft state");

  article.status = "draft";
  await article.save();

  return article;
};
