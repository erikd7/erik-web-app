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

const formatDollar = amount => {
  const amountNum = Number(amount) || 0;
  let options = { minimumFractionDigits: 2 };

  if (amountNum % 1 === 0) {
    options = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options
  }).format(amountNum);
};

const helpers = {
  sortByKey,
  formatDollar
};

export default helpers;
