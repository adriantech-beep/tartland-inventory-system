import { useState } from "react";
import Select from "../components/Select";
import { useMaterialSettings } from "../material-settings/useMaterialSettings";
import { PackageOpen } from "lucide-react";
import { dateFormatter } from "../helpers/dateFormatter";
import { productHeadings } from "../constant/productHeadings";
import TableHead from "../components/TableHead";
import { useAddInboundLog } from "./useAddInboundLog";
import { useGetInboundLogs } from "./useGetInboundLog";
import { useDeleteInboundLog } from "./useDeleteInboundLog";

const AddProduct = () => {
  const { data: materials = [] } = useMaterialSettings();
  const { data: inboundlogs = [], isLoading } = useGetInboundLogs();
  console.log(inboundlogs);
  const [editId, setEditId] = useState(null);
  const { mutate: deleteInboundLog } = useDeleteInboundLog();
  const { mutate: createInboundLog } = useAddInboundLog();
  const productOptions = materials.map((material) => ({
    value: material.id,
    label: `${material.name} x ${material.perBox} (${material.perGrams}g)each`,
    material: {
      id: material.id,
      name: material.name,
      perGrams: material.perGrams,
      perBox: material.perBox,
    },
  }));

  const [form, setForm] = useState({
    rawMaterialDetails: null,
    boxCount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedMaterial = form.rawMaterialDetails?.material;
    if (!selectedMaterial) return;

    const units = selectedMaterial.perBox * form.boxCount;

    const payload = {
      rawMaterial: selectedMaterial,
      boxCount: parseInt(form.boxCount),
      totalUnits: parseInt(units),
      inboundDate: new Date(),
    };

    createInboundLog(payload);

    setForm({
      rawMaterialDetails: null,
      boxCount: "",
    });
  };

  const handleEdit = (inventoryItem) => {
    const matchedOption = productOptions.find(
      (option) => option.material.id === inventoryItem.rawMaterial.id
    );

    setForm({
      rawMaterialDetails: matchedOption || null,
      boxCount: inventoryItem.boxCount,
    });

    setEditId(inventoryItem.id);
  };

  const handleCancel = () => {
    setForm({
      rawMaterialDetails: null,
      boxCount: "",
    });
    setEditId(null);
  };
  return (
    <section className="w-full mx-auto px-4 py-6 space-y-6 bg-white shadow-lg">
      <div className="flex items-center bg-blue-500 p-2 rounded-md">
        <h2 className="text-xl font-semibold  flex items-center gap-3">
          <PackageOpen /> Product Inbound Detail Information
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Select
            label="Please select raw material"
            value={form.rawMaterialDetails?.value || ""}
            onChange={(e) => {
              const selected = productOptions.find(
                (opt) => opt.value === e.target.value
              );
              setForm({ ...form, rawMaterialDetails: selected });
            }}
            options={productOptions}
          />

          <input
            className=" border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-stone-950"
            placeholder="Quantity"
            type="number"
            value={form.boxCount}
            onChange={(e) => setForm({ ...form, boxCount: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 text-sm mt-2"
        >
          {editId ? "Edit Raw material" : "Add Raw Material"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-stone-50 text-sm ml-2 bg-red-500 p-1 rounded-1xl"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md bg-white shadow-lg">
        {isLoading ? (
          <p className="p-4 text-sm text-gray-600">Loading materials...</p>
        ) : inboundlogs.length === 0 ? (
          <p className="p-4 text-sm text-gray-600">
            There are no raw materials found.
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                {productHeadings.map((name, i) => (
                  <TableHead name={name} key={i} />
                ))}
              </tr>
            </thead>
            <tbody className="border-2 border-light-blue-500">
              {inboundlogs?.map((inbound) => (
                <tr
                  key={inbound.id}
                  className="border-t hover:bg-gray-100 border-b border-stone-300"
                >
                  <td className="p-2 text-stone-950  ">
                    {dateFormatter(inbound.createdAt)}
                  </td>
                  <td className="p-2 text-stone-950 font-medium ">
                    {inbound.rawMaterial.name}
                  </td>
                  <td className="p-2 text-stone-950">
                    {inbound.rawMaterial?.perBox}
                    <span>pcs</span>
                  </td>
                  <td className="p-2 text-stone-950">
                    {inbound.rawMaterial?.perGrams}
                    <span>g</span>
                  </td>
                  <td className="p-2 text-stone-950">{inbound.boxCount}</td>
                  <td className="p-2 text-stone-950">{inbound.totalUnits}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(inbound)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteInboundLog(inbound.id)}
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
    </section>
  );
};

export default AddProduct;
