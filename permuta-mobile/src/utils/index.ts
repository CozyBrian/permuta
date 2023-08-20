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

export function FormatcountDownDuration(
  startDate: Date,
  endDate: Date
): string {
  let duration = endDate.getTime() - startDate.getTime();

  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;

  const days = Math.floor(duration / millisecondsPerDay);
  duration %= millisecondsPerDay;

  const hours = Math.floor(duration / millisecondsPerHour);
  duration %= millisecondsPerHour;

  const minutes = Math.floor(duration / millisecondsPerMinute);

  let formattedDuration = "";
  if (days > 0) {
    formattedDuration += days + "d ";
  }
  if (hours > 0) {
    formattedDuration += hours + "h ";
  }
  if (minutes > 0 || (days === 0 && hours === 0)) {
    formattedDuration += minutes + "m";
  }

  return formattedDuration.trim();
}
