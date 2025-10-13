import { FormProvider, useForm } from "react-hook-form";
import {
  companySettingsSchema,
  type CompanySettingsForm,
} from "./companySettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { useCreateCompanySettings } from "./useCreateCompanySettings";
import { Button } from "@/components/ui/button";
import { useGetCompanyProfile } from "./useGetCompanyProfile";
import { useState } from "react";
import { useEditCompanyProfile } from "./useEditCompanySettings";
import CompanySettingsField from "./CompanySettingsField";

const CompanySettings = () => {
  const [editingCompanyProfile, setEditingCompanyProfile] =
    useState<CompanySettingsForm | null>(null);

  const { mutate: editCompanyProfile } = useEditCompanyProfile(() =>
    setEditingCompanyProfile(null)
  );
  const { mutate: createCompanyProfile } = useCreateCompanySettings();
  const { data: companyProfile } = useGetCompanyProfile();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<CompanySettingsForm>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      companyName: "",
      avatar: undefined,
    },
  });

  const { handleSubmit, watch, reset } = form;

  const avatarFile = watch("avatar");
  if (avatarFile instanceof File && !preview) {
    const url = URL.createObjectURL(avatarFile);
    setPreview(url);
  }

  const onSubmit = (values: CompanySettingsForm) => {
    if (editingCompanyProfile) {
      editCompanyProfile({ id: companyProfile.id, values });
    } else {
      createCompanyProfile(values);
    }
    reset({
      companyName: "",
      avatar: undefined,
    });
  };

  const handleEdit = (editingCompanyProfile: CompanySettingsForm) => {
    setEditingCompanyProfile(editingCompanyProfile);
    reset({
      companyName: editingCompanyProfile.companyName,
      avatar: editingCompanyProfile.avatar,
    });
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
        <p
          className="text-md text-gray-500 mt-1 cursor-pointer"
          onClick={() => handleEdit(companyProfile)}
        >
          Edit
        </p>
      </Card>

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full md:w-1/2"
        >
          <CompanySettingsField setPreview={setPreview} />
          <Button type="submit" className="w-fit self-end">
            {editingCompanyProfile ? "Edit Settings" : "Save Settings"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CompanySettings;
