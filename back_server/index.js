//nojs server
const express = require('express');
const cors = require('cors');

const authenticRoutes = require("./routes/authentic.js")
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (request, response) =>{
    response.send("Port 5000");
});



app.use('/authentic', authenticRoutes)

app.listen(PORT, () => console.log( `This server is running on port ${PORT}`));



