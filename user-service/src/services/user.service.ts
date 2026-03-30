import User from "../models/user.model";

export const createUser = async (data: any) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new Error("Email already exists");

  return await User.create(data);
};

export const getUsers = async (page = 1, limit = 10) => {
  return await User.find()
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getUserById = async (id: string) => {
  return await User.findOne({ user_id: id });
};

export const updateUser = async (id: string, data: any) => {
  return await User.findOneAndUpdate({ user_id: id }, data, {
    new: true,
  });
};

export const deleteUser = async (id: string) => {
  return await User.findOneAndDelete({ user_id: id });
};

export const followUser = async (userId: string, followerId: string) => {
  const user = await User.findOne({ user_id: userId });
  const follower = await User.findOne({ user_id: followerId });

  if (!user || !follower) throw new Error("User not found");

  if (user.followers.includes(followerId))
    throw new Error("Already following user");

  user.followers.push(followerId);
  follower.following.push(userId);

  await user.save();
  await follower.save();
};

export const unfollowUser = async (userId: string, followerId: string) => {
  const user = await User.findOne({ user_id: userId });
  const follower = await User.findOne({ user_id: followerId });

  if (!user || !follower) throw new Error("User not found");

  if (!user.followers.includes(followerId))
    throw new Error("Not following user");

  user.followers = user.followers.filter((id) => id !== followerId);
  follower.following = follower.following.filter((id) => id !== userId);

  await user.save();
  await follower.save();
};
