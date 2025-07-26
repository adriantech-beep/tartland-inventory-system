export const bagOptions = Array.from({ length: 5 }, (_, i) => {
  const num = i + 1;
  return { label: `${num}`, value: num }; // or String(num) for consistent types
});
