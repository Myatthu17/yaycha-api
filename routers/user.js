const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const prisma = require('../prismaClient');

const jwt = require('jsonwebtoken');
const {auth} = require("../middlewares/auth")

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

router.post("/users", async (req, res) => {
    const { name, username, bio, password } = req.body;

    if (!name || !username || !password) {
        return res
            .status(400)
            .json({ msg: "name, username and password are required" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, username, password: hash, bio, }
    })

    res.json(user);
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) { 
        return res
            .status(400)
            .json({ msg: "username and password requires" });
    }

    const user = await prisma.user.findUnique({
        where: { username},
        select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            password: true, 
        },    
    })

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user, process.env.JWT_SECRET)
            return res.json({ token, user });
        }
    }

    res.status(401).json({ msg: "incorrect username or password" });
})

router.get("/verify", auth, async(req, res) => {
    const user = res.locals.user;
    res.json(user);
})

module.exports = { userRouter: router };