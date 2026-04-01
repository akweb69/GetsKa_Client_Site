import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

const fetchProducts = async () => {
  const res = await axios.get(`${base_url}/products`);
  return res.data;
};

const useProducts = (options = {}) => {
  const { data, isPending, error, isError, refetch, ...rest } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    ...options,
  });

  return {
    products: data,
    isPending,
    isLoading: isPending && !data,
    isError,
    error,
    refetch,
    ...rest,
  };
};

export default useProducts;
