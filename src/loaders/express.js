import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import { prefix } from "./../config/index.js";
import routes from "./../api/routes/index.js";
import bodyParser from "body-parser";
import stripe from "stripe";
const stripeObj = stripe(
  "sk_test_51MC7O1SALYbO5cv1vrObjkSKHTczo9No2gIt5SFeiBjNWc9OSQlA8XUgvcbnCMX8x8ZrjoEO1d7YmFOCIrQIWBgH00pt9qpq2u"
);
config();
const { CLIENT_URI } = process.env;
export default (app) => {
  process.on("uncaughtException", async (error) => {
    console.log(error);
  });

  process.on("unhandledRejection", async (ex) => {
    console.log(ex);
  });

  app.enable("trust proxy");
  var allowedOrigins = [
    "http://localhost:3000",
    "https://travel-diaries-capstone.netlify.app",
  ];
  app.use(
    cors({
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(compression());
  app.use(express.static("public"));
  app.disable("x-powered-by");
  app.disable("etag");

  app.use(prefix, routes);

  app.get("/", (_req, res) => {
    return res
      .status(200)
      .json({
        data: "Project is successfully working...",
      })
      .end();
  });

  app.post("/create-checkout-session", async (req, res) => {
    try {
      console.log(CLIENT_URI);
      const { quantity } = req.body;
      console.log(quantity);
      const session = await stripeObj.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{ price: "price_1MC98sSALYbO5cv1EWvSjIRL", quantity }],
        success_url: `${CLIENT_URI}/success`,
        cancel_url: `${CLIENT_URI}/failed`,
      });
      res.json({ url: session.url });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Content-Security-Policy-Report-Only", "default-src: https:");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT POST PATCH DELETE GET");
      return res.status(200).json({});
    }
    next();
  });

  app.use((_req, _res, next) => {
    const error = new Error("Endpoint could not find!");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, _next) => {
    res.status(error.status || 500);
    let level = "External Error";
    if (error.status === 500) {
      level = "Server Error";
    } else if (error.status === 404) {
      level = "Client Error";
    }

    return res.json({
      resultMessage: {
        en: error.message,
      },
      level: level,
    });
  });
};
