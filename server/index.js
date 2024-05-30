const express = require('express');
const app = express();
app.use(express.json());
const projectRoutes = require('./routes/projects.routes');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor Express');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

