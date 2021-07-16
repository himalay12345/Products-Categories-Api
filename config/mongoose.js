const mongoose = require('mongoose');
const url = `mongodb+srv://himalay12345:Ihv1zrSnLUUTUf5G@cluster0.qmwm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const opts = { 
    useNewUrlParser: true ,
    useFindAndModify:false,
    useCreateIndex:true,
    useUnifiedTopology: true,
    connectTimeoutMS:3600000,
    keepAlive:3600000,
    socketTimeoutMS:3600000
};

mongoose.connect(url, opts);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in creating database'));
db.once('open', function(){
    console.log('Database successfully created');
});


module.exports = db;