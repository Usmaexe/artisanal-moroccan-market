const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function checkSchemaDiff() {
  try {
    console.log('🔍 Checking for schema differences...\n');
    
    // First check migration status
    console.log('📋 Migration Status:');
    try {
      const migrateStatus = execSync('npx prisma migrate status', { 
        encoding: 'utf8',
        cwd: process.cwd()
      });
      console.log(migrateStatus);
    } catch (error) {
      console.log('❌ Migration status check failed:');
      console.log(error.stdout || error.message);
    }

    // Check if there are pending schema changes by doing a dry run
    console.log('\n🔄 Checking for pending schema changes...');
    try {
      const result = execSync('npx prisma migrate dev --create-only --name temp_check', {
        encoding: 'utf8',
        cwd: process.cwd(),
        stdio: 'pipe'
      });
      
      // If we get here, there were changes detected
      console.log('✅ Schema changes detected! A temporary migration was created.');
      console.log('You can review it and then run: npx prisma migrate dev');
      
    } catch (error) {
      if (error.stdout && error.stdout.includes('No schema changes')) {
        console.log('✅ No schema changes detected. Database is in sync!');
      } else {
        console.log('ℹ️  Migration check result:');
        console.log(error.stdout || error.message);
      }
    }

    // Show current schema summary
    console.log('\n📊 Current Schema Summary:');
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      const models = schema.match(/model\s+\w+\s*{[^}]+}/g) || [];
      console.log(`📦 Found ${models.length} models:`);
      models.forEach(model => {
        const modelName = model.match(/model\s+(\w+)/)?.[1];
        const fields = model.match(/\w+\s+\w+/g)?.length || 0;
        console.log(`  • ${modelName} (${fields} fields)`);
      });
    }

  } catch (error) {
    console.error('❌ Error checking schema:', error.message);
  }
}

checkSchemaDiff();
