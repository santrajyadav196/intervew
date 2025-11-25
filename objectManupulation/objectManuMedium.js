const transactions = [
  { id: 1, userId: 1, amount: 50, type: "credit" },
  { id: 2, userId: 1, amount: 30, type: "debit" },
  { id: 3, userId: 2, amount: 40, type: "credit" },
  { id: 4, userId: 2, amount: 10, type: "credit" },
  { id: 5, userId: 1, amount: 20, type: "credit" },
];

// {
//   1: {
//     credit: [
//       { id: 1, userId: 1, amount: 50, type: 'credit' },
//       { id: 5, userId: 1, amount: 20, type: 'credit' }
//     ],
//     debit: [
//       { id: 2, userId: 1, amount: 30, type: 'debit' }
//     ]
//   },
//   2: {
//     credit: [
//       { id: 3, userId: 2, amount: 40, type: 'credit' },
//       { id: 4, userId: 2, amount: 10, type: 'credit' }
//     ]
//   }
// }

const grouped = transactions.reduce((acc, curr) => {
  const { userId, type } = curr;

  // create user level if not exist
  if (!acc[userId]) {
    acc[userId] = {};
  }

  // create "type" group for that user if not exist
  if (!acc[userId][type]) {
    acc[userId][type] = [];
  }

  // push current transaction into correct group
  acc[userId][type].push(curr);

  return acc;
}, {});

console.log(grouped);

const products = [
  { productId: 1, quantity: 2, price: 50 },
  { productId: 2, quantity: 1, price: 200 },
  { productId: 1, quantity: 1, price: 50 },
  { productId: 3, quantity: 5, price: 30 },
  { productId: 3, quantity: 1, price: 30 },
];

// [
//   { productId: 3, totalRevenue: 180 },
//   { productId: 2, totalRevenue: 200 }
// ]

const productsObject = products.reduce((acc, curr) => {
  const { productId, quantity, price } = curr;

  // create user level if not exist
  if (!acc[productId]) {
    acc[productId] = {
      productId,
      totalRevenue: 0,
    };
  }

  // push current transaction into correct group
  acc[productId].totalRevenue += quantity * price;

  return acc;
}, {});

const sortProducts = Object.values(productsObject)
  .sort((a, b) => b.totalRevenue - a.totalRevenue) // sort descending
  .slice(0, 2); // take top 2

console.log(sortProducts);

const ranges = [
  { start: 1, end: 5 },
  { start: 3, end: 7 },
  { start: 8, end: 10 },
  { start: 9, end: 12 },
];

const mergeRanges = (arr) => {
  // 1)  sort by start
  const sorted = [...arr].sort((a, b) => a.start - b.start);

  const result = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = result[result.length - 1];

    // check overlap: if current.start <= last.end  → merge
    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      result.push(current);
    }
  }

  return result;
};

console.log(mergeRanges(ranges));
