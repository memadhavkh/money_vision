"use client"
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useDeleteCategory } from '@/features/categories/api/use-delete-category';
import { useOpenCategory } from '@/features/categories/hooks/use-open-category';
import { useConfirm } from '@/hooks/use-confirm';
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
type Props = {
    id: string
}
export const Actions = ({id}: Props) => {
    const {
        onOpen
    } = useOpenCategory();
    const deleteMutation = useDeleteCategory(id);
    const [ConfirmationDialog, confirm] = useConfirm(
        "Are you sure",
        "Your are about to delete this category"
    )
    const handleDelete = async () => {
        const ok = await confirm();
        if(ok) deleteMutation.mutate()
    }
    return (
        <>
        <ConfirmationDialog/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='size-8 p-0'>
                        <MoreHorizontal className='size-4'/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id) }>
                        <Edit className='size-4 mr-2'/>
                        <div className="size-4 mr-2">Edit</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
                        <Trash className='size-4 mr-2'/>
                        <div className="size-4 mr-2">Delete</div>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}