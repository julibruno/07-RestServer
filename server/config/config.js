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
    urlDB= 'mongodb+srv://admin:K3jbFM1FEm8yeouN@cluster0.nxyjr.mongodb.net/cafe'
}


process.env.URLDB = urlDB;
