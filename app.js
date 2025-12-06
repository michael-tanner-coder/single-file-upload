const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app =  express();
const port = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'file_storage/');
    },
    filename: (req, file, cb) => {
        const file_name = `${Date.now()}-${file.originalname}`;
        cb(null, file_name);
    }
});

const upload = multer({storage});

app.use('/uploads', express.static(path.join(__dirname, 'file_storage')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/')
});

app.delete('/delete/:fileName', (req, res) => {
    const file_name = req.params.fileName;
    const file_path = path.join(__dirname, 'file_storage', file_name);

    if (fs.existsSync(file_path)) {
        fs.unlinkSync(file_path);
        res.send(`File "${file_name}" has been deleted.`);
    } 
    else {
        res.status(404).send(`File "${file_name}" was not found.`);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})