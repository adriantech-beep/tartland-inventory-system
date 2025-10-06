import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  materialSettingsSchema,
  type MaterialSettingsForm,
} from "./materialSettingsSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { materialSettingsHeadings } from "@/constant/materialSettingsHeadings";
import SelectMaterial from "./SelectMaterial";
import { useCreateMaterialSettings } from "./useCreateMaterialSettings";
import { useMaterialSettings } from "./useMaterialSettings";
import MateriaSettingsTable from "./MateriaSettingsTable";
import { useState } from "react";
import { useEditMaterialSettings } from "./useEditMaterialSettings";

interface FieldConfig {
  name: keyof MaterialSettingsForm;
  label: string;
  placeholder: string;
  type: "text" | "number";
}

const materialFields: FieldConfig[] = [
  {
    name: "name",
    label: "Material name",
    placeholder: "Enter material name",
    type: "text",
  },
  {
    name: "perBox",
    label: "Items per box",
    placeholder: "Enter number of items per box",
    type: "number",
  },
  {
    name: "perGrams",
    label: "Grams per bag/jar",
    placeholder: "Enter grams per bag/jar",
    type: "number",
  },
  {
    name: "unit",
    label: "Unit (e.g. bags, jars)",
    placeholder: "Enter unit name",
    type: "text",
  },
];

const MaterialSettings = () => {
  const [editingInbound, setEditingInbound] =
    useState<MaterialSettingsForm | null>(null);
  const { mutate: createMaterial } = useCreateMaterialSettings();
  const { data: materials = [], isLoading } = useMaterialSettings();
  const { mutate: editMaterial } = useEditMaterialSettings(() =>
    setEditingInbound(null)
  );
  const form = useForm<MaterialSettingsForm>({
    resolver: zodResolver(materialSettingsSchema),
    defaultValues: {
      name: "",
      perBox: undefined,
      perGrams: undefined,
      rawMaterialCategory: "",
      unit: "",
    },
    mode: "onTouched",
  });

  const { getValues, control, handleSubmit, reset } = form;

  const onSubmit = () => {
    const values = getValues();

    if (!values) return;

    if (editingInbound) {
      editMaterial({ id: editingInbound.id!, values });
    } else {
      createMaterial(values);
    }
  };

  const handleEdit = (material: MaterialSettingsForm) => {
    setEditingInbound(material);
    reset({
      name: material.name,
      perBox: material.perBox,
      perGrams: material.perGrams,
      rawMaterialCategory: material.rawMaterialCategory,
      unit: material.unit,
    });
  };

  return (
    <FormProvider {...form}>
      <div className="w-full mx-auto px-4 py-8 space-y-8">
        <div className="w-full mx-auto p-6 bg-card text-card-foreground rounded-xl border border-border shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <SlidersHorizontal />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Material Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Default settings for items per box
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              {materialFields.map(({ name, label, placeholder, type }) => (
                <FormField
                  key={name}
                  control={control}
                  name={name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type={type}
                          placeholder={placeholder}
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              type === "number" && e.target.value !== ""
                                ? Number(e.target.value)
                                : e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="mt-2">
              <SelectMaterial control={control} />
            </div>

            <div className="flex justify-end mt-2">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>

        <div className="w-full overflow-x-auto border border-border rounded-xl bg-card text-card-foreground shadow-md transition-colors">
          <Table>
            <TableHeader>
              <TableRow>
                {materialSettingsHeadings.map((name, i) => (
                  <TableHead key={i} className="text-sm font-semibold ">
                    {name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    Loading production logs...
                  </TableCell>
                </TableRow>
              ) : materials.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No data to show
                  </TableCell>
                </TableRow>
              ) : (
                materials.map((material: MaterialSettingsForm) => (
                  <MateriaSettingsTable
                    key={material?.id}
                    material={material}
                    handleEdit={handleEdit}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </FormProvider>
  );
};

export default MaterialSettings;
