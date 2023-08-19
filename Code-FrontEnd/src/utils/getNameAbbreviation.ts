export default function getNameAbbreviation(name: string) {
  if (!name) return;
  const x = name.split(' ');
  return x.length > 1 ? x[0][0] + x[1][0] : x[0][0];
}
