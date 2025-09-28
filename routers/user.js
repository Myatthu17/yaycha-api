const express = require('express');
const router = express.Router();

const prisma = require('../prismaClient');

router.get("/users", async (req, res) => {
    try {
        const data = await prisma.user.findMany({
            include: {
                posts: true,
                comments: true,
            },
            orderBy: { id: "desc" },
            take: 20,
        });
        
        res.json(data);
    } catch (e) {
        res.status(500).json( { error: e} );
    }
})

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const data = await prisma.user.findFirst({
            where: { id: Number(id) },
            include: {
                posts: true,
                comments: true,
            }
        })

        res.json(data);
    } catch (e) {
        res.status(500).json( { error: e} );
    }
})

module.exports = { userRouter: router };