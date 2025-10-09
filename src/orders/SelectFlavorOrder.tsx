import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetProductsProduced } from "@/produced-inventory/useGetProductsProduced";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import type { OrderForm } from "./ordersSchema";

type FlavorField = {
  value: string;
  label: string;
};
const SelectFlavorOrder = () => {
  const { data: productsProduced = [] } = useGetProductsProduced();
  const { control } = useFormContext<OrderForm>();

  const flavorOptions: FlavorField[] = productsProduced.map(
    (product: { flavor: any }) => ({
      value: product.flavor,
      label: product.flavor,
    })
  );
  return (
    <FormField
      control={control}
      name="flavorName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Choose flavor</FormLabel>
          <Select
            value={field.value}
            onValueChange={(val) => {
              field.onChange(val);
              field.onBlur();
            }}
          >
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select flavor" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {flavorOptions.map((flavor) => (
                  <SelectItem key={flavor.value} value={flavor.value}>
                    {flavor.label}
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

export default SelectFlavorOrder;
