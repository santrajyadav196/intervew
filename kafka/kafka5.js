`🟣 What is Kafka Streams?` // Input Topic → Kafka Streams App → Output Topic // 📌 It takes input from a Kafka Topic → Processes → Writes to another Topic // ✔ Create real-time dashboards / ETL pipelines // ✔ Join multiple streams // ✔ Aggregate data (count, sum, group) // ✔ Filter events // ✔ Transform events // Kafka Streams is a stream processing library to:
`🟩 Example Use Case

E-commerce Order Events:`;

// `| Event           | Output                 |
// | --------------- | ---------------------- |
// | Order created   | Increase pending count |
// | Order paid      | Update sales total     |
// | Order cancelled | Update analytics       |
// `;

// All in real time ⚡

`🔹 Stream vs Table
Kafka Streams introduces two core abstractions:`;

`| Type        | Meaning                           | Example                    |
| ----------- | --------------------------------- | -------------------------- |
| **KStream** | Continuous flow of events         | Orders coming every second |
| **KTable**  | Latest state snapshot (changelog) | Current stock level        |
`;

// 🧠 Use KTable when you need state
// 🧠 Use KStream when you need events

// 🧠 Example Flow (Real App)

`Orders Topic (KStream)
   ↓ filter(status = PAID)
   ↓ group by productId
   ↓ count()
SalesCountTopic (KTable)`;

// Real-time sales analytics! 📊

`🔥 Powerful Kafka Streams Features`;

`| Feature     | Example                      |
| ----------- | ---------------------------- |
| Filtering   | Remove cancelled orders      |
| Mapping     | Convert format / enrich data |
| Grouping    | Group orders by user/product |
| Aggregation | Count, sum, average          |
| Windowing   | Stats per minute/hour/day    |
| Joins       | Combine orders & payments    |
`;

`🧩 Windowing (VERY Important Interview Topic)

Example: Count user logins per minute`;

`LoginStream
   ↓ window(1 minute)
   ↓ count()`;

// `Useful for:
// ✔ Fraud detection
// ✔ Rate limiting
// ✔ Live dashboards
// ✔ Metrics`;

`👉 Node.js Streaming Example (using kafkajs + custom logic)`; // JS doesn't have official Kafka Streams, but we simulate using consumer + producer design

// `🟦 Example: Count Order Events in Real-Time
// Consumer read → process → Producer write results`;

const { Kafka } = require("kafkajs");

const kafka = new Kafka({ brokers: ["localhost:9092"] });

const consumer = kafka.consumer({ groupId: "analytics-group" });
const producer = kafka.producer();

let orderCount = 0;

async function processStream() {
  await consumer.connect();
  await producer.connect();

  await consumer.subscribe({ topic: "orders" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());

      if (order.status === "PAID") {
        orderCount++;

        await producer.send({
          topic: "order-stats",
          messages: [
            { value: JSON.stringify({ totalPaidOrders: orderCount }) },
          ],
        });

        console.log("Total Paid Orders:", orderCount);
      }
    },
  });
}

processStream();

// 📌 Used concept: filter + aggregation → output topic

`🎯 When to Use Kafka Streams`;

// `| Scenario                   | Use?                |
// | -------------------------- | ------------------- |
// | Real-time transformation?  | ✔                   |
// | Live analytics dashboards? | ✔                   |
// | Data enrichment pipelines? | ✔                   |
// | ETL: Kafka → DB → Kafka?   | ✔                   |
// | Batch processing?          | ❌ Use Spark / Flink |
// `;

`💥 Interview Summary Answer (Use this!)`;

// Kafka Streams processes data directly from Kafka topics in real time.
// It supports filtering, aggregations, joins, and windowing, and stores the state in internal state stores.
// It allows building event-driven microservices that react to data instantly.
