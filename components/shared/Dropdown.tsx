import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim(),
    }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();

    // Detect if the user is on a mobile device
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}

        {/* Conditionally render based on device */}
        {isMobile ? (
          <button
            className="dark:hover:bg-gray-900 p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500"
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileModal(true);
            }}
          >
            Add new category
          </button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger
              onClick={(e) => e.stopPropagation()}
              className="dark:hover:bg-gray-900 p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500"
            >
              Add new category
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:bg-gray-900 bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Category name"
                    className="input-field mt-3"
                    onChange={(e) => setNewCategory(e.target.value)}
                    autoFocus={false}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddCategory)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Mobile-specific modal */}
        {showMobileModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-md w-3/4">
              <h2 className="text-lg font-semibold">New Category</h2>
              <Input
                type="text"
                placeholder="Category name"
                className="input-field mt-3"
                onChange={(e) => setNewCategory(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2"
                  onClick={() => setShowMobileModal(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleAddCategory();
                    setShowMobileModal(false);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
