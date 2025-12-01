// 🟦 Kafka in Microservices (Event-Driven Architecture)

// Instead of services calling each other directly via REST…

// Example: Food delivery app

`| Service              | Action                |
| -------------------- | --------------------- |
| Order Service        | Creates order         |
| Inventory Service    | Deducts stock         |
| Payment Service      | Processes transaction |
| Notification Service | SMS / email update    |
| Delivery Service     | Assigns driver        |
`;

// `Using REST = tightly coupled, failure cascades, slow`;

`🔁 Kafka Solution: Publish / Subscribe System`;

`Order Service → Kafka Topic → Consumers:
                                   Inventory Service
                                   Payment Service
                                   Notification Service
`;

// 📌 Order Service doesn’t need to know who uses the event
// → Loose coupling → Super scalable

`        ┌───────────────────────┐
        │      Order Service    │
        │ (Producer)            │
        └──────────▲────────────┘
                   │ Publishes
                   │ "ORDER_CREATED"
                   │ event
              ┌────┴───────┐
              │ Kafka Topic │  ---> Orders
              └────┬───────┘
          ┌────────┼─────────┐
          │        │         │
┌─────────▼───┐ ┌──▼─────────┐ ┌─────────▼────┐
│ Inventory   │ │ Payment    │ │ Notification │
│ Service     │ │ Service    │ │ Service      │
│ (Consumer)  │ │ (Consumer) │ │ (Consumer)   │
└─────────────┘ └────────────┘ └──────────────┘
`;

// ✔ Every service listens independently
// ✔ If Payment fails, others still process
// ✔ Retry, replay possible due to offsets

`🧩 Event Types (real world)`;

// `| Event             | Purpose                     |
// | ----------------- | --------------------------- |
// | `ORDER_CREATED`   | Trigger payment & inventory |
// | `ORDER_PAID`      | Notify delivery             |
// | `ORDER_CANCELLED` | Rollback inventory          |

// `

// 📍 Data Ownership Rule

// Each microservice owns its own database
// No direct DB access between services

// Example:

// Order Service DB: order status, user ID

// Payment Service DB: transaction records

// Services only communicate through Kafka

// 🟢 Exactly-Once Processing (Super Important)

// Kafka ensures:

// 1. No duplicate data processing
// 2. No message loss
// 3.Idempotency possible

// 🧠 Idempotency = Same event → processed only once
// (even if delivered multiple times)

// 🟣 Event Storage: Kafka as Replay Engine

// If a service goes down:

// ✔ Events stay in Kafka (durable disk storage)
// ✔ When back online → process missed events using Offsets

// This gives real-time + history replay

`📌 Consumer Groups in Microservices`// Each service = its own consumer group

`| Topic  | Consumer Group     | Service      |
| ------ | ------------------ | ------------ |
| orders | inventory-group    | Inventory    |
| orders | payment-group      | Payment      |
| orders | notification-group | Notification |
`;

// So each service gets the event.

`🔥 Node.js Real Example Structure`;
// Producer (Order Service)

await producer.send({
  topic: "orders",
  messages: [
    {
      key: "order-101",
      value: JSON.stringify({ orderId: 101, status: "CREATED" }),
    },
  ],
});

// Consumer (Payment Service)

await consumer.subscribe({ topic: "orders" });

await consumer.run({
  eachMessage: async ({ message }) => {
    const order = JSON.parse(message.value.toString());
    if (order.status === "CREATED") {
      console.log("Processing payment for order", order.orderId);
    }
  },
});

// ✔ Benefits Summary

`| Benefit            | Why it matters                        |
| ------------------ | ------------------------------------- |
| Loose coupling     | Services independent & resilient      |
| Replay events      | Handle downtime easily                |
| Horizontal scaling | Add consumers to read more partitions |
| Fault tolerance    | Replication + ISR                     |
| Observability      | Track events across system            |`;


`🎯 Interview Summary Answer (Use this!)`;

// Kafka enables microservices to communicate using asynchronous events.
// Each service publishes events to Kafka topics and other services consume them independently.
// Kafka ensures scalability, replay capability, fault tolerance, and loose coupling, making it ideal for real-time distributed architecture.