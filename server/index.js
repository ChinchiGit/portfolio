const express = require('express');
const app = express();
app.use(express.json());

const projectRoutes = require('./routes/projects.routes');
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

