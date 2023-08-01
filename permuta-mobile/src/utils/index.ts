export function ObjectToQueryParams(
  obj: Record<string, string | undefined | number | boolean>
): string {
  for (let key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }

  const query = new URLSearchParams(obj as Record<string, string>).toString();

  return query;
}
