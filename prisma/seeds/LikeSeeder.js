const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")

const prisma = new PrismaClient();

async function LikeSeeder() {
    console.log("Post like seeding started...");
    for (let i = 1; i <= 5; i++) {
        await prisma.postLike.create({
            data: {
                postId: 10,
                userId: i
            }
        })
    }

    for (let i = 1; i <= 5; i++) {
        await prisma.commentLike.create({
            data: {
                commentId: 20,
                userId: i
            }
        })
    }
    console.log("Post like seeding done.")
}

module.exports = { LikeSeeder }