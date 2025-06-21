export function getCurrentFormattedDate(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();

  return `${month}-${day}-${year}`; // Format: MM-DD-YYYY
}
