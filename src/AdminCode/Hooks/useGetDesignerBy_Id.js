import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetDesignerBy_Id = ({ id }) => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const {
    data: DesignerData,
    isLoading: DesignerDataLoading,
    error: DesignerDataError,
    isError: IsDesignerDataError,
    refetch: refetchDesignerData,
  } = useQuery({
    queryKey: ["designer", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`${base_url}/designers/${id}`);
      return res.data;
    },
  });

  return {
    DesignerData,
    DesignerDataLoading,
    DesignerDataError,
    IsDesignerDataError,
    refetchDesignerData,
  };
};

export default useGetDesignerBy_Id;
