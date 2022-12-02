const path = require("path");
const express= require("express");
const cors = require("cors");
const usersRouter = require("./src/routes/users.route");
const tutorRouter = require("./src/routes/tutor.route");
const coursesRouter = require("./src/routes/courses.route");
const bookingRouter = require("./src/routes/booking.route");
const notesRouter = require("./src/routes/notes.route");
const rolemanagerRouter = require("./src/routes/rolemanager.route");
const accountmanagerRouter = require("./src/routes/accountmanager.route");
const bookingmanagerRouter = require("./src/routes/bookingmanager.route");

require("dotenv").config();
require("./src/configs/database").connect();
const app = express();

app.use(cors({origin:"http://localhost:3000"}));

app.use("/api",express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(express.urlencoded({extend:false}))

app.use("/api/users",usersRouter);
app.use("/api/tutor",tutorRouter);
app.use("/api/courses",coursesRouter);
app.use("/api/booking",bookingRouter);

app.use("/api/notes",notesRouter);

app.use("/api/rolemanager",rolemanagerRouter);

app.use("/api/accountmanager",accountmanagerRouter);

app.use("/api/bookingmanager",accountmanagerRouter);

const {API_PORT} = process.env;

const PORT = process.env.PORT || API_PORT;

app.listen(PORT,()=> console.log("server running"));