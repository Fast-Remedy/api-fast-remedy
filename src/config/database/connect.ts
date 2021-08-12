//import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

//Local
// mongoose.connect(`mongodb://localhost:27017/api-fast-remedy`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(response => console.log('Connection Database Success'),
//         error => console.error('Connection Database Error', error)
//     );

//Cloud
const uri = "mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.ypakl.mongodb.net/fast-remedy?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
