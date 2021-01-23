const express = require('express')
const bcrypt= require('bcrypt')

const _ = require('underscore')

const app = express()
const Usuario = require('../models/usuario')
const usuario = require('../models/usuario')


app.post('/usuario', function (req, res) {

    let body = req.body;

    //CREO EL OBJETO
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10) ,
        role: body.role

    })

    //GUARDO EL DATO EN LA BASE
    usuario.save((err,usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

     

        res.json({
            ok:true,
            usuario: usuarioDB
        })
    })


    // if(body.nombre === undefined){
    //     res.status(400).json({
    //         ok: false,
    //         mensaje:"El nombre es necesario"
    //     })
    // }else{
    //     res.json(body)
    // }


  
})
 

app.get('/usuario', function (req, res) {
    
//Aca voy agarrar la pagina en la que esta parado el usuario
//sino la tiene entonces arranca de 0
    let desde= Number(req.query.desde) || 0

    let limitePagina = Number(req.query.limite) || 5


    Usuario.find({estado:true},'nombre email role estado google img')
            .skip(desde)
            .limit(limitePagina)
            .exec( (err,usuarios) => {
                if(err){
                    return res.status(400).json({
                        ok:false,
                        err
                    })
                }

                Usuario.count({estado:true}, (err,conteo) => {
    
                    res.json({
                        ok:true,
                        usuarios,
                        cuantos: conteo
                    })                    

                })

            })



  })



  // ============PUT==================
  app.put('/usuario/:id', function (req, res) {

    let id= req.params.id;

    //Esto me lo permite hacer el UNDERSCORE
    //Lo que estoy haciendo con el Pick es solo tomando los valores 
    //que quiero del BODY
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        
        
        res.json({
            ok: true,
            usuario: usuarioDB
        })
            
    })

  })

  app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err,usuarioBorrado) => {

    //     if(err){
    //         return res.status(400).json({
    //             ok:false,
    //             err
    //         })
    //     }

    //     if(usuarioBorrado ===null){
    //         return res.status(400).json({
    //             ok: false,
    //             error:{
    //                 message: 'usuario no encontrado'
    //             }
    //     })
    //      }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     })


    // })


    Usuario.findByIdAndUpdate(id,{estado: false},{runValidators: true, new:true},(err, UsuarioEliminadoEstado) =>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        
        res.json({
            ok: true,
            usuario: UsuarioEliminadoEstado
        })
    })



  })



  module.exports= app;