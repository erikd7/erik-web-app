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

const splitter = perPersonBalance => {
  //Split to payers and payees
  let payers = [],
    payees = [];
  Object.entries(perPersonBalance).forEach(([person, balance]) => {
    if (balance < 0) payers.push([person, balance]);
    else payees.push([person, balance]);
  });

  //Filter
  payers.sort((a, b) => a[1] - b[1]);
  payees.sort((a, b) => b[1] - a[1]);

  //Get result
  let result = {};
  payers.forEach(function([fromPerson, fromBalance], payersIndex) {
    payees.forEach(function([toPerson, toBalance], payeesIndex) {
      const paymentAmount = Math.min(Math.abs(fromBalance), toBalance);
      if (paymentAmount) {
        if (!result[fromPerson]) result[fromPerson] = [];
        fromBalance += paymentAmount;
        toBalance -= paymentAmount;
        result[fromPerson].push({ amount: paymentAmount, to: toPerson });
        payers[payersIndex] = [fromPerson, fromBalance];
        payees[payeesIndex] = [toPerson, toBalance];
      }
    }, payees);
  }, payers);

  return result;
};

const helpers = {
  sortByKey,
  formatDollar,
  splitter
};

export default helpers;
