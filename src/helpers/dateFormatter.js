export const dateFormatter = (date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  return parsedDate.toISOString().split("T")[0];
};
