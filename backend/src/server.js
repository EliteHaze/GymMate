import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

dotenv.config();
connectDB();

const app = express();  

app.use(cors({
   origin: "https://gymmate-frontend.onrender.com/",
}));
app.use(express.json());

app.use("/exercises", exerciseRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}/exercises`)
});
