const mongoose = require('mongoose');
const MONGO_url = process.env.MONGO_URI;

mongoose.connect(MONGO_url)
    .then(() => {
        console.log(".... ✅ Mongo DB connected");
    })
    .catch((err) => {
        console.log("Monngo db connection err", err);
    })