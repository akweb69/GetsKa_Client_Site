import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

const fetchAllCategories = async () => {
  const res = await axios.get(`${base_url}/categories`);
  return res.data;
};

const useAllCategories = () => {
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery({
    queryKey: ["all-categories"],
    queryFn: fetchAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  return {
    allCategories: data,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  };
};

export default useAllCategories;
