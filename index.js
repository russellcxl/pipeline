require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path'); //need to set proper paths in app
app.use(cors());

// ------------------------------------ middleware ------------------------------------ //

require("./config/db");
app.use(express.json());
app.use(express.static("frontend/build")) //look for a folder called build in the root of pipeline
app.use(cors());

// ------------------------------------ routers ------------------------------------ //

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/documents", require("./routes/document.routes"));

// ------------------------------------ default path ------------------------------------ //

app.get("/*", (req, res) => {
  //this will tell nodejs to look in the frontend folder for a folder called build and file called index.html
  //test this by loading your nodejs app and visit the root of the app 
  //http://localhost:port/
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

//not needed anymore because, react will set the 404s
// app.get("*", (req, res) => {
//   res.status(404).json({ message: "Yep, you're on PIPELINE", code: "EB404" });
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running on localhost ${process.env.PORT}`);
});