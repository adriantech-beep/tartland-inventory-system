import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { dateFormatter } from "@/helpers/dateFormatter";
import type { AddInboundPayload } from "@/production/utils/addProduct";
import { Edit3, Trash2 } from "lucide-react";
import { useDeleteInboundLog } from "./useDeleteInboundLog";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import ConfirmDelete from "@/components/ConfirmDelete";

interface InboundLogTableProps {
  inbound: AddInboundPayload;
  handleEdit: (production: AddInboundPayload) => void;
}

const InboundLogTable = ({ inbound, handleEdit }: InboundLogTableProps) => {
  const { id, rawMaterial, boxCount, totalUnits, createdAt } = inbound;
  const { name, perGrams, perBox } = rawMaterial;

  const { mutate: deleteInboundLog } = useDeleteInboundLog();

  return (
    <TableRow>
      {createdAt ? dateFormatter(createdAt) : "N/A"}
      <TableCell>{name}</TableCell>
      <TableCell>{perBox} pcs</TableCell>
      <TableCell>{perGrams}g</TableCell>
      <TableCell>{boxCount}</TableCell>
      <TableCell>{totalUnits}</TableCell>
      <TableCell className="space-x-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            handleEdit(inbound);
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
            onHandleDelete={() => deleteInboundLog(id!)}
            message={`Delete ${inbound.rawMaterial.name} (${inbound.boxCount} boxes)?`}
          />
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default InboundLogTable;
