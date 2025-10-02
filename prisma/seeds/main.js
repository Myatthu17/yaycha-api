const { PrismaClient } = require('@prisma/client');

const { UserSeeder } = require('./UserSeeder');
const { PostSeeder } = require('./PostSeeder');
const { CommentSeeder } = require('./CommentSeeder');
const { LikeSeeder } = require('./LikeSeeder');

const prisma = new PrismaClient();

async function main() {
    try {
        await UserSeeder();
        await PostSeeder();
        await CommentSeeder();
        await LikeSeeder();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();