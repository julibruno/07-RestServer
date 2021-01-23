//=======================
// PUERTO
//=======================

let server_port = process.env.PORT || 3000;


//ENTORNOS

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BASE DE DATOS

let urlDB;

if(process.env.NODE_ENV ==='dev'){
    urlDB ='mongodb://localhost:27017/cafe'
}else{
    urlDB= process.env.MONGO_URI
}


process.env.URLDB = urlDB;
