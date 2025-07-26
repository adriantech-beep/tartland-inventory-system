export function calculateMixtureTotals(mixtureRule, mixtureCount) {
  const { bagsPerMixture, jarSizeGrams } = mixtureRule;

  const flakesBags = bagsPerMixture.flakes * mixtureCount;
  const chocoBags = (bagsPerMixture.choco || 0) * mixtureCount;
  const jarsUsed = bagsPerMixture.jars * mixtureCount;

  const BAG_WEIGHT_GRAMS = 500;
  const JARS_PER_BUNDLE = 85;

  const totalFlakesWeight = flakesBags * BAG_WEIGHT_GRAMS;
  const totalChocoWeight = chocoBags * BAG_WEIGHT_GRAMS;
  const jarBundles = jarsUsed / JARS_PER_BUNDLE;
  const totalJarOutputWeight = jarSizeGrams ? jarsUsed * jarSizeGrams : null; // only calculate if defined

  return {
    flavor: mixtureRule.flavor,
    mixtureCount,
    flakesBags,
    chocoBags,
    totalFlakesWeight,
    totalChocoWeight,
    jarsUsed: parseFloat(jarsUsed.toFixed(2)),
    jarBundles: parseFloat(jarBundles.toFixed(2)),
    totalJarOutputWeight: totalJarOutputWeight
      ? parseFloat(totalJarOutputWeight.toFixed(2))
      : undefined,
  };
}
