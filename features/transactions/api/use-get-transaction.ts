import {useQuery} from "@tanstack/react-query"
import {client} from '@/lib/hono'
import { convertAmountFromMilliunits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        queryKey: ['transaction', {id}],
        queryFn: async () => {
            const response =  await client.api.transactions[":id"].$get({
                param: {id}
            })
            if(!response.ok) {throw new Error("Failed to fetch transactions");}
            const { data } = await response.json();
            return {
                ...data,
                amount: convertAmountFromMilliunits(data.amount)
            };
        }
    });
    return query;
}