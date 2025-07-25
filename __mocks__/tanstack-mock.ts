import { useQuery } from "@tanstack/react-query";

export function useProductsMock() {
    return useQuery({ queryKey: ['customHook'], queryFn: () => 'Hello' })
}