import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async (param) => {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${param}`);
    setIsLoading(false);
    setUsers(prev => prev.concat(response.data.results))
  }, [])

  return { users, isLoading, fetchUsers };
};
