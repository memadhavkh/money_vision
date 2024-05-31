import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
} from "@/components/ui/sheet";
import { useNewCategory } from "../hooks/use-new-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { z } from "zod";
import { insertCategorySchema } from "@/db/schema";
import { useCreateCategory } from "../api/use-create-category";

const NewCategorySheet = () => {
  const formSchema = insertCategorySchema.pick({
    name: true,
  });
  type FormValues = z.input<typeof formSchema>;
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
        onSuccess: () => {
          onClose();
        }
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.</SheetDescription>
        </SheetHeader>
        <CategoryForm
          defaultValues={{
            name: "",
          }}
          onSubmit={onSubmit}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
