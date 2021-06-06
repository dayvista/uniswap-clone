export const removeDuplicateObjectFromArray = (arr: object[], key: string) => {
  const check = {};

  const filteredArr = [];

  arr.forEach((obj) => {
    if (!check[obj[key]]) {
      check[obj[key]] = true;

      filteredArr.push(obj);
    }
  });

  return filteredArr;
};
