import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

const fetchAlldesigners = async () => {
  const res = await axios.get(`${base_url}/designers`);
  return res.data;
};

const useAllDesigner = () => {
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery({
    queryKey: ["all-designers"],
    queryFn: fetchAlldesigners,
    staleTime: 1000 * 60 * 5,
  });

  return {
    allDesigner: data,
    designerLoading: isLoading,
    isFetching,
    error,
    isError,
    refetch,
  };
};

export default useAllDesigner;
