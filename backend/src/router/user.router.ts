import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asynceHandler from 'express-async-handler'
import { User, UserModel } from '../models/user.models';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

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

router.post('/login', asynceHandler( async(req, res) => {
    // const body = req.body;
    const { email, password } = req.body;
    console.log(req.body);
    // const user = sample_users.find(user => user.email === email && user.password === password)
    const user = await UserModel.findOne({ email, password });

    if(user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(HTTP_BAD_REQUEST).send("Username or password not found");
    }

}));

router.post("/register", asynceHandler( async(req, res) => {
    const { name, password, email, address } = req.body;
    const user = await UserModel.findOne({email});

    if(user) {
        res.status(HTTP_BAD_REQUEST).send("User is already exist");
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newuser: User = {
        id: '',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false
    };

    const dbUser = await UserModel.create(newuser);
    res.send(generateTokenResponse(dbUser));

}))

const generateTokenResponse = function (user: any) {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "SomeRandomText", { expiresIn: "30d" });

    user.token = token;
    return user;
}



export default router;