import { useState } from "react";
import { dateFormatter } from "../helpers/dateFormatter";

const ProductionLogTable = ({ production, handleEdit, deleteProduction }) => {
  const [openRow, setOpenRow] = useState(null);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

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
    <>
      <tr
        className="w-full border-t border-b border-stone-300 hover:bg-gray-50 cursor-pointer"
        onClick={() => toggleRow(id)}
      >
        <td className="p-2 text-stone-800">{dateFormatter(createdAt)}</td>
        <td className="p-2 text-stone-800 font-medium">{flavor}</td>
        <td className="p-2 text-stone-800">{mixtureCount}</td>
        <td className="p-2 text-stone-800">{totalBundles}</td>
        <td className="p-2 text-stone-800">{totalJars}</td>
        <td className="p-2 space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit?.(production);
            }}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteProduction?.(id);
            }}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </td>
      </tr>

      {openRow === id && (
        <tr className="bg-stone-50 text-xs w-full">
          <td colSpan={6} className="p-4">
            <h4 className="font-semibold mb-2 text-gray-700">
              Materials Used:
            </h4>
            <ul className="space-y-1 text-stone-700 list-disc list-inside">
              {materialsUsed.map((mat) => (
                <li key={mat.id}>
                  <span className="font-medium">{mat.name}</span> ({mat.type})
                  {mat.bagsUsed
                    ? ` ${mat.bagsUsed} bags`
                    : ` ${mat.jarsUsed} jars`}{" "}
                  used
                  {mat.fullBoxesUsed && `, ${mat.fullBoxesUsed} full boxes`}
                  {mat.leftoverBags !== undefined &&
                    `, ${mat.leftoverBags} leftover bags`}
                  {mat.leftoverJars !== undefined &&
                    `, ${mat.leftoverJars} leftover jars`}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
};

export default ProductionLogTable;
