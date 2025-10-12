import { useFormContext } from "react-hook-form";
import type { EditUserForm } from "./editUserSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FieldConfig = {
  name: keyof EditUserForm;
  placeholder: string;
  type: string;
  accept?: string;
};

const userInfoFields: FieldConfig[] = [
  {
    name: "name",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Enter email address",
    type: "email",
  },
  {
    name: "avatar",
    placeholder: "Please choose an avatar",
    type: "file",
    accept: "image/*",
  },
];

const EditAccount = () => {
  const { control } = useFormContext<EditUserForm>();

  return (
    <div className="space-y-4">
      {userInfoFields.map(({ name, placeholder, type, accept }) => (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative mt-2">
                  <Input
                    type={type}
                    placeholder={placeholder}
                    accept={accept}
                    {...(type === "file"
                      ? {
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                            field.onChange(e.target.files?.[0]),
                        }
                      : {
                          value: field.value ?? "",
                          onChange: field.onChange,
                        })}
                    className="text-stone-800 pl-10 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500 font-sans text-sm mt-1" />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default EditAccount;
