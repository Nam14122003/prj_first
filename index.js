const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('express-flash');
require("dotenv").config();


const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

const database = require("./config/database");

const systemConfig = require("./config/system")

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//Flash
app.use(cookieParser("NGOCNAM"))
app.use(session({
    cookie: {
        maxAge: 60000
    }
}))
app.use(flash());
//End flash

// App Locals Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

//Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});