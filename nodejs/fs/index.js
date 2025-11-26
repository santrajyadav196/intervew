const fs = require("fs");

// Synchronous part (commented out)
try {
  const data = fs.readFileSync("example.txt", "utf-8");
  console.log(data);
} catch (e) {
  console.log(e);
}

// Asynchronous read
fs.readFile("example.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

console.log("santu");

const stream = fs.createReadStream("example.txt", { encoding: "utf8" });

stream.on("data", (chunk) => {
  console.log("Chunk:", chunk);
});

stream.on("end", () => {
  console.log("File reading completed");
});

stream.on("error", (err) => {
  console.error("Error reading file:", err);
});

console.log("This prints BEFORE file chunks");
