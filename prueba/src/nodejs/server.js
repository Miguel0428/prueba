const express = require('express')
const morgan = require('morgan');
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(morgan('dev'));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const uploader = multer({storage : storage,
    limits: { fileSize: 100 * 1024 * 1024 }
})

app.post('/upload', uploader.single('file'), (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo.' });
    }
    try {
        res.status(200).json({ filePath: `uploads/${req.file.filename}` });
    } catch (error) {
        res.status(500).json({ error: 'Error al subir el archivo: ' + error.toString() });

    }
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'El archivo es demasiado grande. El límite es de 100 MB.' });
        }
    }
    next(err); // Pasar el error a la siguiente función de manejo de errores
});


app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});

