import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { TableRow, TableCell } from "@/components/ui/table";
import { useDeleteProductionLog } from "./useDeleteProductionLog";
import type { ProductionLog } from "@/production/utils/produceProduct";
import { dateFormatter } from "@/helpers/dateFormatter";
import { Button } from "@/components/ui/button";
import { Trash2, Edit3 } from "lucide-react";

interface ProductionLogTableProps {
  production: ProductionLog;
  handleEdit: (production: ProductionLog) => void;
}

const ProductionLogTable = ({
  production,
  handleEdit,
}: ProductionLogTableProps) => {
  const { mutate: deleteProduction } = useDeleteProductionLog();

  const {
    id,
    flavor,
    createdAt,
    mixtureCount,
    totalBundles,
    totalJars,
    materialsUsed,
  } = production;

  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <TableRow className="hover:bg-muted/60 transition-colors cursor-pointer">
          <TableCell className="font-medium text-foreground">
            {dateFormatter(createdAt!)}
          </TableCell>
          <TableCell className="text-foreground">{flavor}</TableCell>
          <TableCell className="text-foreground">{mixtureCount}</TableCell>
          <TableCell className="text-foreground">{totalBundles}</TableCell>
          <TableCell className="text-foreground">{totalJars}</TableCell>
          <TableCell className="space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(production);
              }}
              className="text-primary hover:text-primary/80"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduction(id!);
              }}
              className="text-destructive hover:text-destructive/80"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </TableCell>
        </TableRow>
      </HoverCardTrigger>

      <HoverCardContent className="w-96 bg-popover text-popover-foreground border border-border shadow-md rounded-lg p-4">
        <h4 className="font-semibold mb-2 text-foreground">Materials Used</h4>
        <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
          {materialsUsed.map((mat: any) => (
            <li key={mat.id}>
              <span className="font-medium text-foreground">{mat.name}</span> (
              {mat.type})
              {mat.bagsUsed ? ` ${mat.bagsUsed} bags` : ` ${mat.jarsUsed} jars`}{" "}
              used
              {mat.fullBoxesUsed && `, ${mat.fullBoxesUsed} full boxes`}
              {mat.leftoverBags !== undefined &&
                `, ${mat.leftoverBags} leftover bags`}
              {mat.leftoverJars !== undefined &&
                `, ${mat.leftoverJars} leftover jars`}
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProductionLogTable;
