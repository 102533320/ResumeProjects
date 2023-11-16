import { useEffect, useState } from "react";
import API from "../api/user";

const useAPI = (userId: string) => {
  const [user, setUser] = useState({});
  const [matchDetails, setMatchDetails] = useState({});

  const requestMatchDetails = async () => {
    const matchDetails = await API.getUserDetails(userId);
    if (matchDetails.ok) setMatchDetails(matchDetails.data);
    return matchDetails;
  };

  const requestUser = async () => {
    const user = await API.getUser(userId);
    if (user.ok) setUser(user.data);
    return user;
  };

  return { user, matchDetails, requestMatchDetails, requestUser };
};

export default useAPI;
