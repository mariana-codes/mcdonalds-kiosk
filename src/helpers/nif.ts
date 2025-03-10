export const removeNifPunctuation = (nif: string) => {
  return nif.replace(/\D/g, "");
};

const calculateCheckDigit = (nif: string): number => {
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;

  for (let i = 0; i < 8; i++) {
    sum += Number(nif[i]) * weights[i];
  }

  const checkDigit = 11 - (sum % 11);
  return checkDigit >= 10 ? 0 : checkDigit;
};

export const isValidNif = (nif: string): boolean => {
  nif = removeNifPunctuation(nif);

  if (nif.length !== 9) return false;

  const validFirstDigits = new Set([1, 2, 3, 5, 6, 7, 8, 9]);
  const firstDigit = Number(nif[0]);
  const lastDigit = Number(nif[8]);

  if (!validFirstDigits.has(firstDigit)) return false;

  return calculateCheckDigit(nif) === lastDigit;
};
