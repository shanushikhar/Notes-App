const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieparser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.all("*", require("./routes/root"), (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
