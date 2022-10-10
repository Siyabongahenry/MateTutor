const path = require("path");
const express= require("express");
const cors = require("cors");
const usersRouter = require("./src/routes/users.route");
const tutorRouter = require("./src/routes/tutor.route");
const coursesRouter = require("./src/routes/courses.route");

require("dotenv").config();
require("./src/configs/database").connect();
const app = express();

app.use(cors({origin:"http://localhost:3000"}));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(express.urlencoded({extend:false}))

app.use("/users",usersRouter);
app.use("/tutor",tutorRouter);
app.use("/courses",coursesRouter);


const {API_PORT} = process.env;

const PORT = process.env.PORT || API_PORT;

app.listen(PORT,()=> console.log("server running"));