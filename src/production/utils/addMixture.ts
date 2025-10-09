import type { MixtureRuleForm } from "@/mixture-settings/mixtureRuleSchema";

export function createMixture(formData: MixtureRuleForm) {
  const bagsPerMixture = [];

  if (formData.primaryFlavorName && formData.bagsPerMixtureForPrimary) {
    bagsPerMixture.push({
      material: formData.primaryFlavorName.material,
      count: Number(formData.bagsPerMixtureForPrimary),
    });
  }

  if (formData.secondaryFlavorName && formData.bagsPerMixtureForSecondary) {
    bagsPerMixture.push({
      material: formData.secondaryFlavorName.material,
      count: Number(formData.bagsPerMixtureForSecondary),
    });
  }

  return {
    flavor: formData.flavor.trim(),
    mixtureCount: 1,
    bagsPerMixture,
    jarMaterial: formData.jarMaterial
      ? {
          material: {
            id: formData.jarMaterial.material.id ?? "",
            name: formData.jarMaterial.material.name ?? "",
            perGrams: formData.jarMaterial.material.perGrams ?? 0,
            perBox: formData.jarMaterial.material.perBox ?? 0,
          },
        }
      : {
          material: { id: "", name: "", perGrams: 0, perBox: 0 },
        },
  };
}
