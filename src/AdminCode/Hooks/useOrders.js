import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useOrders = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`${base_url}/orders`);
      return res.data;
    },
  });

  return {
    orders,
    orderLoading: isLoading,
    isError,
    error,
    orderRefetch: refetch,
  };
};

export default useOrders;
