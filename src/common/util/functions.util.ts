export const parseStringToBoolean = (
  value: string | null | undefined,
): boolean => {
  return !!(value && value === 'true');
};

export const parseStringToNumber = (
  value: string | null | undefined,
  defaultValue: number,
): number => {
  if (value === null || value === undefined || value === '') {
    return defaultValue;
  }

  const parsed = parseInt(value);
  return isNaN(parsed) ? defaultValue : parsed;
};
