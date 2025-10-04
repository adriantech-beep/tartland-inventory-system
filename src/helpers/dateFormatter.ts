export const dateFormatter = (date: string | number | Date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  return parsedDate.toISOString().split("T")[0];
};
