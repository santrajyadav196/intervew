const myFunction = async () => {
  return new Promise((resolve, reject) => {
    let boolean = false;
    if (boolean) {
      resolve("successfully executed");
    } else {
      reject("something went wrong");
    }
  });
};

// myFunction()
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

const retry = async (fn, attempts, delay, triedAttempts = 1) => {
  try {
    const data = await fn();
    return data;
  } catch (error) {
    if (attempts <= 0) {
      throw error;
    }
    console.log(`Retrying... attempt ${triedAttempts}`);
    await new Promise((resolve) => {
      setTimeout(() => resolve(), delay);
    });

    return retry(fn, attempts - 1, delay, triedAttempts + 1);
  }
};
retry(myFunction, 4, 3000)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
