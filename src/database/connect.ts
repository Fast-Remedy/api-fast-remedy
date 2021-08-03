import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/api-fast-remedy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(response => console.log('Connection Database Success'),
        error => console.error('Connection Database Error', error)
    );
