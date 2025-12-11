const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Database Setup Script
 * Automatically runs on server startup to ensure schema is created
 */
async function setupDatabase() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    try {
        console.log('🔌 Connecting to PostgreSQL database...');
        
        // Test connection
        await pool.query('SELECT NOW()');
        console.log('✅ Database connection successful');

        // Read and execute schema SQL
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

        console.log('📋 Creating database schema...');
        
        // Execute schema SQL
        await pool.query(schemaSQL);
        
        console.log('✅ Database schema created successfully');

        // Verify tables exist
        const tablesResult = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'referrals'
        `);

        if (tablesResult.rows.length > 0) {
            console.log('✅ Table "referrals" verified');

            // Check row count (optional, for info)
            const countResult = await pool.query('SELECT COUNT(*) FROM referrals');
            console.log(`📊 Current referrals in database: ${countResult.rows[0].count}`);
        } else {
            throw new Error('Table "referrals" was not created');
        }

        // Verify indexes exist
        const indexesResult = await pool.query(`
            SELECT indexname 
            FROM pg_indexes 
            WHERE tablename = 'referrals'
        `);
        
        console.log(`✅ Created ${indexesResult.rows.length} indexes on referrals table`);

        return true;
    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        console.error('Full error:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

// If run directly (node db/setup.js), execute setup
if (require.main === module) {
    setupDatabase()
        .then(() => {
            console.log('🎉 Database setup completed successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Database setup failed:', error);
            process.exit(1);
        });
}

module.exports = setupDatabase;
