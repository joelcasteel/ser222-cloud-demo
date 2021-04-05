var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, './merge-app/build')));

/**
 */
app.get('/*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, './merge-app/build/index.html'));
    } catch(error) {
        console.log(error);

    }
    
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Merge Sort Demo running at: http://localhost:${port}`);
});