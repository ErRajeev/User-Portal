const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
mongoose
  .connect(`${process.env.URL}userportal`)
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Db Connected at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(userRouter);
