const express = require('express')
const cors = require("cors");
const createError = require("http-errors");

const app = express()
const apiRouter = require("./routes/api");

const port = process.env.PORT || 5000

app.use(cors());
app.use("/", apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, res) => {

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

app.listen(port, () => {
  console.log(`Express started on port ${port}`)
})

module.exports = app;