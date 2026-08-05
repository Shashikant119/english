# Module 5 — MongoDB and Mongoose

MongoDB stores BSON documents in collections. Flexible schema does not mean no
schema: applications still require validation and migration plans.

```text
cluster -> database -> collection -> document -> fields
```

Use local MongoDB/Compass for learning and Atlas for managed hosting. Restrict
network access and create least-privilege database users.

## CRUD and queries

```js
db.products.insertOne({ name: 'Ring', pricePaise: 129900, stock: 5, tags: ['gold'] });
db.products.find({ stock: { $gt: 0 }, tags: 'gold' }).sort({ pricePaise: 1 }).limit(20);
db.products.updateOne({ _id }, { $inc: { stock: -1 } });
db.products.deleteOne({ _id });
```

Use `$set`, `$inc`, `$push`, `$pull`, comparison, logical, array, and existence
operators. Never pass raw client objects as filters/operators.

## Schema design and relationships

Embed data read and changed together and bounded in size. Reference independently
managed or unbounded entities.

```text
Order embeds line-item snapshot (name, unit price, quantity)
Order references userId and paymentId
```

Denormalization improves reads but requires consistency strategy. Transactions
support multi-document atomicity but are not a replacement for good boundaries.

## Indexes

Indexes speed reads and constraints but cost memory and write time. Equality
fields generally precede sort and range fields in compound indexes. Verify with
`explain`; remove unused duplicate indexes. Unique indexes enforce uniqueness,
but handle race-condition errors.

## Aggregation

```js
db.orders.aggregate([
  { $match: { status: 'paid' } },
  { $group: { _id: '$customerId', revenue: { $sum: '$totalPaise' } } },
  { $sort: { revenue: -1 } },
  { $limit: 10 }
]);
```

Filter early, project needed fields, index match/sort stages, and avoid unbounded
array growth.

## Mongoose

```js
const productSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  pricePaise: { type: Number, required: true, min: 0 },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
}, { timestamps: true, optimisticConcurrency: true });
```

Validation is not authorization. Use `lean()` for read-only plain objects, select
only needed fields, paginate with cursor-based pagination at scale, and avoid N+1
population patterns.

## Interview and assignment

Explain BSON, ObjectId, embedding vs referencing, indexes, aggregation,
replication, sharding, atomicity, population, and `lean`. Design Blog CMS and
inventory schemas, indexes, sample queries, aggregation reports, validation,
seed data, and backup/restore instructions.

