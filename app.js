const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app =  express();
const port = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})