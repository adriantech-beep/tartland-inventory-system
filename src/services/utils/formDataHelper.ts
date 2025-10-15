export const objectToFormData = (values: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "string" || typeof value === "number") {
      formData.append(key, String(value));
    }
  });

  return formData;
};
