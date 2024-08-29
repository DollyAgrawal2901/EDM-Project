const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Pt6lOP90NDEkZl42v6UZFb4369SBKky9zgnecYP8lYVnWvzzrTCq468lS6J1pJJoSVFxUwJAc7lnB7DSW2NqYQk002hekviPb"
);

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://dolly2004:LQ5a-bED.s8Rxm_@cluster0.nj8zn.mongodb.net/e-commerce"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

const storage = multer.diskStorage({
  destination: "./Upload/Images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/Images", express.static("Upload/Images"));

app.post("/Upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/Images/${req.file.filename}`,
  });
});

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/allproduct", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Amount in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "https://your-domain.com/success",
      cancel_url: "https://your-domain.com/cancel",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port: " + port);
  } else {
    console.log("Error: " + error);
  }
});
