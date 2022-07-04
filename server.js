// IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import getSlovnik from "./controllers/fetchSeznam.js";

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/slovnikSeznam", async (req, res) => {
  console.log("dostal jsem request");
  const slovo = req.body.slovo;
  console.log("slovo: ", slovo);
  const htmlSeznamSlovnik = await getSlovnik(slovo);
  res.status(200).json({
    message: "success",
    htmlSeznamSlovnik,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
