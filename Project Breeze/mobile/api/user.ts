import client from "./client";
import cache from "../utility/cache";

const userPrefix = "user:";
const matchDetailsPrefix = "match_details:";

const postUser = (user: any) => client.post("/user", user);

const getUser = async (userId: string) => {
  let user = await cache.get(userPrefix + userId);
  if (user) return { ok: true, data: user };

  user = await client.get("/user", {
    id: userId,
  });

  if (user.ok) await cache.store(userPrefix + userId, user.data, 24);

  return user;
};

const getUserDetails = async (userId: string) => {
  let matchDetails = await cache.get(matchDetailsPrefix + userId);

  if (matchDetails) return { ok: true, data: matchDetails };
  matchDetails = await client.get("/match_details", {
    id: userId,
  });

  if (matchDetails.ok)
    await cache.store(matchDetailsPrefix + userId, matchDetails.data, 24);

  return matchDetails;
};

const updateUser = async (userId: string, data: object) => {
  const result = await client.put(`/user?id=${userId}`, data);

  if (result.ok) await cache.store(userPrefix + userId, result.data, 24);
  return result;
};

const updateMatchDetails = async (userId: string, data: object) => {
  const result = await client.put(`/match_details?id=${userId}`, data);

  if (result.ok)
    await cache.store(matchDetailsPrefix + userId, result.data, 24);

  return result;
};

const reportUser = async (userId: string, reports: Array<string>) =>
  await client.put(`/reports?id=${userId}`, { reports: reports });

export default {
  postUser,
  getUser,
  getUserDetails,
  updateUser,
  updateMatchDetails,
  reportUser,
};
