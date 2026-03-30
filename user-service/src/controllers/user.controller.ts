import * as service from "../services/user.service";

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
    service: "user-service",
    timestamp: new Date().toISOString(),
  });
};

export const createUser = async (req: any, res: any) => {
  try {
    const user = await service.createUser(req.body);
    success(res, "User created successfully", user, 201);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const getUsers = async (req: any, res: any) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const users = await service.getUsers(page, limit);
    success(res, "Users fetched successfully", users);
  } catch (err: any) {
    error(res, "Failed to fetch users", 500);
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    const user = await service.getUserById(req.params.id);
    if (!user) return error(res, "User not found", 404);
    success(res, "User fetched successfully", user);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const user = await service.updateUser(req.params.id, req.body);
    if (!user) return error(res, "User not found", 404);
    success(res, "User updated successfully", user);
  } catch {
    error(res, "Invalid update data");
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const deleted = await service.deleteUser(req.params.id);
    if (!deleted) return error(res, "User not found", 404);
    res.status(204).send();
  } catch {
    error(res, "User not found", 404);
  }
};

export const followUser = async (req: any, res: any) => {
  try {
    await service.followUser(req.params.id, req.body.follower_id);
    success(res, "User followed successfully", null);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const unfollowUser = async (req: any, res: any) => {
  try {
    await service.unfollowUser(req.params.id, req.body.follower_id);
    success(res, "User unfollowed successfully", null);
  } catch (err: any) {
    error(res, err.message);
  }
};
