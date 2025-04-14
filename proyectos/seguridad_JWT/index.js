import express from "express";
import "dotenv/config";
// import Users from "./models/users.model.js";
import sequelize from './db/conectionDb.js';
import router from './routes/user.router.js';

const app = express();
const PORT = process.env.PORT || 3001;

const connectDB = async () => {
    try {
        await sequelize.authenticate();
     //   sequelize.sync({force: true}); // Se recomienda usar await
        console.log("Conexión exitosa a la BD");
    } catch (error) {
        console.error("Error al conectar a la BD:", error);
    }
};

connectDB();

// app.get("/", async (req, res) => {
//     try {
//         const users = await Users.findAll();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
app.use(express.json());
app.get('/', async (req, res) => {
    res.json({message: "Soy la api"});
});

app.use("/api/v1/users", router);

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT);
});