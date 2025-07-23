import { useQuery } from "@tanstack/react-query";

const useProducts = ({endpoint}: {endpoint: string}) => {
    const fetchProducts = async ({ signal }: { signal: AbortSignal }) => {
        const response = await fetch(endpoint, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      };
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [endpoint],
        queryFn: fetchProducts,
    })
    return { data, isLoading, isError, error };
};

export default useProducts;