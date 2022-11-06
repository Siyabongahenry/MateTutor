const path = require("path");
const express= require("express");
const cors = require("cors");
const usersRouter = require("./src/routes/users.route");
const tutorRouter = require("./src/routes/tutor.route");
const coursesRouter = require("./src/routes/courses.route");
const bookingRouter = require("./src/routes/booking.route");

const notesRouter = require("./src/routes/notes.route");

require("dotenv").config();
require("./src/configs/database").connect();
const app = express();

app.use(cors({origin:"http://localhost:3000"}));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(express.urlencoded({extend:false}))

app.use("/api/users",usersRouter);
app.use("/api/tutor",tutorRouter);
app.use("/api/courses",coursesRouter);
app.use("/api/booking",bookingRouter);

app.use("/api/notes",notesRouter);

const {API_PORT} = process.env;

const PORT = process.env.PORT || API_PORT;

app.listen(PORT,()=> console.log("server running"));