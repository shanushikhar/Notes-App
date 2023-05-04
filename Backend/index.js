const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

app.use("/", express.static(path.join(__dirname, "/public")));
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

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
