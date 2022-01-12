// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }

const express = require('express');
const path = require('path'); 
const app = express();

// // Hack: https isn't working on local host, so use http on localhost:8080 and https on Heroku Production
// if(__dirname =="/Users/zachary/Documents/GitHub/kraken" ){
//     console.log("dev enviroment running")
// } else {
//     app.use(requireHTTPS);
// }
app.use(express.static(path.join(__dirname, '/dist/kraken')));

app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, 'dist/kraken/index.html'))
    // res.send('<p>some html</p>')
);
for (let index = 0; index < 4; index++) {
    console.log("...")
}
console.log("Success! Running on localhost 8080")
app.listen(process.env.PORT || 8080);