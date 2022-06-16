const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const router = express.Router();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require('helmet');
const cors = require('cors');
const { createAdmin,createSuperAdmin } = require("./controllers/AuthController");
const {createFonts} =  require("./controllers/GlobalController");
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
const fileupload = require("express-fileupload");
const GlobalRouter =require("./routes/global_router");
const AuthRouter =require("./routes/auth_router");

const { validateToken } = require("./middleware/validateToken");



const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* bodyParser.json() is deprecated */
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(fileupload());

app.use(express.static(__dirname +'/public/uploads'));



// Constants
const {
  HOST,
  PORT,
  SESS_SECRET,
  NODE_ENV,
  IS_PROD,
  COOKIE_NAME
} = require("./config/config");
const { MongoURI } = require("./config/database");
const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours
// const IS_PROD = NODE_ENV === "production";

// Connecting to Database
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: MongoURI,
  collection: "mySessions"
});

// Express Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//default file path
app.use(express.static(path.join(__dirname, 'public')));



// Express-Session
app.use(
  session({
    name: COOKIE_NAME, //name to be put in "key" field in postman etc
    secret: SESS_SECRET,
    resave: true,
    saveUninitialized: true,
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: IS_PROD
    }
  })
);

// app.use((req, res, next) => {
//   validateToken();
//   // next();
// });

// router.all("*", [validateToken]);
// router.get("/", (req, res) => res.send("HELLO Robert"));

app.use("/api/collection", require("./routes/collection"));
app.use("/api/nft", require("./routes/nft"));
app.use("/api/profile", require("./routes/profile"));

app.use("/api/global_settings", validateToken, GlobalRouter);
app.use("/api/auth", AuthRouter);




app.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`));

// createAdmin();
// createSuperAdmin();
createFonts();
