import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asynceHandler from 'express-async-handler'
import { UserModel } from '../models/user.models';

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const foodsCount = await UserModel.countDocuments();
        if(foodsCount > 0) {
            res.send('Seed is already done');
            return;
        }

        // for creating saving data in the datavase
        await UserModel.create(sample_users);
        res.send('Seed is done');
    }
));

router.post('/login', (req, res) => {
    // const body = req.body;
    const { email, password } = req.body;
    console.log(req.body);
    const user = sample_users.find(user => user.email === email && user.password === password)

    if(user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Username or password not found");
    }

});

const generateTokenResponse = function (user: any) {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "SomeRandomText", { expiresIn: "30d" });

    user.token = token;
    return user;
}

export default router;