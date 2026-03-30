import Subscription from "../models/subscription.model";

export const createSubscription = async (data: any) => {
  return await Subscription.create(data);
};

export const getSubscriptions = async (query: any) => {
  const { page = 1, limit = 10, status } = query;

  const filter: any = {};
  if (status) filter.status = status;

  return await Subscription.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getSubscriptionById = async (id: string) => {
  return await Subscription.findOne({ subscription_id: id });
};

export const updateSubscription = async (id: string, data: any) => {
  return await Subscription.findOneAndUpdate({ subscription_id: id }, data, {
    new: true,
  });
};

export const deleteSubscription = async (id: string) => {
  return await Subscription.findOneAndDelete({ subscription_id: id });
};

export const getSubscriptionsByUser = async (userId: string) => {
  return await Subscription.find({ user_id: userId });
};
