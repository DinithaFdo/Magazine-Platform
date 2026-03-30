import * as service from "../services/subscription.service";

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
    service: "subscription-service",
    timestamp: new Date().toISOString(),
  });
};

export const createSubscription = async (req: any, res: any) => {
  try {
    const data = await service.createSubscription(req.body);
    success(res, "Subscription created successfully", data, 201);
  } catch {
    error(res, "Invalid subscription data");
  }
};

export const getSubscriptions = async (req: any, res: any) => {
  try {
    const data = await service.getSubscriptions(req.query);
    success(res, "Subscriptions fetched successfully", data);
  } catch {
    error(res, "Failed to fetch subscriptions", 500);
  }
};

export const getSubscriptionById = async (req: any, res: any) => {
  try {
    const data = await service.getSubscriptionById(req.params.id);
    if (!data) return error(res, "Subscription not found", 404);
    success(res, "Subscription fetched successfully", data);
  } catch (err: any) {
    error(res, err.message);
  }
};

export const updateSubscription = async (req: any, res: any) => {
  try {
    const data = await service.updateSubscription(req.params.id, req.body);
    if (!data) return error(res, "Subscription not found", 404);
    success(res, "Subscription updated successfully", data);
  } catch {
    error(res, "Invalid update data");
  }
};

export const deleteSubscription = async (req: any, res: any) => {
  try {
    const deleted = await service.deleteSubscription(req.params.id);
    if (!deleted) return error(res, "Subscription not found", 404);
    res.status(204).send();
  } catch {
    error(res, "Subscription not found", 404);
  }
};

export const getSubscriptionsByUser = async (req: any, res: any) => {
  try {
    const data = await service.getSubscriptionsByUser(req.params.userId);
    success(res, "User subscriptions fetched successfully", data);
  } catch {
    error(res, "User not found", 404);
  }
};
