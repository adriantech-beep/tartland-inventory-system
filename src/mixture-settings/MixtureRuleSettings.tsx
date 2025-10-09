import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { mixtureRuleSchema, type MixtureRuleForm } from "./mixtureRuleSchema";
import { Button } from "@/components/ui/button";
import SelectMaterial from "./SelectMaterial";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SlidersHorizontal } from "lucide-react";
import { createMixture } from "@/production/utils/addMixture";
import { useCreateMixtureRule } from "./useCreateMixtureRule";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mixtureruleSettingsHeadings } from "@/constant/mixtureRuleSettingsHeadings";
import { useGetMixtureRule } from "./useGetMixtureRule";
import MixtureRuleTable, { type MixtureRuleData } from "./MixtureRuleTable";
import { useEditMixtureRule } from "./useEditMixtureRule";
import { useState } from "react";

interface FieldConfig {
  name:
    | "flavor"
    | "mixtureCount"
    | "bagsPerMixtureForPrimary"
    | "bagsPerMixtureForSecondary";
  label: string;
  placeholder: string;
  type: "text" | "number";
}

const mixtureFields: FieldConfig[] = [
  {
    name: "flavor",
    label: "Mixture name",
    placeholder: "Enter mixture name",
    type: "text",
  },
  {
    name: "mixtureCount",
    label: "Mixture count",
    placeholder: "Default mixture count (1)",
    type: "number",
  },
  {
    name: "bagsPerMixtureForPrimary",
    label: "Enter how many bags of flakes (primary)",
    placeholder: "Choose how many bags of flakes (primary) ",
    type: "number",
  },
  {
    name: "bagsPerMixtureForSecondary",
    label: "Enter how many bags of flakes (secondary)",
    placeholder: "Enter how many bags of flakes (secondary) ",
    type: "number",
  },
];

const MixtureRuleSettings = () => {
  const [editingInbound, setEditingInbound] = useState<MixtureRuleData | null>(
    null
  );
  const { mutate: createMixtureRule } = useCreateMixtureRule();
  const { data: mixtureRule = [], isLoading } = useGetMixtureRule();
  const { mutate: editMixtureRule } = useEditMixtureRule(() =>
    setEditingInbound(null)
  );

  console.log(mixtureRule);

  const form = useForm<MixtureRuleForm>({
    resolver: zodResolver(mixtureRuleSchema),
    defaultValues: {
      // id: "",
      flavor: "",
      mixtureCount: 1,
      primaryFlavorName: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
      bagsPerMixtureForPrimary: undefined,
      secondaryFlavorName: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
      bagsPerMixtureForSecondary: undefined,
      jarMaterial: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
    },
  });

  const { handleSubmit, getValues, control, reset } = form;

  const onSubmit = () => {
    const values = getValues();
    const payload = createMixture(values);

    if (editingInbound) {
      editMixtureRule({ id: editingInbound.id!, values });
    } else {
      createMixtureRule(payload);
    }

    reset({
      id: "",
      flavor: "",
      mixtureCount: 1,
      primaryFlavorName: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
      bagsPerMixtureForPrimary: undefined,
      secondaryFlavorName: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
      bagsPerMixtureForSecondary: undefined,
      jarMaterial: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
    });
  };

  const handleEdit = (mixture: MixtureRuleData) => {
    setEditingInbound(mixture);

    const primary = mixture.bagsPerMixture[0];
    const secondary = mixture.bagsPerMixture[1];

    reset({
      id: mixture.id,
      flavor: mixture.flavor,
      mixtureCount: mixture.mixtureCount,
      // primaryFlavorName: primary ? { material: primary.material.name } : null,
      bagsPerMixtureForPrimary: primary?.count ?? 0,
      // secondaryFlavorName: secondary
      //   ? { material: secondary.material.name }
      //   : null,
      bagsPerMixtureForSecondary: secondary?.count ?? 0,
      // jarMaterial: mixture.jarMaterial
      //   ? { material: mixture.jarMaterial }
      //   : null,
    });
  };

  const handleCancel = () => {
    reset({
      id: "",
      flavor: "",
      mixtureCount: 1,
      primaryFlavorName: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
      bagsPerMixtureForPrimary: undefined,
      secondaryFlavorName: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
      bagsPerMixtureForSecondary: undefined,
      jarMaterial: {
        material: { id: "", name: "", perGrams: 0, perBox: 0 },
      },
    });
    setEditingInbound(null);
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
                Mixture Rule Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Default settings for mixture
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              {mixtureFields.map(({ name, label, placeholder, type }) => (
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

            <div className="flex justify-between mt-4">
              <SelectMaterial
                name="primaryFlavorName"
                label="Select Primary Flavor Name"
                materialName="Flakes"
              />
              <SelectMaterial
                name="secondaryFlavorName"
                label="Select Secondary Flavor Name"
                materialName="Flakes"
              />
              <SelectMaterial
                name="jarMaterial"
                label="Select Jar size"
                materialName="Jar"
              />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              {editingInbound && (
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="text-sm bg-red-500 px-2"
                >
                  Cancel
                </Button>
              )}
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>

        <div className="w-full overflow-x-auto border border-border rounded-xl bg-card text-card-foreground shadow-md transition-colors">
          <Table>
            <TableHeader>
              <TableRow>
                {mixtureruleSettingsHeadings.map((name, i) => (
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
              ) : mixtureRule.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No data to show
                  </TableCell>
                </TableRow>
              ) : (
                mixtureRule.map((mixture: MixtureRuleData) => (
                  <MixtureRuleTable
                    key={mixture?.id}
                    mixture={mixture}
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

export default MixtureRuleSettings;
