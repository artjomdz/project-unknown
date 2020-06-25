const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = require('./models');
const dbConfig = require('./config/db.config');
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to DB');
        initial();
    })
    .catch(err => {
        console.log('Connection error', err);
        process.exit();
    });

function initial () {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'User'
            }).save(err => {
                if(err) {
                    console.log('error'. err);
                }
                console.log('Added user to role');
            });

            new Role({
                name: 'moderator'
            }).save(err => {
                if(err) {
                    console.log('error', err);            
                }
                console.log('Added moderator to role')
            })

            new Role({
                name: 'admin'
            }).save(err => {
                if(err) {
                    console.log('error', err);            
                }
                console.log('Added admin to role')
            })
        }
    })
}


var corsOptions = {
    origin : 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to app 🤗'})
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

