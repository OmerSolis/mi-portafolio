import User from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const register = async (req, res) => {
    try {
        const {userName, email, password, firstName, lastName} = req.body;
        console.log(userName + " " + email + " " + password + " " + firstName + " " + lastName)

        const user = await User.create({userName, password, email, firstName, lastName});

        return res.status(201).json(`El usuario ${userName} fue creado exitosamente.`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message});
    };
}; 


const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({ where: {userName: userName}});
        
        if (!user) {
            return res.status(400).json({ message: "Las credenciales ingresadas no son correctas"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Usuario / contraseña inválida."});
        }
        
        const token = jwt.sign( {id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return res.json({user, token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
};

/*
const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({ where: {userName: userName}});
        
        if (!user) {
            return res.status(400).json({ message: "Las credenciales ingresadas no son correctas"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Usuario / contraseña inválida."});
        }
        const token = jwt.sign( {id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return res.json({user, token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
};
*/

export const userController = {register, login};