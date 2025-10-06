import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddInboundLog } from "./useAddInboundLog";
import {
  createAddProduct,
  type AddInboundPayload,
} from "@/production/utils/addProduct";
import SelectProduct from "./SelectProduct";
import { addProductSchema, type AddProductForm } from "./addProductSchema";
import { PackageOpen } from "lucide-react";
import { useGetInboundLogs } from "./useGetInboundLog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { productHeadings } from "@/constant/productHeadings";
import InboundLogTable from "./InboundLogTable";
import { useState } from "react";
import { useEditInboundLog } from "./useEditInboundLog";
import { FormMessage } from "@/components/ui/form";

const AddProduct = () => {
  const [editingInbound, setEditingInbound] =
    useState<AddInboundPayload | null>(null);
  const { mutate: createInboundLog } = useAddInboundLog();
  const { mutate: editInboundLog } = useEditInboundLog(() =>
    setEditingInbound(null)
  );
  const { data: inboundlogs = [], isLoading } = useGetInboundLogs();

  const form = useForm<AddProductForm>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      rawMaterialDetails: { id: "", name: "", perGrams: 0, perBox: 0 },
      boxCount: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, getValues, reset } = form;

  const onSubmit = () => {
    const values = getValues();
    const payload = createAddProduct(values);
    if (!payload) return;

    if (editingInbound?.id) {
      editInboundLog({ id: editingInbound.id, payload });
    } else {
      createInboundLog(payload);
    }
    reset();
    setEditingInbound(null);
  };

  const handleEdit = (editingInbound: AddInboundPayload) => {
    setEditingInbound(editingInbound);
    reset({
      rawMaterialDetails: editingInbound.rawMaterial,
      boxCount: editingInbound.boxCount.toString(),
    });
  };

  return (
    <FormProvider {...form}>
      <div className="w-full mx-auto px-4 py-8 space-y-8">
        <div className="w-full mx-auto p-6 bg-card text-card-foreground rounded-xl border border-border shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <PackageOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Product Inbound Detail Information
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter inbound details below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <SelectProduct />
              <FormMessage />
              <div className="sm:flex-1 w-full">
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Box Count
                </label>
                <Input
                  type="number"
                  {...form.register("boxCount")}
                  placeholder="Enter box count"
                />
                <FormMessage />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                {editingInbound ? "Update" : "Produce"}
              </Button>
            </div>
          </form>
        </div>

        <div className="w-full overflow-x-auto border border-border rounded-xl bg-card text-card-foreground shadow-md transition-colors">
          <Table>
            <TableHeader>
              <TableRow>
                {productHeadings.map((name, i) => (
                  <TableHead key={i} className="text-sm font-semibold ">
                    {name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading inbound logs...
                  </TableCell>
                </TableRow>
              ) : inboundlogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No data to show
                  </TableCell>
                </TableRow>
              ) : (
                inboundlogs.map((inbound: AddInboundPayload) => (
                  <InboundLogTable
                    key={inbound?.id}
                    inbound={inbound}
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

export default AddProduct;
