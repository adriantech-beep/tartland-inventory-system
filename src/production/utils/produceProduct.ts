export type MaterialUsed =
  | {
      id: string;
      name: string;
      type: string;
      perGrams: number;
      perBox: number;
      bagsUsed: number;
      gramsUsed: number;
      fullBoxesUsed: number;
      leftoverBags: number;
    }
  | {
      id: string;
      name: string;
      type: string;
      perGrams: number;
      perBox: number;
      bagsUsed: number;
      jarsUsed: number;
      fullBoxesUsed: number;
      leftoverBoxFraction: number;
      leftoverJars: number;
    };

export type Material = {
  id: string;
  name: string;
  perGrams: number;
  perBox: number;
};

export type MixtureMaterial = {
  material: Material;
  count: number;
};

export type JarMaterial = Material & {
  perGrams: number;
  perBox: number;
};

export type MixtureRule = {
  id: string;
  flavor: string;
  mixtureCount: number;
  material: MixtureMaterial[];
  jarMaterial: JarMaterial;
};

export type ProducePayload = {
  flavor: string;
  mixtureCount: number;
  totalJars: number;
  totalBundles: number;
  materialsUsed: MaterialUsed[];
};
export interface ProductionLog extends ProducePayload {
  selectedMixture:
    | {
        id: string;
        flavor: string;
        mixtureCount: number;
        material: any;
        jarMaterial: any;
      }
    | {
        id?: string | undefined;
        flavor?: string | undefined;
        mixtureCount?: number | undefined;
        material?: any;
        jarMaterial?: any;
      }
    | undefined;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
export function createProductionPayload(
  mixtureRule: MixtureRule,
  userMixtureCount: number
): ProducePayload {
  const jarsPerMixture = 11.31;
  const totalJars = parseFloat((userMixtureCount * jarsPerMixture).toFixed(1));

  const jarsPerBundle = 18;
  const totalBundles = Math.round(totalJars / jarsPerBundle);

  const materialsUsed: MaterialUsed[] = mixtureRule.material.map((mat) => {
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
  const totalJarsUsed = parseFloat((totalJars / jarMaterial.perBox).toFixed(2));
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

  return {
    flavor: mixtureRule.flavor,
    mixtureCount: userMixtureCount,
    totalJars,
    totalBundles,
    materialsUsed,
  };
}
