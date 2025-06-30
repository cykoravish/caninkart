const express = require("express");
const app = express();
const cors = require("cors");
//env fie
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const countryRouter = require("./Routes/CountryRouter");
const StateRouter = require("./Routes/State.routes");
const DistrictRouter = require("./Routes/DistrictRoutes");
const adminRoutes = require("./Routes/Admin");
const blogRoutes = require("./Routes/blogRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const cookieParser = require("cookie-parser");
const path = require('path');
require("./Models/db");

//middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'https://www.caninkart.com', 'https://caninkart.com'],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//Routes
// API Routes
app.use("/countries", countryRouter);
app.use("/state", StateRouter);
app.use("/district", DistrictRouter);

app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/cnt", contactRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("hello ji");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
