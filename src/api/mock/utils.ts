export const ArrSet = (Arr: any[], id: string) => {
  let obj: any = {};
  const arrays = Arr.reduce((setArr, item) => {
    obj[item[id]] ? "" : (obj[item[id]] = true && setArr.push(item));
    return setArr;
  }, []);
  return arrays;
};
/**
 * @description: min ≤ r ≤ max  随机数
 * @param {*} Min
 * @param {*} Max
 * @return {*}
 */
export const RandomNumBoth = (Min: any, Max: any): any => {
  let Range = Max - Min;
  let Rand = Math.random();
  let num = Min + Math.round(Rand * Range); //四舍五入
  return num;
};
