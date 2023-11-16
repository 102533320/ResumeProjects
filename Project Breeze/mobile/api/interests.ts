import client from "./client";
import cache from "../utility/cache";

const interestsPrefix = "interests";

const getInterests = async () => {
  const cacheResult = await cache.get(interestsPrefix);
  if (cacheResult) return { ok: true, data: cacheResult };

  const result = await client.get("/interests");
  if (result.ok) cache.store(interestsPrefix, result.data, 24);

  return result;
};

const fetchInterests = async () => {
  const result = await client.get("/interests");
  if (result.ok) cache.store(interestsPrefix, result.data, 24);

  return result;
};

export { getInterests, fetchInterests };
