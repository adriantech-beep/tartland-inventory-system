import ConfirmDelete from "@/components/ConfirmDelete";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit3, Trash2 } from "lucide-react";
import { useDeleteMixtureRule } from "./useDeleteMixtureRule";

interface BagPerMixture {
  material: {
    id?: string;
    name: string;
    perBox: number;
    perGrams: number;
  };
  count: number;
  id?: string;
}

export interface MixtureRuleData {
  id?: string;
  flavor: string;
  mixtureCount: number;
  bagsPerMixture: BagPerMixture[];
  jarMaterial: {
    material: {
      id: string;
      name: string;
      perBox: number;
      perGrams: number;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

interface MixtureRuleTableProps {
  mixture: MixtureRuleData;
  handleEdit?: (mixture: any) => void;
}

const MixtureRuleTable = ({ mixture, handleEdit }: MixtureRuleTableProps) => {
  const { id, flavor, bagsPerMixture, mixtureCount, jarMaterial } =
    mixture ?? {};
  const { mutate: deleteMixtureRule } = useDeleteMixtureRule();

  return (
    <TableRow key={id}>
      <TableCell className="font-semibold">{flavor}</TableCell>

      <TableCell>
        {bagsPerMixture?.length > 0 ? (
          bagsPerMixture
            .map((bag) => `${bag.material.name} × ${bag.count}`)
            .join(", ")
        ) : (
          <span className="text-gray-400 italic">No data</span>
        )}
      </TableCell>
      <TableCell>{mixtureCount}</TableCell>
      <TableCell>{jarMaterial.material?.perGrams}g</TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            handleEdit?.(mixture);
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
            onHandleDelete={() => deleteMixtureRule(id!)}
            message={`Delete ${flavor} (${mixtureCount} boxes)?`}
          />
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default MixtureRuleTable;
