#types of indexes in mongodb:
1. Single Field Index:This is the most basic and common index. It helps queries filter or sort using a single field.
const userSchema = new mongoose.Schema({
  name: { type: String, index: true }, // Creates index on "name"
  email: String
});

userSchema.index({ name: 1 }); // ascending

2. Compound Index: Used when you want to index more than one field together — useful for sorting or filtering combinations.
const orderSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  createdAt: Date,
  status: String
});

orderSchema.index({ userId: 1, createdAt: -1 }); // compound index

3. Multikey Index (for arrays): MongoDB automatically creates a multikey index if you index a field that is an array.
const blogSchema = new mongoose.Schema({
  title: String,
  tags: [{ type: String }]
});

blogSchema.index({ tags: 1 }); // multikey index

4. Text Index (for full-text search)
Allows you to perform $text searches on string fields.

const articleSchema = new mongoose.Schema({
  title: String,
  body: String
});

articleSchema.index({ title: "text", body: "text" });

 5. Hashed Index
Good for sharding or evenly distributing documents.

const userSchema = new mongoose.Schema({
  userId: String
});

userSchema.index({ userId: "hashed" });

6. Geospatial Index (2dsphere)
Used for location-based queries with GeoJSON.

const placeSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [lng, lat]
  }
});

placeSchema.index({ location: "2dsphere" });

Place.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [77.5946, 12.9716]
      },
      $maxDistance: 10000
    }
  }
});

 7.Partial Index
Creates an index only on documents that match a filter condition.

const userSchema = new mongoose.Schema({
  email: String,
  isVerified: Boolean
});

// Index only for verified users with email
userSchema.index(
  { email: 1 },
  { partialFilterExpression: { isVerified: true } }
);

User.find({ email: "user@example.com", isVerified: true });

8. Wildcard Index
Indexes all fields or fields that match a pattern — great for dynamic or flexible schemas.

✅ Mongoose Example:
js
Copy
Edit
const logSchema = new mongoose.Schema({}, { strict: false }); // dynamic schema

// Index every field in every document
logSchema.index({ "$**": 1 });

Log.find({ "action.type": "LOGIN" });

9. TTL (Time-To-Live) Index
Automatically deletes documents after a specified amount of time.


const sessionSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now, index: { expires: 3600 } } // 1 hour
});
⏰ MongoDB runs a background job every 60 seconds to remove expired docs.

// Session is automatically deleted 1 hour after createdAt
✅ Ideal for session tokens, temporary data, and logs.