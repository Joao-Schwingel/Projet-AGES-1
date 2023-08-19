export function formatDateddmmyyyy(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

export function formatTimehhmm(time: Date | string): string {
  const timeObj = typeof time === 'string' ? new Date(time) : time;
  const hours = timeObj.getHours().toString().padStart(2, '0');
  const minutes = timeObj.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatDateyyyymmdd(day: Date): string {
  const dateObj = typeof day === 'string' ? new Date(day) : day;
  console.log(dateObj, 'teste');
  const dayValue = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear().toString();
  return `${year}-${month}-${dayValue}`;
}
