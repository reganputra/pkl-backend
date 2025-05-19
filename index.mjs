import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.mjs";
import router from "./src/routes/index.mjs";


const app = express();
const PORT = process.env.PORT || 8080;

console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT)

// Middleware
app.use(cors({
    origin: 'https://pkl-frontend.vercel.app',
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", router);

// Start Server
connectDB()
  .then(() => {
      app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
      });

  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });
