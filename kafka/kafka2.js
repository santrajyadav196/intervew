// 🟦 Kafka Partitions — The Real Power of Kafka

// When a topic grows big (like millions of messages), one machine (broker) cannot handle everything.

// So Kafka splits the topic into multiple Partitions.

// Orders Topic
// ├── P0: msgs → 0,1,2,3
// ├── P1: msgs → 0,1
// └── P2: msgs → 0,1,2

// Each partition can live on different brokers, enabling:

// ✨ Horizontal scaling
// ✨ Parallel consumption
// ✨ High throughput

// 🧩 Why partitions are useful?
// 1️⃣ Parallel Processing = Faster consumers

// If you have 3 partitions and 3 consumers inside a consumer group:

// P0 → C1
// P1 → C2
// P2 → C3

// Each consumer processes different messages → 3x speed increased.

// 2️⃣ Load Balancing

// Kafka auto-distributes load among consumers.

// If one consumer dies → Kafka rebalances:

// Before:
// P0 → C1
// P1 → C2
// P2 → C3

// After C2 dies:
// P0 → C1
// P1 → C3
// P2 → C3

// No message loss 🚀
// (Because partitions store data safely)

// 3️⃣ Ordering Guarantee

// Ordering is guaranteed inside a partition, not across partitions.

// Partition=>	Order
// P0=>	1 → 2 → 3
// P1	=>1 → 2

// So if a user belongs to multiple partitions → ordering may break.

// 🟣 Partition Key (Very Important)

// Kafka decides which message goes to which partition using:

// ✔ Key (if provided)
// ❌ Random round-robin (if no key)

// Example: we want all messages of a same user in same partition

await producer.send({
  topic: "orders",
  messages: [{ key: "user-123", value: "Order created!" }],
});

// ✔ All user-123’s data → same partition
// ✔ Order preserved for that user
// ✔ Best for tracking orders or payments

// 🔥 Performance Tip

// Partitions=>	Performance	=>Cost
// More partitions=>	↑ More parallelism=>	↑ More broker memory + CPU
// Too few partitions=>	Slow consumers=>	Waste of Kafka capacity

// Rule of thumb:
// Partition count ≥ consumers you want to process in parallel

// 🧠 Consumer Group Rule

// One partition can only be read by one consumer in the same group.

// Partitions=>	Consumers=>	Result
// 3	=>3	=>Full speed
// 3	=>2=>	One consumer handles 2 partitions
// 3	=>4	=>1 consumer stays idle

// Quick Recap

// Feature	=>Benefit
// Partition	=>Splits data across brokers
// Parallel consumption=>	Faster message processing
// Partition Key=>	Maintains ordering
// Rebalance	=>Fault tolerance
