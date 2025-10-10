import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { LoginForm } from "./loginSchema";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import type { JSX } from "react";

type FieldConfig = {
  name: keyof LoginForm;
  placeholder: string;
  type: string;
  icon: JSX.Element;
};

const userInfoFields: FieldConfig[] = [
  {
    name: "email",
    placeholder: "Enter email address",
    type: "email",
    icon: <Mail className="w-4 h-4 text-stone-500" />,
  },
  {
    name: "password",
    placeholder: "Enter password",
    type: "password",
    icon: <Lock className="w-4 h-4 text-stone-500" />,
  },
];

const LoginFields = () => {
  const { control } = useFormContext<LoginForm>();
  return (
    <div className="space-y-4">
      {userInfoFields.map(({ name, placeholder, type, icon }) => (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    {icon}
                  </span>
                  <Input
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    value={(field.value as string | undefined) ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="pl-10 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
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

export default LoginFields;
