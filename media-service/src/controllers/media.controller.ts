import * as service from "../services/media.service";
import cloudinary from "../config/cloudinary";

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
    service: "media-service",
    timestamp: new Date().toISOString(),
  });
};

export const uploadMedia = async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) return error(res, "File is required", 400);

    const result = await cloudinary.uploader.upload(file.path);

    const media = await service.createMedia({
      file_name: file.originalname,
      file_type: file.mimetype,
      file_size: file.size,
      uploaded_by: req.body.uploaded_by,
      url: result.secure_url,
    });

    success(res, "Media uploaded successfully", media, 201);
  } catch (err: any) {
    error(res, "Invalid media data");
  }
};

export const getMedia = async (req: any, res: any) => {
  try {
    const data = await service.getMedia(req.query);
    success(res, "Media fetched successfully", data);
  } catch {
    error(res, "Failed to fetch media", 500);
  }
};

export const getMediaById = async (req: any, res: any) => {
  try {
    const data = await service.getMediaById(req.params.id);
    if (!data) return error(res, "Media not found", 404);
    success(res, "Media fetched successfully", data);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const updateMedia = async (req: any, res: any) => {
  try {
    const data = await service.updateMedia(req.params.id, req.body);
    if (!data) return error(res, "Media not found", 404);
    success(res, "Media updated successfully", data);
  } catch {
    error(res, "Invalid update data");
  }
};

export const deleteMedia = async (req: any, res: any) => {
  try {
    const deleted = await service.deleteMedia(req.params.id);
    if (!deleted) return error(res, "Media not found", 404);
    res.status(204).send();
  } catch {
    error(res, "Media not found", 404);
  }
};

export const getMediaByUser = async (req: any, res: any) => {
  try {
    const data = await service.getMediaByUser(req.params.userId);
    success(res, "User media fetched successfully", data);
  } catch {
    error(res, "User not found", 404);
  }
};
