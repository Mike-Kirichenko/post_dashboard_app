export const formatDate = (date) => {
  const datePart = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const monthPart =
    date.getMonth() + 1 < 10
      ? `0${Number(date.getMonth() + 1)}`
      : Number(date.getMonth() + 1);
  const yearPart = date.getFullYear();
  const hoursPart =
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutesPart =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${datePart}/${monthPart}/${yearPart} ${hoursPart}:${minutesPart}`;
};
