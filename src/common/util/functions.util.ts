export const parseStringToBoolean = (
  value: string | null | undefined,
): boolean => {
  return !!(value && value === 'true');
};
