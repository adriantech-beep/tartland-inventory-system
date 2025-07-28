import { useState } from "react";
import Select from "../components/Select";
import { useGetSummaryTotal } from "../stocks-inventory/useGetSummaryTotal";
import { useGetMixtureRule } from "../mixture-settings/useGetMixtureRule";
import { useCreateProduction } from "./useCreateProduction";
import { useGetProductionLog } from "./useGetProductionLog";
import TableHead from "../components/TableHead";
import { useDeleteProductionLog } from "./useDeleteProductionLog";
import { useEditProductionLog } from "./useEditProduction";
import ProductionLogTable from "./ProductionLogtable";
import { productionLogsHeadings } from "../constant/productionLogsHeadings";
import StockSummary from "./StockSummarry";

const ProduceProduct = () => {
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

    const jarsUsed = parseFloat(totalJars.toFixed(1));
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

        <StockSummary sorted={sortedSummary} />

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
      <div className="w-full overflow-x-auto border rounded-md bg-white shadow-lg">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              {productionLogsHeadings.map((name, i) => (
                <TableHead name={name} key={i} />
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  Loading production logs...
                </td>
              </tr>
            ) : productionLog.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No data found
                </td>
              </tr>
            ) : (
              productionLog.map((production) => (
                <ProductionLogTable
                  key={production._id}
                  production={production}
                  handleEdit={handleEdit}
                  deleteProduction={deleteProduction}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProduceProduct;
