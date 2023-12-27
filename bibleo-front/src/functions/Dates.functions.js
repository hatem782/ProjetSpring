export const makeDate = (str) => {
  let date = new Date(str);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const makeDate2 = (str) => {
  let date = new Date(str);
  let year = date.getFullYear();
  let monthNumb = date.getMonth() + 1;
  let month = monthNumb < 9 ? "0" + monthNumb : monthNumb;
  let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
  return `${year}-${month}-${day}`;
};
