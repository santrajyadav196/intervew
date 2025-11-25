const users = [
  { id: 1, name: "John", city: "Delhi" },
  { id: 2, name: "Mike", city: "Mumbai" },
  { id: 3, name: "Smith", city: "Delhi" },
  { id: 4, name: "Mary", city: "Bangalore" },
];

// {
//   Delhi: [
//     { id: 1, name: "John", city: "Delhi" },
//     { id: 3, name: "Smith", city: "Delhi" }
//   ],
//   Mumbai: [ { id: 2, name: "Mike", city: "Mumbai" } ],
//   Bangalore: [ { id: 4, name: "Mary", city: "Bangalore" } ]
// }

function userFunction(arr) {
  const map = new Map();

  for (let user of arr) {
    if (map.has(user.city)) {
      map.get(user.city).push(user);
    } else {
      map.set(user.city, [user]);
    }
  }

  const groupData = Object.fromEntries(map);

  return groupData;
}

function userFunction(arr) {
  const data = arr.reduce((acc, curr) => {
    const { city } = curr;
    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(curr);

    return acc;
  }, {});

  return data;
}

console.log(userFunction(users));

const data = users.reduce((acc, curr) => {
  const { city } = curr;
  if (!acc[city]) {
    acc[city] = [];
  }

  acc[city].push(curr);

  return acc;
}, {});

console.log(data);

const data2 = ["apple", "banana", "cherry", "avocado", "blueberry"];

// {
//   a: ["apple", "avocado"],
//   b: ["banana", "blueberry"],
//   c: ["cherry"]
// }

const result = data2.reduce((acc, curr) => {
  if (!acc[curr[0]]) {
    acc[curr[0]] = [];
  }

  acc[curr[0]].push(curr);

  return acc;
}, {});

console.log(result);

const revenue = [
  { productId: 100, quantity: 2, price: 50 },
  { productId: 100, quantity: 1, price: 50 },
  { productId: 101, quantity: 3, price: 20 },
];

// [
//   { productId: 100, totalAmount: 150 },
//   { productId: 101, totalAmount: 60 }
// ]

const dataObject = revenue.reduce((acc, curr) => {
  const { productId, quantity, price } = curr;

  if (!acc[productId]) {
    acc[productId] = {
      productId,
      totalAmount: 0,
    };
  }

  const total = quantity * price;
  acc[productId].totalAmount += total;

  return acc;
}, {});

const result2 = Object.values(dataObject);

console.log(result2);

const orders = [
  { orderId: 1, userId: 10 },
  { orderId: 2, userId: 11 },
  { orderId: 3, userId: 10 },
  { orderId: 4, userId: 12 },
  { orderId: 5, userId: 10 },
];

// Expected:
// [
//   { userId: 10, totalOrders: 3 },
//   { userId: 11, totalOrders: 1 },
//   { userId: 12, totalOrders: 1 },
// ]

const orderObject = orders.reduce((acc, curr) => {
  const { userId, orderId } = curr;

  if (!acc[userId]) {
    acc[userId] = {
      userId,
      totalOrders: 0,
    };
  }

  acc[userId].totalOrders++;

  return acc;
}, {});

console.log(Object.values(orderObject));

const books = [
  { id: 1, title: "Book A", author: "John Doe" },
  { id: 2, title: "Book B", author: "Jane Smith" },
  { id: 3, title: "Book C", author: "John Doe" },
];

// Expected:
// {
//   "John Doe": [
//     { id: 1, title: "Book A", author: "John Doe" },
//     { id: 3, title: "Book C", author: "John Doe" }
//   ],
//   "Jane Smith": [
//     { id: 2, title: "Book B", author: "Jane Smith" }
//   ]
// }

const booksObject = books.reduce((acc, curr) => {
  const { id, title, author } = curr;

  if (!acc[author]) {
    acc[author] = [];
  }

  acc[author].push(curr);
  return acc;
}, {});

console.log(booksObject);

const movieRatings = [
  { movieId: 1, rating: 4 },
  { movieId: 2, rating: 3 },
  { movieId: 1, rating: 5 },
  { movieId: 2, rating: 2 },
];

// Expected:
// [
//   { movieId: 1, totalRating: 9 },
//   { movieId: 2, totalRating: 5 }
// ]

const movieRatingsObject = movieRatings.reduce((acc, curr) => {
  const { movieId, rating } = curr;

  if (!acc[movieId]) {
    acc[movieId] = {
      movieId,
      totalRating: 0,
    };
  }

  acc[movieId].totalRating += rating;
  return acc;
}, {});

console.log(Object.values(movieRatingsObject));

const inventory = [
  { item: "Apple", category: "Fruit", qty: 10 },
  { item: "Banana", category: "Fruit", qty: 5 },
  { item: "Tomato", category: "Vegetable", qty: 8 },
  { item: "Potato", category: "Vegetable", qty: 12 },
];

// Expected:
// {
//   Fruit:     { totalQty: 15 },
//   Vegetable: { totalQty: 20 }
// }

const inventorysObject = inventory.reduce((acc, curr) => {
  const { item, category, qty } = curr;

  if (!acc[category]) {
    acc[category] = {
      totalQty: 0,
    };
  }

  acc[category].totalQty += qty;

  return acc;
}, {});

console.log(inventorysObject);
