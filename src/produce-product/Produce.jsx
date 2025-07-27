import { useState } from "react";
import Select from "../components/Select";
import { useGetSummaryTotal } from "../stocks-inventory/useGetSummaryTotal";
import { useGetMixtureRule } from "../mixture-settings/useGetMixtureRule";
import { useCreateProduction } from "./useCreateProduction";
import { useGetProductionLog } from "./useGetProductionLog";
import { productionLogsHeadings } from "../constant/productionLogsHeadings";
import TableHead from "../components/TableHead";
import { dateFormatter } from "../helpers/dateFormatter";
import { useDeleteProductionLog } from "./useDeleteProductionLog";
import { useEditProductionLog } from "./useEditProduction";

const Produce = () => {
  const [editId, setEditId] = useState(null);
  const { data: summary = [] } = useGetSummaryTotal();
  const { data: mixtures = [] } = useGetMixtureRule();
  const { mutate: createProduction } = useCreateProduction();
  const { data: productionLog = [], isLoading } = useGetProductionLog();
  const { mutate: deleteProduction } = useDeleteProductionLog();
  const { mutate: editProduction } = useEditProductionLog(setEditId);

  const sortedSummary = [...summary].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  console.log(productionLog);

  const mixtureOptions = mixtures.map((mix) => ({
    value: mix.id,
    label: mix.flavor,
    mixtureToUse: {
      id: mix.id,
      flavor: mix.flavor,
      mixtureCount: mix.mixtureCount,
      material: mix.bagsPerMixture,
      jarMaterial: mix.jarMaterial,
    },
  }));

  const [form, setForm] = useState({
    selectedMixture: null,
    mixtureCount: "",
  });

  const handleProduce = (e) => {
    e.preventDefault();
    if (!form.selectedMixture || !form.mixtureCount) return;

    const mixtureRule = form.selectedMixture.mixtureToUse;
    const userMixtureCount = parseInt(form.mixtureCount);

    const jarsPerMixture = 11.31; // Constant for now
    const totalJars = parseFloat(
      (userMixtureCount * jarsPerMixture).toFixed(1)
    ); // one decimal for jars

    const jarsPerBundle = 18;
    const totalBundles = Math.round(totalJars / jarsPerBundle);

    const materialsUsed = mixtureRule.material.map((mat) => {
      const bagsUsed = mat.count * userMixtureCount;
      const gramsUsed = bagsUsed * mat.material.perGrams;

      const fullBoxesUsed = Math.floor(bagsUsed / mat.material.perBox);
      const leftoverBags = bagsUsed % mat.material.perBox;

      return {
        id: mat.material.id,
        name: mat.material.name,
        type: mat.material.name.toLowerCase().includes("choco")
          ? "Choco"
          : "Flakes",
        perGrams: mat.material.perGrams,
        perBox: mat.material.perBox,
        bagsUsed,
        gramsUsed,
        fullBoxesUsed,
        leftoverBags,
      };
    });

    const jarMaterial = mixtureRule.jarMaterial;
    const totalJarsUsed = parseFloat(
      (totalJars / jarMaterial.perBox).toFixed(2)
    );
    // ✅ No division! Just use `totalJars` directly
    const jarsUsed = parseFloat(totalJars.toFixed(1)); // this will be subtracted from totalUnits (which is in jars)
    const fullBoxesUsed = Math.floor(jarsUsed / jarMaterial.perBox);
    const leftoverJars = +(jarsUsed % jarMaterial.perBox).toFixed(1);
    const leftoverBoxFraction = +(leftoverJars / jarMaterial.perBox).toFixed(2);

    materialsUsed.push({
      id: jarMaterial.id,
      name: jarMaterial.name,
      type: "jar",
      perGrams: jarMaterial.perGrams,
      perBox: jarMaterial.perBox,
      bagsUsed: totalJarsUsed,
      jarsUsed,
      fullBoxesUsed,
      leftoverBoxFraction,
      leftoverJars,
    });

    // 5. Final payload
    const payload = {
      flavor: mixtureRule.flavor,
      mixtureCount: userMixtureCount,
      totalJars,
      totalBundles,
      materialsUsed,
    };

    if (editId) {
      editProduction({ id: editId, ...payload });
      setEditId(null);
    } else {
      createProduction(payload);
    }

    setForm({ selectedMixture: null, mixtureCount: "" });
  };

  const handleEdit = (mixture) => {
    const selected = mixtureOptions.find(
      (option) => option.value === mixture.id || option.label === mixture.flavor
    );

    setForm({
      selectedMixture: selected || null,
      mixtureCount: mixture.mixtureCount,
    });

    setEditId(mixture.id);
  };

  const handleCancel = () => {
    setForm({
      selectedMixture: null,
      mixtureCount: "",
    });
    setEditId(null);
  };

  return (
    <div className="w-full mx-auto px-4 py-6 space-y-6 bg-stone-200">
      <form className="w-full mx-auto bg-white p-6 rounded-md shadow-md space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Produce Product</h2>

        <div className="flex gap-4">
          <Select
            label="Select Flavor to Produce"
            value={form.selectedMixture?.value || ""}
            onChange={(e) => {
              const selected = mixtureOptions.find(
                (opt) => opt.value === e.target.value
              );
              setForm({ ...form, selectedMixture: selected });
            }}
            options={mixtureOptions}
          />
          <input
            type="number"
            placeholder="Number of Mixtures"
            value={form.mixtureCount}
            onChange={(e) =>
              setForm({ ...form, mixtureCount: parseInt(e.target.value) })
            }
            className="m border px-4 py-2 rounded-md text-sm text-stone-800"
          />
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 border border-stone-200">
          <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-1">
            <span>📊</span> <span>Current Stock Summary</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
            {sortedSummary.map((stock) => (
              <div
                key={stock._id}
                className="flex justify-between items-center bg-stone-50 p-2 rounded-md border border-stone-200"
              >
                <span className="truncate">{stock.name}</span>
                <span className="font-semibold text-stone-800">
                  {stock.totalUnits.toFixed(2)} units
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleProduce}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          {editId ? "Edit details" : "Produce now"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-500 text-sm ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="overflow-x-auto border rounded-md bg-white shadow-lg">
        {isLoading ? (
          <p>Loading production logs...</p>
        ) : productionLog.length === 0 ? (
          <p className="p-4 text-sm text-gray-600">No production logs found.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                {productionLogsHeadings.map((name, i) => (
                  <TableHead name={name} key={i} />
                ))}
              </tr>
            </thead>
            <tbody>
              {productionLog.map((production) => (
                <tr
                  key={production.id}
                  className="border-t hover:bg-gray-100 border-b border-stone-300"
                >
                  <td className="p-2 text-stone-900 ">
                    {dateFormatter(production.createdAt)}
                  </td>
                  <td className="p-2 text-stone-900 font-medium">
                    {production.flavor}
                  </td>
                  <td className="p-2 text-stone-900 ">
                    {production.mixtureCount}
                  </td>
                  <td className="p-2 text-stone-900 ">
                    {production.totalBundles}
                  </td>
                  <td className="p-2 text-stone-900 ">
                    {production.totalJars}
                  </td>

                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit?.(production)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduction?.(production.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Produce;
