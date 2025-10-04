import { useFormContext } from "react-hook-form";
import type { ProduceProductForm } from "./produceProductSchema";
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
import { useGetMixtureRule } from "@/mixture-settings/useGetMixtureRule";

type MixtureField = {
  value: string;
  label: string;
  mixtureToUse: {
    id: string;
    flavor: string;
    mixtureCount: number;
    material: any;
    jarMaterial: any;
  };
};

const SelectFlavor = () => {
  const { data: mixtures = [] } = useGetMixtureRule();
  const { control } = useFormContext<ProduceProductForm>();

  const mixtureOptions: MixtureField[] = mixtures.map(
    (mix: {
      id: any;
      flavor: any;
      mixtureCount: any;
      bagsPerMixture: any;
      jarMaterial: any;
    }) => ({
      value: String(mix.id),
      label: mix.flavor,
      mixtureToUse: {
        id: mix.id,
        flavor: mix.flavor,
        mixtureCount: mix.mixtureCount,
        material: mix.bagsPerMixture,
        jarMaterial: mix.jarMaterial,
      },
    })
  );

  return (
    <FormField
      control={control}
      name="selectedMixture"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select Flavor</FormLabel>
          <Select
            onValueChange={(val) => {
              const selected = mixtureOptions.find((m) => m.value === val);
              field.onChange(selected?.mixtureToUse ?? null);
            }}
            value={field.value?.id ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Choose a flavor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mixtureOptions.map((mixture) => (
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

export default SelectFlavor;
