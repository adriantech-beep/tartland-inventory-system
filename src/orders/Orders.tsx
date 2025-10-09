import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { type OrderForm, orderFormSchema } from "./ordersSchema";
import SelectFlavorOrder from "./SelectFlavorOrder";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateOrder } from "./useCreateOrder";
import { ListOrdered } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderHeadings } from "@/constant/orderHeadings";
import { useGetOrders } from "./useGetOrders";
import OrderTable from "./OrderTable";
import { useEditOrder } from "./useEditOrder";
import { useState } from "react";

interface FieldConfig {
  name: keyof OrderForm;
  label: string;
  placeholder: string;
  type: "text" | "number";
}

const orderFields: FieldConfig[] = [
  {
    name: "customerName",
    label: "Enter customer name",
    placeholder: "Please enter customer/delear name",
    type: "text",
  },
  {
    name: "bundleCount",
    label: "Enter bundle count",
    placeholder: "Please enter bundle count",
    type: "number",
  },
];

const Orders = () => {
  const [editingInbound, setEditingInbound] = useState<OrderForm | null>(null);
  const { mutate: createOrder } = useCreateOrder();
  const { data: orders = [], isLoading } = useGetOrders();
  const { mutate: editOrder } = useEditOrder(() => setEditingInbound(null));

  const form = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerName: "",
      flavorName: "",
      bundleCount: 0,
    },
    mode: "onTouched",
  });

  const { control, getValues, handleSubmit, reset } = form;

  const onSubmit = () => {
    const values = getValues();

    if (!values) return;

    if (editingInbound) {
      editOrder({ id: editingInbound.id!, values });
    } else {
      createOrder(values);
    }
    reset();
  };

  const handleEdit = (editingInbound: OrderForm) => {
    setEditingInbound(editingInbound);
    reset({
      customerName: editingInbound.customerName,
      flavorName: editingInbound.flavorName,
      bundleCount: editingInbound.bundleCount,
    });
  };

  const handleCancel = () => {
    reset({
      customerName: "",
      flavorName: "",
      bundleCount: 0,
    });
    setEditingInbound(null);
  };

  return (
    <FormProvider {...form}>
      <div className="w-full mx-auto px-4 py-8 space-y-8">
        <div className="w-full mx-auto p-6 bg-card text-card-foreground rounded-xl border border-border shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <ListOrdered className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Customer Detail Information
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter customer order details below.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-6 p-4">
              {orderFields.map(({ name, label, placeholder, type }) => (
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
              <div>
                <SelectFlavorOrder />
              </div>
            </div>

            <div className="flex justify-end gap-4">
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
                {orderHeadings.map((name, i) => (
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
                    Loading order logs...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No data to show
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order: OrderForm) => (
                  <OrderTable
                    key={order?.id}
                    order={order}
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

export default Orders;
