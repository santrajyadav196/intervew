// Apache Kafka is a distributed event streaming platform used to handle real-time data.

// 👉 It helps multiple systems communicate by sending messages asynchronously.

// Using REST? Too slow + tightly coupled.

// Using Kafka?
// 💡 Order Service → publishes an event → others consume it

// Concept concepts:
// 1.Producer=>Sends messages to a topic
// 2.Consumer=>Reads messages from a topic
// 3. Topic=>Category which is used to organize data. You always read and write to and from a particular topic
// 4.Partition	=>Splits a topic for scalability & parallel processing
// 5.Broker=>	Kafka Server (stores data)
//6.Cluster	=>The collective group of machines(kafka server) that Kafka is running on
//7.Consumer Group=>	Group of consumers sharing the workload
// 8.Replica=>Partitions are typically replicated to one or more brokers to avoid data loss.

// 9.Offset=>A certain point in the partition log. When a consumer has consumed a message, it "commits" that offset, meaning that it tells the broker that the consumer group has consumed that message. If the consumer group is restarted, it will restart from the highest committed offset.

// 10.Heartbeat=>The mechanism by which the cluster knows which consumers are alive. Every now and then (heartbeatInterval), each consumer has to send a heartbeat request to the cluster leader. If one fails to do so for a certain period (sessionTimeout), it is considered dead and will be removed from the consumer group, triggering a rebalance.

// 11.Group Coordinator=>An instance in the consumer group that is responsible for assigning partitions to consume from to the consumers in the group

// 12.Rebalance=>When a consumer has joined or left a consumer group (such as during booting or shutdown), the group has to "rebalance", meaning that a group coordinator has to be chosen and partitions need to be assigned to the members of the consumer group.

// Kafka Flow Diagram

// Producer → Topic → Partitions → Broker → Consumer Group → Consumers

// 🧩 Why Kafka?

// 1. High throughput=>	Handles millions of messages/sec
// 2.Distributed=>	Scales horizontally
// 3.Fault tolerant=>	Data replicated across brokers
// 4.Durable=>	Data stored on disk
// 5.Real-time streaming=>	Low latency
// 6.Loose coupling=>	Systems are independent

// 🟦 Kafka Important Concept: Partition + Offset

// Topic is divided into Partitions

// Orders Topic
// ├── Partition 0: [Msg0, Msg1, Msg2]
// ├── Partition 1: [Msg0, Msg1]
// └── Partition 2: [Msg0]

// Each message has a unique Offset within the partition.
// Offset tells which messages are read.

// 🔹 Consumer Group
// Example:

// 3 Consumers & 3 Partitions
// → High performance, each reads its own partition.

// If 1 consumer only?
// → Reads partitions one-by-one = slower


// npm install kafkajs

//producer.js file

const { Kafka } = require("kafkajs");

const kafkaP = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"],
});

const producer = kafkaP.producer();

async function sendMessage() {
  await producer.connect();
  await producer.send({
    topic: "orders",
    messages: [{ value: "Order created!" }],
  });

  console.log("Message sent!");
  await producer.disconnect();
}

sendMessage();

//consumer.js
const { Kafka } = require("kafkajs");

const kafkaC = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"],
});

const consumer = kafkaC.consumer({ groupId: "notifier" });

async function receiveMessage() {
  await consumer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("Received:", message.value.toString());
    },
  });
}

receiveMessage();


