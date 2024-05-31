"use client";
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Loader2, Plus } from 'lucide-react';
import {columns} from './columns.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions.ts';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction.ts';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions.ts';
import { useState } from 'react';
import { UploadButton } from './upload-button';

enum VARIANTS {
    LIST="LIST",
    IMPORT="IMPORT"
}
const INITIALIMPORTRESULTS = {
    date: [],
    errors: [],
    meta: {}
}
const TransactionsPage = () => {
    const [variant, setVariants] = useState<VARIANTS>(VARIANTS.LIST);
    const newTransaction = useNewTransaction();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];
    const deleteTransactions = useBulkDeleteTransactions();
    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending
    if(transactionsQuery.isLoading){
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className='border-none drop-shadow-sm'>
                    <CardHeader>
                        <Skeleton/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className='size-6 text-slate-300 animate-spin'/>
                        </div>
                    </CardContent>

                </Card>
            </div>
        )
    }
    if(variant == VARIANTS.IMPORT){
        return (
            <>
            <div>This is a screen for import</div>
            </>
        )
    }
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>
                        Transactions History
                    </CardTitle>
                    <Button  onClick={newTransaction.onOpen} size='sm'>
                        <Plus className='size-4 mr-2'/>
                        Add New
                    </Button>
                    <UploadButton onUpload={() => {}} />
                </CardHeader>
                <CardContent>
                    <DataTable onDelete={(row) => {
                        const ids = row.map((r) => r.original.id)
                        deleteTransactions.mutate({ ids })
                    }} disabled={isDisabled} filterKey='payee' columns={columns} data={transactions} />
                </CardContent>
            </Card>
        </div>
    )
};
export default TransactionsPage;