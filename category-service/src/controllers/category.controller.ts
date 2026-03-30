import * as service from "../services/category.service";

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
    service: "category-service",
    timestamp: new Date().toISOString(),
  });
};

export const createCategory = async (req: any, res: any) => {
  try {
    const category = await service.createCategory(req.body);
    success(res, "Category created successfully", category, 201);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const getCategories = async (req: any, res: any) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const categories = await service.getCategories(page, limit);
    success(res, "Categories fetched successfully", categories);
  } catch {
    error(res, "Failed to fetch categories", 500);
  }
};

export const getCategoryById = async (req: any, res: any) => {
  try {
    const category = await service.getCategoryById(req.params.id);
    if (!category) return error(res, "Category not found", 404);
    success(res, "Category fetched successfully", category);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const updateCategory = async (req: any, res: any) => {
  try {
    const category = await service.updateCategory(req.params.id, req.body);
    if (!category) return error(res, "Category not found", 404);
    success(res, "Category updated successfully", category);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const deleteCategory = async (req: any, res: any) => {
  try {
    const deleted = await service.deleteCategory(req.params.id);
    if (!deleted) return error(res, "Category not found", 404);
    res.status(204).send();
  } catch {
    error(res, "Category not found", 404);
  }
};

export const getArticlesByCategory = async (req: any, res: any) => {
  try {
    const data = await service.getArticlesByCategory(req.params.id);
    success(res, "Articles fetched successfully for category", data);
  } catch (err: any) {
    error(res, err.message, 404);
  }
};
