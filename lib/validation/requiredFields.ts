export const validateRequiredFields = (
  data: any,
  fields: string[],
): string[] => {
  const missingFields = [];
  for (const field of fields) {
    if (!data[field]) {
      missingFields.push(field);
    }
  }

  return missingFields;
};
