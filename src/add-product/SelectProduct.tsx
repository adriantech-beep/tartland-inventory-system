import { useFormContext } from "react-hook-form";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMaterialSettings } from "@/material-settings/useMaterialSettings";
import type { AddProductForm } from "./addProductSchema";

type ProductField = {
  value: string;
  label: string;
  material: {
    id: string;
    name: string;
    perGrams: number;
    perBox: any;
  };
};

const SelectProduct = () => {
  const { data: materials = [] } = useMaterialSettings();
  const { control } = useFormContext<AddProductForm>();

  const productOptions: ProductField[] = materials.map(
    (material: { id: any; name: any; perGrams: any; perBox: any }) => ({
      value: material.id,
      label: `${material.name} x ${material.perBox} (${material.perGrams}g)each`,
      material: {
        id: material.id,
        name: material.name,
        perGrams: material.perGrams,
        perBox: material.perBox,
      },
    })
  );
  return (
    <FormField
      control={control}
      name="rawMaterialDetails"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select Product</FormLabel>
          <Select
            onValueChange={(val) => {
              const selected = productOptions.find((m) => m.value === val);
              field.onChange(selected?.material ?? null);
              field.onBlur();
            }}
            value={field.value?.id ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Choose a flavor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {productOptions.map((mixture) => (
                <SelectItem key={mixture.value} value={mixture.value}>
                  {mixture.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectProduct;
