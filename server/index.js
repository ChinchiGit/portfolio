const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const app = express();

app.use(cors()); // Habilita CORS para todas las rutas

app.use(express.json());
const projectRoutes = require('./routes/projects.routes');
const newsRoutes = require('./routes/news.routes');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/projects', projectRoutes);
app.use('/api/news', newsRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor Express');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
