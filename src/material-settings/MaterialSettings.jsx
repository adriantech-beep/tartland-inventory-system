import { useState } from "react";
import { useMaterialSettings } from "./useMaterialSettings";
import { useDeleteMaterialSetting } from "./useDeleteMaterialSettings";
import { SlidersHorizontal } from "lucide-react";
import { useEditMaterialSettings } from "./useEditMaterialSettings";
import Select from "../components/Select";
import { rawMaterial } from "../constant/rawMaterial";
import { toast } from "react-toastify";
import { materialSettingsHeadings } from "../constant/materialSettingsHeadings";
import TableHead from "../components/TableHead";
import { useCreateMaterialSettings } from "./useCreateMaterialSettings";

const MaterialSettings = () => {
  const [form, setForm] = useState({
    name: "",
    perBox: "",
    perGrams: "",
    rawMaterialCategory: "",
    unit: "box",
  });
  const [editId, setEditId] = useState(null);

  const { data: materials = [], isLoading } = useMaterialSettings();
  const { mutate: deleteMaterial } = useDeleteMaterialSetting();
  const { mutate: createMaterial } = useCreateMaterialSettings();
  const { mutate: editMaterial } = useEditMaterialSettings(setEditId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      perBox: parseInt(form.perBox),
      perGrams: parseInt(form.perGrams),
      unit: form.unit,
      rawMaterialCategory: form.rawMaterialCategory,
    };

    if (!payload.name || !payload.perBox || !payload.rawMaterialCategory) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (editId) {
      editMaterial({ id: editId, ...payload });
    } else {
      createMaterial(payload);
    }
    setForm({
      name: "",
      perBox: "",
      perGrams: "",
      rawMaterialCategory: "",
      unit: "box",
    });
  };

  const handleEdit = (mat) => {
    setForm({
      name: mat.name,
      perBox: mat.perBox,
      perGrams: mat.perGrams,
      rawMaterialCategory: mat.rawMaterialCategory,
      unit: mat.unit,
    });
    setEditId(mat.id);
  };

  const handleCancel = () => {
    setForm({
      name: "",
      perBox: "",
      perGrams: "",
      rawMaterialCategory: "",
      unit: "box",
    });
    setEditId(null);
  };

  return (
    <section className="w-full mx-auto px-4 py-6 space-y-6 bg-stone-200">
      <div className="flex items-center bg-blue-600 p-2 rounded-md">
        <h2 className="text-xl font-semibold  flex items-center gap-3">
          <SlidersHorizontal /> Material Settings
        </h2>
        <p>--Default settings for items per box</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border p-4 rounded-md space-y-4 shadow-xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Material name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded-md text-sm text-stone-950"
          />
          <input
            type="number"
            placeholder="Items per box"
            value={form.perBox}
            onChange={(e) => setForm({ ...form, perBox: e.target.value })}
            className="border p-2 rounded-md text-sm text-stone-950"
          />
          <input
            type="number"
            placeholder="Grams per bag/jar"
            value={form.perGrams}
            onChange={(e) => setForm({ ...form, perGrams: e.target.value })}
            className="border p-2 rounded-md text-sm text-stone-950"
          />
          <input
            type="text"
            placeholder="Unit (e.g. bags, jars)"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            className="border p-2 rounded-md text-sm text-stone-950"
          />

          <Select
            label="Select category"
            onChange={(e) =>
              setForm({ ...form, rawMaterialCategory: e.target.value })
            }
            value={form.rawMaterialCategory}
            options={rawMaterial}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
          >
            {editId ? "Update" : "Add Material"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-500 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md bg-white shadow-lg">
        {isLoading ? (
          <p className="p-4 text-sm text-gray-600">Loading materials...</p>
        ) : materials.length === 0 ? (
          <p className="p-4 text-sm text-gray-600">
            No material settings found.
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                {materialSettingsHeadings.map((name, i) => (
                  <TableHead name={name} key={i} />
                ))}
              </tr>
            </thead>
            <tbody className="border-2 border-light-blue-500">
              {materials.map((mat) => (
                <tr
                  key={mat.id}
                  className="border-t hover:bg-gray-100 border-b border-stone-300"
                >
                  <td className="p-2 text-stone-950 font-medium ">
                    {mat.name}
                  </td>
                  <td className="p-2 text-stone-950">{mat.perBox}</td>
                  <td className="p-2 text-stone-950">
                    {mat.perGrams}
                    <span>g</span>
                  </td>
                  <td className="p-2 text-stone-950">
                    {mat.rawMaterialCategory}
                  </td>
                  <td className="p-2 text-stone-950">{mat.unit}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(mat)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMaterial(mat.id)}
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

export default MaterialSettings;
