const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./config/db");
const route = require("./routes/authRoutes");
const { errorMiddleware } = require("./middlewares/errorMiddlewares");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", route);

dbConnection();
const PORT = process.env.PORT || 7007;

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Listening Port : ${PORT}`);
});
