import { useMemo, useState } from "react";
import Select from "../components/Select";
import { useMaterialSettings } from "../material-settings/useMaterialSettings";

const AddInboundForm = ({ onAdd }) => {
  const { data: materials = [] } = useMaterialSettings();
  console.log(materials);
  const [form, setForm] = useState({
    material: "",
    quantity: "",
    count: null,
  });

  const options = [
    { value: "", label: "Choose" },
    { value: "pure flakes", label: "Pure Flakes" },
    { value: "choco flakes", label: "Choco Flakes" },
    { value: "Jars", label: "Jars" },
  ];

  const calculatedCount = useMemo(() => {
    const match = materials.find((material) => material.name === form.material);
    const qty = parseInt(form.quantity);
    if (!match || isNaN(qty)) return 0;
    return parseInt(match.perBox) * qty;
  }, [form.material, form.quantity, materials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.material || !form.quantity) {
      return alert("Please select material and enter quantity.");
    }

    onAdd({
      ...form,
      type: mapType(form.material),
      count: calculatedCount,
    });

    setForm({
      material: "",
      quantity: "",
      count: null,
      date: form.date,
    });
  };

  const mapType = (material) => {
    if (material.includes("Flakes")) return "flakes";
    if (material.includes("Choco")) return "choco";
    if (material.includes("Jar")) return "jars";
    return "unknown";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5"
    >
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Select Material
        </label>
        <Select
          onChange={(e) => setForm({ ...form, material: e.target.value })}
          value={form.material}
          options={options}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Box Count
        </label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Enter number of boxes"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-stone-950"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
        >
          Save Entry
        </button>
      </div>
    </form>
  );
};

export default AddInboundForm;
