import { useState } from "react";

const defaultForm = {
  name: "",
  type: "bundle",
  flavor: "Pure",
  rawMaterials: {
    flakes: "",
    choco: "",
    jars: "",
    bundles: "",
  },
};

const ProductForm = ({ onSave }) => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("raw_")) {
      setForm((prev) => ({
        ...prev,
        rawMaterials: {
          ...prev.rawMaterials,
          [name.split("_")[1]]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm(defaultForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-[#1a1a2e] p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-cocoa dark:text-white">
        Add Product Material Info
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="input"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="input"
        >
          <option value="bundle">Bundle</option>
          <option value="jar">Jar</option>
        </select>

        <select
          name="flavor"
          value={form.flavor}
          onChange={handleChange}
          className="input"
        >
          <option value="Pure">Pure</option>
          <option value="Choco">Choco</option>
        </select>

        <input
          type="number"
          name="raw_flakes"
          placeholder="Flakes (grams)"
          value={form.rawMaterials.flakes}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="raw_choco"
          placeholder="Choco (grams)"
          value={form.rawMaterials.choco}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="raw_jars"
          placeholder="Jars Used"
          value={form.rawMaterials.jars}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="raw_bundles"
          placeholder="Bundles Output"
          value={form.rawMaterials.bundles}
          onChange={handleChange}
          className="input"
        />
      </div>

      <button
        type="submit"
        className="bg-apricot text-white px-4 py-2 rounded shadow hover:bg-orange-400"
      >
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
