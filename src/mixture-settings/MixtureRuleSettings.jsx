import { Blend } from "lucide-react";
import { useState } from "react";
import { useCreateMixtureRule } from "./useCreateMixtureRule";
import { toast } from "react-toastify";
import { useGetMixtureRule } from "./useGetMixtureRule";
import { useMaterialSettings } from "../material-settings/useMaterialSettings";
import { useEditMixtureRule } from "./useEditMixtureRule";
import { useDeleteMixtureRule } from "./useDeleteMixtureRule";
import Select from "../components/Select";
import { bagOptions } from "../constant/bagOptions";
import { mixtureruleSettingsHeadings } from "../constant/mixtureRuleSettingsHeadings";
import TableHead from "../components/TableHead";

const MixtureRuleSettings = () => {
  const [editId, setEditId] = useState(null);

  const { data: materials = [] } = useMaterialSettings();
  const { data: mixtureRule = [], isLoading } = useGetMixtureRule();
  const { mutate: editMixtureRule } = useEditMixtureRule(setEditId);
  const { mutate: deleteMixtureRule } = useDeleteMixtureRule();
  const { mutate: createMixRule } = useCreateMixtureRule();

  const flakesOptions = materials
    .filter((material) => material.rawMaterialCategory === "Flakes")
    .map((mat) => ({
      value: mat.id,
      label: `${mat.name} (${mat.perGrams}g)`,
      material: {
        id: mat.id,
        name: mat.name,
        perGrams: mat.perGrams,
        perBox: mat.perBox,
      },
    }));

  const jarOptions = materials
    .filter((material) => material.rawMaterialCategory === "Jar")
    .map((mat) => ({
      id: mat.id,
      name: mat.name,
      perGrams: mat.perGrams,
      perBox: mat.perBox,
    }));

  const [form, setForm] = useState({
    flavor: "",
    mixtureCount: 1,
    primaryFlavorName: null,
    bagsPerMixtureForPrimary: "",
    secondaryFlavorName: null,
    bagsPerMixtureForSecondary: "",
    jarMaterial: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const bagsPerMixture = [];

    if (form.primaryFlavorName && form.bagsPerMixtureForPrimary) {
      bagsPerMixture.push({
        material: form.primaryFlavorName.material,
        count: parseInt(form.bagsPerMixtureForPrimary),
      });
    }

    if (form.secondaryFlavorName && form.bagsPerMixtureForSecondary) {
      bagsPerMixture.push({
        material: form.secondaryFlavorName.material,
        count: parseInt(form.bagsPerMixtureForSecondary),
      });
    }

    const payload = {
      flavor: form.flavor.trim(),
      mixtureCount: 1,
      bagsPerMixture,
      jarMaterial: form.jarMaterial,
    };

    if (!payload.flavor || bagsPerMixture.length === 0) {
      toast.error("Missing required fields");
      return;
    }

    if (editId) {
      editMixtureRule({ id: editId, ...payload });
      setEditId(null);
    } else {
      createMixRule(payload);
    }

    setForm({
      flavor: "",
      primaryFlavorName: "",
      bagsPerMixtureForPrimary: "",
      secondaryFlavorName: "",
      bagsPerMixtureForSecondary: "",
      jarMaterial: null,
    });
  };

  const handleEdit = (mixture) => {
    const [primary, secondary] = mixture.bagsPerMixture;

    const primaryOption = flakesOptions.find(
      (opt) => opt.value === primary?.material?.id
    );

    const secondaryOption = flakesOptions.find(
      (opt) => opt.value === secondary?.material?.id
    );

    setForm({
      flavor: mixture.flavor,
      primaryFlavorName: primaryOption || null,
      bagsPerMixtureForPrimary: primary ? primary.count.toString() : "",
      secondaryFlavorName: secondaryOption || null,
      bagsPerMixtureForSecondary: secondary ? secondary.count.toString() : "",
      jarMaterial: mixture.jarMaterial || null,
    });

    setEditId(mixture.id);
  };

  const handleCancel = () => {
    setForm({
      flavor: "",
      primaryFlavorName: null,
      bagsPerMixtureForPrimary: "",
      secondaryFlavorName: null,
      bagsPerMixtureForSecondary: "",
      jarMaterial: null,
    });
    setEditId(null);
  };
  return (
    <div className="w-full mx-auto px-4 py-6 space-y-6 bg-stone-200">
      <div className="flex items-center bg-blue-600 p-2 rounded-md">
        <h2 className="text-xl font-semibold  flex items-center gap-3">
          <Blend /> Mixture Settings
        </h2>
        <p>--Default settings for mixtures</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border p-4 rounded-md space-y-4 shadow-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Flavor name"
            value={form.flavor}
            onChange={(e) => setForm({ ...form, flavor: e.target.value })}
            className="border p-2 rounded-md text-sm text-stone-950"
          />
          <input
            type="number"
            placeholder="Mixture count default (1 mixture)"
            readOnly
            className="border p-2 rounded-md text-sm text-stone-950"
          />

          <Select
            label="Choose primary flakes"
            value={form.primaryFlavorName?.value || ""}
            onChange={(e) => {
              const selected = flakesOptions.find(
                (opt) => opt.value === e.target.value
              );
              setForm({ ...form, primaryFlavorName: selected });
            }}
            options={flakesOptions}
          />

          <Select
            label="Choose how many bags of flakes (primary)"
            value={form.bagsPerMixtureForPrimary}
            onChange={(e) =>
              setForm({ ...form, bagsPerMixtureForPrimary: e.target.value })
            }
            options={bagOptions}
          />

          <Select
            label="Choose secondary flakes"
            value={form.secondaryFlavorName?.value || ""}
            onChange={(e) => {
              const selected = flakesOptions.find(
                (opt) => opt.value === e.target.value
              );
              setForm({ ...form, secondaryFlavorName: selected });
            }}
            options={flakesOptions}
          />

          <Select
            label="Choose how many bags of flakes (secondary)"
            value={form.bagsPerMixtureForSecondary}
            onChange={(e) =>
              setForm({ ...form, bagsPerMixtureForSecondary: e.target.value })
            }
            options={bagOptions}
          />

          <Select
            label="Please select jar material"
            value={form.jarMaterial?.name || ""}
            onChange={(e) => {
              const selected = jarOptions.find(
                (opt) => opt.name === e.target.value
              );
              setForm((prev) => ({ ...prev, jarMaterial: selected }));
            }}
            options={jarOptions.map((opt) => ({
              label: `${opt.name} (${opt.perGrams}g)`,
              value: opt.name,
            }))}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 text-sm"
          >
            {editId ? "Update mixture rule" : "Add mixture rule"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm bg-red-500 px-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md bg-white shadow-lg">
        {isLoading ? (
          <p className="p-4 text-sm text-gray-600">Loading mixtures...</p>
        ) : mixtureRule.length === 0 ? (
          <p className="p-4 text-sm text-gray-600">No mixture rules found.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                {mixtureruleSettingsHeadings.map((name, i) => (
                  <TableHead name={name} key={i} />
                ))}
              </tr>
            </thead>
            <tbody>
              {mixtureRule.map((mix) => (
                <tr
                  key={mix.id}
                  className="border-t hover:bg-gray-100 border-b border-stone-300"
                >
                  <td className="p-2 text-stone-900 font-medium">
                    {mix.flavor}
                  </td>

                  <td className="p-2 text-stone-900">
                    {mix.bagsPerMixture?.length > 0 ? (
                      mix.bagsPerMixture
                        .map((bags) => `${bags.material?.name} × ${bags.count}`)
                        .join(", ")
                    ) : (
                      <span className="text-gray-400 italic">No data</span>
                    )}
                  </td>

                  <td className="p-2 text-stone-900">{`${mix.mixtureCount} mixture`}</td>
                  <td className="p-2 text-stone-900">
                    {mix.jarMaterial?.perGrams}g
                  </td>

                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit?.(mix)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMixtureRule?.(mix.id)}
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

export default MixtureRuleSettings;
