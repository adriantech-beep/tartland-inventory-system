import { useFormContext } from "react-hook-form";
import { type CompanySettingsForm } from "./companySettingsSchema";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FieldConfig = {
  name: keyof CompanySettingsForm;
  placeholder: string;
  type: string;
  accept?: string;
};

const companyInfoFields: FieldConfig[] = [
  {
    name: "companyName",
    placeholder: "Enter your company name",
    type: "text",
  },
  {
    name: "avatar",
    placeholder: "Please choose an avatar",
    type: "file",
    accept: "image/*",
  },
];

const CompanySettingsField = ({ setPreview }: any) => {
  const { control } = useFormContext<CompanySettingsForm>();
  return (
    <Card className="space-y-4 p-6 shadow-sm border border-gray-200">
      {companyInfoFields.map(({ name, placeholder, type, accept }) => (
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
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setPreview(URL.createObjectURL(file));
                            }
                          },
                        }
                      : {
                          value: field.value ?? "",
                          onChange: field.onChange,
                        })}
                    className="text-stone-800 pl-10 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500 font-sans text-sm mt-1" />
            </FormItem>
          )}
        />
      ))}
    </Card>
  );
};

export default CompanySettingsField;
