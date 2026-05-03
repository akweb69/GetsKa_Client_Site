import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";

const useWishlist = () => {
  const { user, userLoading } = useAuth();
  const base_url = import.meta.env.VITE_BASE_URL;

  const {
    data: wishlist = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !userLoading && !!user?.email,
    queryFn: async () => {
      const res = await fetch(`${base_url}/wishlist/${user.email}`);

      if (!res.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      return res.json();
    },
  });

  return {
    wishlist,
    isLoading,
    refetchMyWishlist: refetch,
    wishlistCount: wishlist.length,
    error,
  };
};

export default useWishlist;
