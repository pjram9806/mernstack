const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//intialize express
const app = express();


//to acceot the data from frontend
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const HOSTNAME = process.env.HOSTNAME||'127.0.0.1',PORT=process.env.PORT || 2500;

app.listen(PORT,HOSTNAME,()=>
{
    console.log(`Server Started At ${HOSTNAME}:${PORT}`)
});

