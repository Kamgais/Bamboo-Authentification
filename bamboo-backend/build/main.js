"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const configs_1 = require("./configs");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = __importDefault(require("./configs/passport-config"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT ? +process.env.PORT : 3001;
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use((0, cors_1.default)(corsConfig));
app.options('*', (0, cors_1.default)(corsConfig));
// Set up session management
app.use((0, express_session_1.default)({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1hour
}));
// Initialize Passport.js and set up session management
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_config_1.default)();
// Serialize and deserialize user objects
passport_1.default.serializeUser((user, done) => {
    console.log(user, 'hey');
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
// body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the directory for the views
app.set('views', './src/views');
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    (0, configs_1.connectToDB)();
});
app.get('/', (req, res) => {
    console.log('Hello Heroku');
    res.json({ message: "Hello Heroku 😉" });
});
app.use('/bamboo/api/v1/auth', routes_1.authRouter);
