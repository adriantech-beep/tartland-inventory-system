import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOutIcon, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetActiveUser } from "./useGetActiveUser";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema, type EditUserForm } from "./editUserSchema";
import { FormProvider, useForm } from "react-hook-form";
import EditAccount from "./EditAccount";
import { useEditUser } from "./useEditUser";

const Account = () => {
  const [editingUser, setEditingUser] = useState<EditUserForm | null>(null);
  const { data: user } = useGetActiveUser();
  const { email, name, avatar } = user ?? {};
  const { mutate: editUser } = useEditUser(() => setEditingUser(null));

  console.log(editingUser);

  const [open, setOpen] = useState(false);

  const form = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      avatar: user?.avatar,
    },
  });

  const { handleSubmit } = form;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const onSubmit = (values: EditUserForm) => {
    editUser({ id: editingUser?._id!, values });
    setOpen(false);
  };

  const handleEdit = (editingUser: EditUserForm) => {
    setEditingUser(editingUser);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-105 transition-transform">
            <AvatarImage
              src={avatar || "https://github.com/shadcn.png"}
              alt={name}
            />
            <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {name ? name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      >
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={avatar || "https://github.com/shadcn.png"}
              alt={name}
            />
            <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {name ? name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {name || "User"}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {email || "No email"}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleEdit(user);
                setOpen(true);
              }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
            >
              <UserRound className="h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-400">
                Update your account details below.
              </DialogDescription>
            </DialogHeader>

            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <EditAccount />

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary text-white">
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-md cursor-pointer mt-1"
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Account;
