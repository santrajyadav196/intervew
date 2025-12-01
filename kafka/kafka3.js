// 🟥 Kafka Replication — Zero Data Loss Guarantee

// Every partition has:

// 1 Leader
// Multiple Followers (replicas)

// Example: Replication Factor = 3
// Partition P0
//  ├─ Leader (Broker 1)
//  ├─ Follower (Broker 2)
//  └─ Follower (Broker 3)

// Leader handles:
// ✔ Reads
// ✔ Writes

// Followers:
// ✔ Copy data from leader
// ✔ Step in when leader fails

// 🔥 Why Replication?
// To avoid:

// ❌ Data loss
// ❌ Downtime when a broker crashes
// ❌ Single point of failure

// Kafka automatically switches leader → Failover
// Clients continue working smoothly ✔

// 🟡 ISR (In-Sync Replicas)

// Only replicas that successfully sync data become part of ISR.
// ISR = Leader + Followers fully up-to-date

// If one follower falls behind → removed from ISR temporarily.
// Kafka guarantees durability using ISR.

// ⚙️ Producer Acknowledgement (acks setting)

// Producer decides how safe writing should be:

// `| Setting    | Data Safety | Performance | Meaning                   |
// | ---------- | ----------- | ----------- | ------------------------- |
// | `acks=0`   | ❌ high risk | ⚡ fastest   | Don’t wait for any reply  |
// | `acks=1`   | ⚠ medium    | ⚡ fast      | Leader confirms only      |
// | `acks=all` | ✔ safest    | 🐢 slower   | Wait for all ISR replicas |`

// Recommended in finance, orders, payments:
// acks: "all"

// 🧩 Data Loss Scenarios (Interview Real Questions)
// Condition	=>Risk
// Leader dies before followers sync=>	Possible data loss (if not acks=all)
// ISR shrinks to leader only	=>Vulnerable
// Replication factor = 1=>	NO fault tolerance

// Best Practice Configuration

// Setting	=>Value	=>Why
// Replication Factor	=>3=>	Safe cluster
// Min ISR	=>2	=>Write must reach 2 replicas
// Acks	=>all	=>Prevent loss

// ⚠ What happens when Leader fails?

// Kafka automatically:

// 1️⃣ Elects new leader from ISR
// 2️⃣ All consumers & producers switch automatically
// 3️⃣ System continues — no downtime

// Before:
// Leader → Broker 1

// After failure:
// Leader → Broker 2

// 🛑 No data loss
// 🛑 No message duplication

// 🧠 Interview Summary

// Kafka replication protects against broker failures
// Leader handles reads/writes
// ISR followers stay in sync
// Failover happens automatically
// Use acks=all, Replication=3, MinISR=2 for safety
