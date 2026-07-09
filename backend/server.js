const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/auth');

const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', authRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});