"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("hello from epress");
});
// Route to fetch a product from DummyJSON API
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const response = yield axios_1.default.get(`https://dummyjson.com/products`);
        res.json(response.data.products); // Send the product data as JSON
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
}));
app.get("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        // Make sure the productId is passed to the external API request
        const response = yield axios_1.default.get(`https://dummyjson.com/products/${productId}`);
        res.json(response.data); // Send the product data as JSON
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
}));
app.listen(port, () => {
    console.log(`now listening ${port}`);
});
