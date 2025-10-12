import { FormProvider, useForm } from "react-hook-form";
import {
  companySettingsSchema,
  type CompanySettingsForm,
} from "./companySettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCreateCompanySettings } from "./useCreateCompanySettings";
import { Button } from "@/components/ui/button";
import { useGetCompanyProfile } from "./useGetCompanyProfile";
import { useState } from "react";

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

const CompanySettings = () => {
  const { data: companyProfile } = useGetCompanyProfile();
  const { mutate: createCompanySettings } = useCreateCompanySettings();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<CompanySettingsForm>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      companyName: "",
      avatar: "",
    },
  });

  const { control, handleSubmit, watch } = form;

  const avatarFile = watch("avatar");
  if (avatarFile instanceof File && !preview) {
    const url = URL.createObjectURL(avatarFile);
    setPreview(url);
  }

  const onSubmit = (values: CompanySettingsForm) => {
    createCompanySettings(values);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start justify-center p-6">
      <Card className="p-4 w-full md:w-1/3 flex flex-col items-center text-center border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Company Preview
        </h2>
        <img
          src={preview || companyProfile?.avatar || "/placeholder-logo.png"}
          alt="Company Logo"
          className="h-24 w-24 object-cover rounded-full border mb-3"
        />
        <p className="text-base font-medium text-gray-700">
          {watch("companyName") ||
            companyProfile?.companyName ||
            "Company Name"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {companyProfile ? "Current settings loaded" : "No settings yet"}
        </p>
      </Card>

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full md:w-1/2"
        >
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

          <Button type="submit" className="w-fit self-end">
            Save Settings
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CompanySettings;
