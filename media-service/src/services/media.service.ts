import Media from "../models/media.model";

export const createMedia = async (data: any) => {
  return await Media.create(data);
};

export const getMedia = async (query: any) => {
  const { page = 1, limit = 10, uploaded_by } = query;

  const filter: any = {};
  if (uploaded_by) filter.uploaded_by = uploaded_by;

  return await Media.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getMediaById = async (id: string) => {
  return await Media.findOne({ media_id: id });
};

export const updateMedia = async (id: string, data: any) => {
  return await Media.findOneAndUpdate({ media_id: id }, data, { new: true });
};

export const deleteMedia = async (id: string) => {
  return await Media.findOneAndDelete({ media_id: id });
};

export const getMediaByUser = async (userId: string) => {
  return await Media.find({ uploaded_by: userId });
};
