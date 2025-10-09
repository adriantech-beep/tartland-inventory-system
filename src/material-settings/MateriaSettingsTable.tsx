import { TableCell, TableRow } from "@/components/ui/table";
import type { MaterialSettingsForm } from "./materialSettingsSchema";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import ConfirmDelete from "@/components/ConfirmDelete";
import { useDeleteMaterialSetting } from "./useDeleteMaterialSettings";

interface MateriaSettingsTableProps {
  material: MaterialSettingsForm;
  handleEdit: (production: MaterialSettingsForm) => void;
}
const MateriaSettingsTable = ({
  material,
  handleEdit,
}: MateriaSettingsTableProps) => {
  const { id, name, perGrams, perBox, rawMaterialCategory, unit } = material;

  const { mutate: deleteMaterial } = useDeleteMaterialSetting();
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{perGrams}</TableCell>
      <TableCell>{perBox}</TableCell>
      <TableCell>{rawMaterialCategory}</TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            handleEdit(material);
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
            onHandleDelete={() => deleteMaterial(id!)}
            message={`Delete ${name} (${rawMaterialCategory} boxes)?`}
          />
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default MateriaSettingsTable;
