import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

const fetchHeroSlider = async () => {
  const res = await axios.get(`${base_url}/hero-slider`);
  return res.data;
};

const useHeroSlider = () => {
  const { data, isLoading, error, refetch, isFetching, isError } = useQuery({
    queryKey: ["hero-slider"],
    queryFn: fetchHeroSlider,
    staleTime: 1000 * 60 * 5,
  });

  return {
    heroSlider: data,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  };
};

export default useHeroSlider;
