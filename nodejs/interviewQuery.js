const startDate = new Date();
startDate.setHours(23, 59, 59, 999);

const endDate = new Date();
endDate.setDate(endDate.getDate() - 7);
endDate.setHours(0, 0, 0, 0);

db.sales
  .find({
    createdAt: {
      $lte: startDate,
      $gte: endDate,
    },
  })
  .sort({ createdAt: -1 });

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;

db.users.find({
  $expr: {
    $and: [
      { $eq: [{ $dayOfMonth: "$dob" }, day] },
      { $eq: [{ $month: "$dob" }, month] },
    ],
  },
});

db.users.aggregate([
  {
    $match: {
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: "$dob" }, { $dayOfMonth: "$$NOW" }] },
          { $eq: [{ $month: "$dob" }, { $month: "$$NOW" }] },
        ],
      },
    },
  },
]);

db.sales.insertMany([
  { item: "apple", qty: 10, price: 1.2, region: "north" },

  { item: "banana", qty: 5, price: 0.8, region: "south" },

  { item: "apple", qty: 15, price: 1.2, region: "south" },

  { item: "banana", qty: 7, price: 0.8, region: "north" },
]);

//Group by item and calculate total quantity and revenue & sort by total revenue descending.
db.sales.aggregate([
  {
    $group: {
      _id: "$item", // Group by item
      totalQuantity: { $sum: "$qty" }, // Sum qty
      totalRevenue: { $sum: { $multiply: ["$qty", "$price"] } }, // Sum qty * price
    },
  },
  {
    $sort: { totalRevenue: -1 }, // Sort by totalRevenue descending
  },
]);

db.sales.aggregate([
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt",
          timezone: "Asia/kolkata",
          onNull: "",
        },
      },
      totalQuantity: { $sum: "$qty" },
      totalRevenue: { $sum: { $multiply: ["$qty", "$price"] } },
    },
  },
  {
    $sort: { _id: 1 },
  },
]);

// output

[
  { _id: "apple", totalQuantity: 25, totalRevenue: 30 },
  { _id: "banana", totalQuantity: 12, totalRevenue: 9.6 },
];

let A = {
  name: "Dhruv",
  dob: "11-feb-1996",
  mobile: "9811732567",
};

let B = {
  name: "Dhruv Sharma",
  dob: "11-Dec-1996",
  mobile: "9811732567",
  gender: "Male",
};

// let output = {
//     name: ["Dhruv", "Dhruv Sharma"],
//     dob: ["11-feb-1996", "11-Dec-1996"],
//     gender: [null, "Male"]
// };

let output = {};

let keys = new Set([...Object.keys(A), ...Object.keys(B)]);

console.log(keys);

for (let key of keys) {
  if (A[key] !== B[key]) {
    output[key] = [A[key] ? A[key] : null, B[key] ? B[key] : null];
  }
}

console.log(output);

const transactions = [
  { userId: 1, amount: 50, type: "credit" },
  { userId: 2, amount: 30, type: "debit" },
  { userId: 1, amount: 70, type: "debit" },
  { userId: 2, amount: 100, type: "credit" },
  { userId: 1, amount: 40, type: "credit" },
];

function transFunction(arr) {
  const map = new Map();

  for (let tr of arr) {
    if (map.has(tr.userId)) {
      map.get(tr.userId).push(tr);
    } else {
      map.set(tr.userId, [tr]);
    }
  }

  const groupData = Array.from(map.values());

  const result = [];

  for (let group of groupData) {
    let totalCredits = 0;
    let totalDebits = 0;
    for (let item of group) {
      if (item.type === "credit") {
        totalCredits += item.amount;
      } else {
        totalDebits += item.amount;
      }
    }
    let userId = group[0].userId;
    const balance = totalCredits - totalDebits;

    result.push({
      userId,
      totalCredits,
      totalDebits,
      balance,
    });
  }

  return result;
}

const transFunction = (arr) => {
  const map = new Map();

  // Group transactions by userId
  for (let tr of arr) {
    if (map.has(tr.userId)) {
      map.get(tr.userId).push(tr);
    } else {
      map.set(tr.userId, [tr]);
    }
  }

  const result = [];

  for (let [userId, transactions] of map) {
    let totalCredits = 0;
    let totalDebits = 0;
    for (let item of transactions) {
      if (item.type === "credit") {
        totalCredits += item.amount;
      } else {
        totalDebits += item.amount;
      }
    }
    const balance = totalCredits - totalDebits;

    result.push({
      userId,
      totalCredits,
      totalDebits,
      balance,
    });
  }

  return result;
};

console.log(transFunction(transactions));

const data = transactions.reduce((acc, curr) => {
  const { userId, amount, type } = curr;

  if (!acc[userId]) {
    acc[userId] = {
      userId,
      totalCredits: 0,
      totalDebits: 0,
      balance: 0,
    };
  }

  if (type === "credit") {
    acc[userId].totalCredits += amount;
  } else {
    acc[userId].totalDebits += amount;
  }
  acc[userId].balance = acc[userId].totalCredits - acc[userId].totalDebits;

  return acc;
}, {});

console.log(Object.values(data));
