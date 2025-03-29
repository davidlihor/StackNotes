import express from "express";
const router = express.Router();
import path from "path";

router.get("^/$|/index(.html)?", (req, res) => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
});

export default router;