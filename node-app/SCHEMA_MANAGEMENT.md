# Prisma Schema Management Guide

## Current Status
✅ Database is in sync with your schema
✅ Baseline migration created: `20250612120216_init_baseline`
✅ 7 models defined: Product, Category, Artisan, Customer, Order, OrderItem, Review

## Commands to Verify Schema Differences

### 1. Check Migration Status
```bash
npx prisma migrate status
```
This shows if your database is up to date with your migrations.

### 2. Check for Schema Drift (using our custom script)
```bash
node scripts/check-schema-diff.js
```
This will:
- Show migration status
- Detect if there are pending schema changes
- Provide a summary of your current models

### 3. Compare Database with Schema (manual check)
```bash
# Generate a new migration (don't apply it yet)
npx prisma migrate dev --create-only --name temp_check

# Review the generated migration file
# If it's empty, no changes needed
# If it has changes, decide whether to apply them

# Clean up if no changes needed
rm -rf prisma/migrations/*temp_check*
```

## Applying Schema Modifications

### When you make changes to your schema:

1. **Edit your `prisma/schema.prisma` file**
   
2. **Create and apply migration:**
   ```bash
   npx prisma migrate dev --name descriptive_migration_name
   ```

3. **Alternative: Push changes without migration (for prototyping):**
   ```bash
   npx prisma db push
   ```
   ⚠️ Use with caution - this doesn't create migration history

### Examples of Common Schema Changes:

#### Adding a new field:
```prisma
model Product {
  // existing fields...
  stock_quantity Int @default(0)  // New field
}
```

#### Adding a new model:
```prisma
model Wishlist {
  wishlist_id Int @id @default(autoincrement())
  customer_id Int
  product_id  Int
  customer    Customer @relation(fields: [customer_id], references: [customer_id])
  product     Product @relation(fields: [product_id], references: [product_id])
}
```

## Production Workflow

### For production deployments:
```bash
# Apply migrations (no interactive prompts)
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

## Troubleshooting

### If migrations get corrupted:
1. Backup your data
2. Reset migrations: `rm -rf prisma/migrations`
3. Reset database: `npx prisma db push --force-reset`
4. Create new baseline: `npx prisma migrate dev --name init_fresh`

### If database is out of sync:
```bash
# Option 1: Reset everything (development only)
npx prisma db push --force-reset

# Option 2: Introspect and adjust
npx prisma db pull
# Review changes in schema.prisma
# Create migration for any additional changes needed
```

## Useful Commands

- `npx prisma studio` - Open database browser
- `npx prisma generate` - Regenerate Prisma Client
- `npx prisma format` - Format schema file
- `npx prisma validate` - Validate schema syntax

---

Your database is currently in sync and ready for development! 🎉
