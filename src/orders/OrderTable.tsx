import ConfirmDelete from "@/components/ConfirmDelete";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Edit3, Trash2 } from "lucide-react";
import type { OrderForm } from "./ordersSchema";
import { dateFormatter } from "@/helpers/dateFormatter";
import { useDeleteOrder } from "./useDeleteOrder";

interface OrderTableProps {
  order: OrderForm;
  handleEdit: (production: OrderForm) => void;
}
const OrderTable = ({ order, handleEdit }: OrderTableProps) => {
  const { id, createdAt, customerName, flavorName, bundleCount } = order;
  const { mutate: deleteOrder } = useDeleteOrder();

  return (
    <TableRow>
      <TableCell> {createdAt ? dateFormatter(createdAt) : "N/A"}</TableCell>
      <TableCell>{customerName}</TableCell>
      <TableCell>{flavorName}</TableCell>
      <TableCell>{bundleCount}</TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            handleEdit(order);
          }}
          className="text-primary hover:text-primary/80"
        >
          <Edit3 className="w-4 h-4 mr-1" />
          Edit
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive/80"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <ConfirmDelete
            onHandleDelete={() => deleteOrder(id!)}
            message={`Delete ${customerName} (${flavorName} boxes)?`}
          />
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default OrderTable;
