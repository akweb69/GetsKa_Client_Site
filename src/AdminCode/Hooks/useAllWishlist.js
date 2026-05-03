import { useQuery } from "@tanstack/react-query";

const useAllWishlist = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const {
    data: allWishlist = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["allWishlist"],
    queryFn: async () => {
      const res = await fetch(`${base_url}/wishlist`);

      if (!res.ok) {
        throw new Error("Failed to fetch all wishlist items");
      }

      return res.json();
    },
  });

  return {
    allWishlist,
    isLoading,
    refetch,
    error,
  };
};

export default useAllWishlist;
