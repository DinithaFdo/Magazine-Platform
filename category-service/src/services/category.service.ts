import Category from "../models/category.model";

export const createCategory = async (data: any) => {
  const exists = await Category.findOne({ name: data.name });
  if (exists) throw new Error("Category already exists");

  return await Category.create(data);
};

export const getCategories = async (page = 1, limit = 10) => {
  return await Category.find()
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getCategoryById = async (id: string) => {
  return await Category.findOne({ category_id: id });
};

export const updateCategory = async (id: string, data: any) => {
  if (data.name) {
    const exists = await Category.findOne({ name: data.name });
    if (exists) throw new Error("Category already exists");
  }

  return await Category.findOneAndUpdate({ category_id: id }, data, {
    new: true,
  });
};

export const deleteCategory = async (id: string) => {
  return await Category.findOneAndDelete({ category_id: id });
};

export const getArticlesByCategory = async (categoryId: string) => {
  const category = await Category.findOne({ category_id: categoryId });
  if (!category) throw new Error("Category not found");

  return [
    {
      article_id: "sample-uuid",
      title: "Sample Article",
      author_id: "sample-author",
    },
  ];
};
