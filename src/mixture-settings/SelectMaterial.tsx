import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMaterialSettings } from "@/material-settings/useMaterialSettings";
import { useFormContext, type ControllerRenderProps } from "react-hook-form";
import type { MixtureRuleForm } from "./mixtureRuleSchema";

type OptionField = {
  label: string;
  value: string;
  material: {
    id: string;
    name: string;
    perGrams: number;
    perBox: number;
  };
};

type SelectFlakesProps = {
  name: keyof Pick<
    MixtureRuleForm,
    "primaryFlavorName" | "secondaryFlavorName" | "jarMaterial"
  >;
  label: string;
  materialName: string;
};

const SelectMaterial = ({ name, label, materialName }: SelectFlakesProps) => {
  const { data: materials = [] } = useMaterialSettings();
  const { control } = useFormContext<MixtureRuleForm>();

  const flakesOptions: OptionField[] = materials
    .filter((mat: any) => mat.rawMaterialCategory === materialName)
    .map((mat: any) => ({
      value: mat.id,
      label: `${mat.name} (${mat.perGrams}g)`,
      material: {
        id: mat.id,
        name: mat.name,
        perGrams: mat.perGrams,
        perBox: mat.perBox,
      },
    }));

  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<MixtureRuleForm, typeof name>;
      }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            value={field.value?.material?.id || ""}
            onValueChange={(val) => {
              const selected = flakesOptions.find((opt) => opt.value === val);
              if (selected) {
                field.onChange({
                  material: { ...selected.material },
                });
              }
            }}
          >
            <FormControl>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available {materialName}</SelectLabel>
                {flakesOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectMaterial;
