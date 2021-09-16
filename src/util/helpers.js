/**
 * @description      :
 * @author           : ebdie
 * @group            :
 * @created          : 09/09/2021 - 21:08:28
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 09/09/2021
 * - Author          : ebdie
 * - Modification    :
 **/
const sortByKey = (array, sortKey, dir = 1) => {
  const ret = array.sort((a, b) => {
    if (a[sortKey] > b[sortKey]) {
      return -1 * dir;
    }
    if (a[sortKey] < b[sortKey]) {
      return 1 * dir;
    }
    return 0;
  });
  return ret;

  /*Map of object
  const hash = {};
  array.forEach((e) => {
    if (!hash[e[sortKey]]) {
      hash[e[sortKey]] = [];
    }
    hash[e[sortKey]].push(e);
  });
  return Object.values(hash).flat();*/
};

const helpers = {
  sortByKey,
};

export default helpers;
