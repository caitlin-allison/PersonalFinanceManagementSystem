/**
 *
 * @param str - the string contain the delimiter to be split up
 * @param dlt - delimiter that splits the string up
 * @example breakStringAndUppercase("bill_id", "_") => "Bill Id"
 * Very useful to build headers etc from keys directly without fuss
 */
export function breakStringAndUppercase(str: string, dlt: string = "_") {
  const strArr = str.toLowerCase().split(dlt);
  return strArr
    .map((word) =>
      word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ""
    )
    .join(" ");
}