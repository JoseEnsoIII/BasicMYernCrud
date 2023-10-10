import express from "express";
import db from "./config/database.js";
import productRoutes from "./routes/index.js";
import cors from "cors";
 
const app = express();
const port = 5000;

 
app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);
 
app.get('/', async (req, res) => {
    try {
      // Test the database connection
      await db.authenticate();
      console.log('Database is connected');
      res.send('Database is connected'); // Send a response to the client
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).send('Database connection error');
    }
  });
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });