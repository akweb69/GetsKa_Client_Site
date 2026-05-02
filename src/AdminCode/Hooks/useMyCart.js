import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

const fetchmyCart = async (email) => {
  const res = await axios.get(`${base_url}/cart/${email}`);
  return res.data;
};

const useMyCart = (email) => {
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery({
    queryKey: ["my-cart", email],
    queryFn: ({ queryKey }) => fetchmyCart(queryKey[1]),
    enabled: !!email,
    staleTime: 1000 * 60 * 5,
  });

  return {
    myCart: data,
    totalCart: data?.length || 0,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  };
};

export default useMyCart;
