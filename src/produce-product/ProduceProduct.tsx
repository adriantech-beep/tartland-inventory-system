import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  produceProductSchema,
  type ProduceProductForm,
} from "./produceProductSchema";
import SelectFlavor from "./SelectFlavor";
import {
  createProductionPayload,
  type ProductionLog,
} from "@/production/utils/produceProduct";
import { useCreateProduction } from "./useCreateProduction";
import { productionLogsHeadings } from "@/constant/productionLogsHeadings";
import ProductionLogTable from "./ProductionLogTable";
import { useGetProductionLog } from "./useGetProductionLog";
import { useEditProductionLog } from "./useEditProduction";
import { PackageSearch } from "lucide-react";

const ProduceProduct = () => {
  const [editingProduction, setEditingProduction] =
    useState<ProductionLog | null>(null);

  const { mutate: createProduction } = useCreateProduction();
  const { data: productionLog = [], isLoading } = useGetProductionLog();
  const { mutate: editProduction } = useEditProductionLog(() =>
    setEditingProduction(null)
  );

  const form = useForm<ProduceProductForm>({
    resolver: zodResolver(produceProductSchema),
    defaultValues: {
      selectedMixture: {},
      mixtureCount: "",
    },
  });

  const { handleSubmit, getValues, reset } = form;

  const onSubmit = () => {
    const values = getValues();
    const payload = createProductionPayload(
      values.selectedMixture,
      parseInt(values.mixtureCount)
    );

    if (!payload) return;

    if (editingProduction?.id) {
      editProduction({
        id: editingProduction.id,
        payload,
      });
      setEditingProduction(null);
    } else {
      createProduction(payload);
    }

    reset();
  };

  const handleEdit = (production: ProductionLog) => {
    setEditingProduction(production);
    reset({
      selectedMixture: production.selectedMixture,
      mixtureCount: production.mixtureCount.toString(),
    });
  };

  return (
    <FormProvider {...form}>
      <div className="w-full mx-auto px-4 py-8 space-y-8">
        <div className="w-full mx-auto p-6 bg-card text-card-foreground rounded-xl border border-border shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <PackageSearch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Produce Product
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter the mixture details below to produce a batch.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:flex-[1.5] w-full">
                <SelectFlavor />
              </div>

              <div className="sm:flex-1 w-full">
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Mixture Count
                </label>
                <Input
                  type="number"
                  {...form.register("mixtureCount")}
                  placeholder="Enter mixture count"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="px-6">
                {editingProduction ? "Update" : "Produce"}
              </Button>
            </div>
          </form>
        </div>

        <div className="w-full overflow-x-auto border border-border rounded-xl bg-card text-card-foreground shadow-md transition-colors">
          <Table>
            <TableHeader>
              <TableRow>
                {productionLogsHeadings.map((name, i) => (
                  <TableHead
                    key={i}
                    className="text-sm font-semibold text-muted-foreground"
                  >
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
              ) : productionLog.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No data to show
                  </TableCell>
                </TableRow>
              ) : (
                productionLog.map((production: ProductionLog) => (
                  <ProductionLogTable
                    key={production?.id}
                    production={production}
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

export default ProduceProduct;
