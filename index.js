require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// ------------------------------------ middleware ------------------------------------ //

require("./config/db");
app.use(express.json());
app.use(cors());

// ------------------------------------ routers ------------------------------------ //

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/documents", require("./routes/document.routes"));

// ------------------------------------ default path ------------------------------------ //

app.get("*", (req, res) => {
  res.status(404).json({ message: "Yep, you're on PIPELINE", code: "EB404" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on localhost ${process.env.PORT}`);
});