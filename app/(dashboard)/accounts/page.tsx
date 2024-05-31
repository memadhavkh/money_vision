"use client";
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { Loader2, Plus } from 'lucide-react';
import {columns} from './columns.tsx'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete-accounts.ts';
const AccountsPage = () => {
    const newAccount = useNewAccount();
    const accountsQuery = useGetAccounts();
    const accounts = accountsQuery.data || [];
    const deleteAccounts = useBulkDeleteAccounts();
    const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending
    if(accountsQuery.isLoading){
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
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>
                        Accounts Page
                    </CardTitle>
                    <Button  onClick={newAccount.onOpen} size='sm'>
                        <Plus className='size-4 mr-2'/>
                        Add New Account
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable onDelete={(row) => {
                        const ids = row.map((r) => r.original.id)
                        deleteAccounts.mutate({ ids })
                    }} disabled={isDisabled} filterKey='name' columns={columns} data={accounts} />
                </CardContent>
            </Card>
        </div>
    )
};
export default AccountsPage;