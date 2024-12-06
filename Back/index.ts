import axios from "axios";
import express,{Express, Request, Response} from "express";
import cors from "cors";

const port = 8000;
const app = express();
app.use(cors());

app.get("/", (req: Request,res: Response) => {
    res.send("hello from epress");
});


// Route to fetch a product from DummyJSON API
app.get("/products", async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const response = await axios.get(`https://dummyjson.com/products`);
        res.json(response.data.products); // Send the product data as JSON
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

app.get("/product/:id", async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        // Make sure the productId is passed to the external API request
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        res.json(response.data); // Send the product data as JSON
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});
app.listen(port,()=>{
    console.log(`now listening ${port}`);
});