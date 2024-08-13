export function formatDate(
  dateString: string,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, options);
}
