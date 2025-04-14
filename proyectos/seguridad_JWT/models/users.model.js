import { DataTypes } from 'sequelize';
import sequelize from '../db/conectionDb.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const Users = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    firstName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName : {
        type: DataTypes.STRING,
        allowNull: false,
    },   
});


Users.beforeCreate(async (user) => {
    console.log("pass original: " + user.password);
    user.password = await bcrypt.hash(user.password, 8);
    console.log("pass hasheada: " + user.password);
});

export default Users;
