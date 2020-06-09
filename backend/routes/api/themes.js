const { Router } = require("express");
const router = Router();
const dbconnect = require("../../lib/dbconnet");


//obtener los datos de los temas de interes almacenados en la base de dato
router.get("/contact_cstm", async (req, res) => {
  try {
    const contacts_cstm = await dbconnect.query("SELECT * FROM contacts_cstm");
    res.json({ contacts_cstm });
  } catch (error) {
    console.log(error);
  }
});


router.get('/themescustomer', async(req, res) => {
  let doc = req.query.doc;
  const themes_customer= await dbconnect.query("SELECT ac.id_c as 'id_c',ac.autoriza_datos_c as 'autoriza_datos_c', COALESCE(ac.administrativo_c,0) as 'administrativo_c',COALESCE(ac.comercio_exterior_c,0) as 'comercio_exterior_c',COALESCE(ac.comunicaciones_c,0) as 'comunicaciones_c',COALESCE(ac.economia_naranja_c,0) as 'economia_naranja_c',COALESCE(ac.gestiondecalidad_c,0) as 'gestiondecalidad_c',COALESCE(ac.gestionhumana_c,0) as 'gestionhumana_c',COALESCE(ac.innovacion_c,0) as 'innovacion_c', COALESCE(ac.mercadeo_c,0) as 'mercadeo_c', COALESCE(ac.procesosyproductividad_c,0) as 'procesosyproductividad_c', COALESCE(ac.sector_publico_c,0) as 'sector_publico_c', COALESCE(ac.ti_tecnologiadelainformacion_c,0) as 'ti_tecnologiadelainformacion_c', COALESCE(ac.comercioyventas_c,0) as 'comercioyventas_c',COALESCE(ac.competenciasblandas_c,0) as 'competenciasblandas_c', COALESCE(ac.contabilidad_c,0) as 'contabilidad_c', COALESCE(ac.gerencia_c,0) as 'gerencia_c',COALESCE(ac.gestionestrategica_c,0) as 'gestionestrategica_c',COALESCE(ac.idiomas_c,0) as 'idiomas_c',COALESCE(ac.juricoylegal_c,0) as 'juricoylegal_c',COALESCE(ac.normativas_c,0) as 'normativas_c', COALESCE(ac.proyectos_c,0) as 'proyectos_c', COALESCE(ac.servicioalcliente_c,0) as 'servicioalcliente_c', COALESCE(ac.tributario_c,0) as 'tributario_c' FROM accounts as a INNER JOIN accounts_cstm as ac ON a.id = ac.id_c WHERE a.sic_code ="+doc);
  
  if(themes_customer.length > 0){
      res.status(200).json({'responde': themes_customer});
  }else{
      let respuesta = {"id":"0","status":"error"};
      res.status(204).json({'responde': respuesta});
  }
});

router.get('/seguritycontrol', async(req, res) => {
  let doc = req.query.doc;
  const themes_control= await dbconnect.query("SELECT ac.id_c as 'id_c',ic.tapabocas as 'tapabocas',ic.mascarilla as 'mascarilla', ic.guantes as 'guantes',icc.pregunta1_c as 'pregunta1_c',icc.pregunta2_c as 'pregunta2_c', icc.pregunta3_c as 'pregunta3_c',icc.pregunta4_c as 'pregunta4_c' FROM accounts as a INNER JOIN accounts_cstm as ac ON a.id = ac.id_c INNER JOIN accounts_ia_controlbioseguridad_1_c as acb ON ac.accounts_ia_controlbioseguridad_1accounts_ida = acb.id INNER JOIN ia_controlbioseguridad as ic ON acb.id = ic.id INNER JOIN ia_controlbioseguridad_cstm as icc ON ic.id=icc.id_c WHERE a.sic_code ="+doc);
  
  if(themes_control.length > 0){
      res.status(200).json({'responde': themes_control});
  }else{
      let respuesta = {"id":"0","status":"error"};
      res.status(204).json({'responde': respuesta});
  }
});


//actualizar los datos de null

router.put('/newinterest_nit/:id_c', async(req,res) => {
  const { id_c } = req.params;

  // const valid =((typeof boolean)!='boolean')? false:true
    tapabocas =(typeof req.body.tapabocas == 'undefined' || req.tapabocas == 0 ) ? false:true;
    mascarilla =(typeof req.body.mascarilla == 'undefined' || req.mascarilla == 0 ) ? false:true;
    guantes =(typeof req.body.guantes == 'undefined' || req.guantes == 0 ) ? false:true;
    pregunta1_c =(typeof req.body.pregunta2_c == 'undefined' || req.pregunta1_c == 0 ) ? false:true;
    pregunta2_c =(typeof req.body.pregunta2_c == 'undefined' || req.pregunta2_c == 0 ) ? false:true;
    pregunta3_c =(typeof req.body.pregunta3_c == 'undefined' || req.pregunta3_c == 0 ) ? false:true;
    pregunta4_c =(typeof req.body.pregunta4_c == 'undefined' || req.pregunta4_c == 0 ) ? false:true;



  const themes= {
    administrativo_c,
    mascarilla,
    guantes,
    pregunta1_c,
    pregunta2_c,
    pregunta3_c,
    pregunta4_c
  } ;

  try {
    const newThemes_nit = await dbconnect.query('UPDATE accounts_cstm SET ? WHERE id_c = ? ' , [themes, id_c]);
    
    res.json({ newThemes_nit });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'error',
      error
    })   
  }
  
} )


//actualización  de los temas de interes de clientes
router.put('/newinterest_nit/:id_c', async(req,res) => {
  const { id_c } = req.params;

  // const valid =((typeof boolean)!='boolean')? false:true
    administrativo_c =(typeof req.body.administrativo_c == 'undefined' || req.body.administrativo_c == 0 ) ? false:true,
    comercio_exterior_c=(typeof req.body.comercio_exterior_c== 'undefined' || req.body.comercio_exterior_c == 0 ) ? false:true,
    comunicaciones_c=(typeof req.body.comunicaciones_c == 'undefined' || req.body.comunicaciones_c == 0 ) ? false:true,
    economia_naranja_c=(typeof req.body.economia_naranja_c == 'undefined' || req.body.economia_naranja_c == 0 ) ? false:true,
    gestiondecalidad_c=(typeof req.body.gestiondecalidad_c == 'undefined' || req.body.gestiondecalidad_c == 0 ) ? false:true,
    gestionhumana_c=(typeof req.body.gestionhumana_c == 'undefined' || req.body.gestionhumana_c == 0 ) ? false:true,
    innovacion_c=(typeof req.body.innovacion_c== 'undefined' || req.body.innovacion_c== 0 ) ? false:true,
    mercadeo_c=(typeof req.body.mercadeo_c == 'undefined' || req.body.mercadeo_c == 0 ) ? false:true,
    procesosyproductividad_c=(typeof req.body.procesosyproductividad_c == 'undefined' || req.body.procesosyproductividad_c == 0 ) ? false:true,
    sector_publico_c=(typeof req.body.sector_publico_c == 'undefined' || req.body.sector_publico_c == 0 ) ? false:true,
    ti_tecnologiadelainformacion_c=(typeof req.body.ti_tecnologiadelainformacion_c == 'undefined' || req.body.ti_tecnologiadelainformacion_c == 0 ) ? false:true,
    comercioyventas_c=(typeof req.body.comercioyventas_c== 'undefined' || req.body.comercioyventas_c == 0 ) ? false:true,
    competenciasblandas_c=(typeof req.body.competenciasblandas_c == 'undefined' || req.body.competenciasblandas_c == 0 ) ? false:true,
    contabilidad_c=(typeof req.body.contabilidad_c == 'undefined' || req.body.contabilidad_c == 0 ) ? false:true,
    gerencia_c=(typeof req.body.gerencia_c== 'undefined' || req.body.gerencia_c == 0 ) ? false:true,
    gestionestrategica_c=(typeof req.body.gestionestrategica_c == 'undefined' || req.body.gestionestrategica_c == 0 ) ? false:true,
    idiomas_c=(typeof req.body.idiomas_c== 'undefined' || req.body.idiomas_c == 0 ) ? false:true,
    juricoylegal_c=(typeof req.body.juricoylegal_c== 'undefined' || req.body.juricoylegal_c == 0 ) ? false:true,
    normativas_c=(typeof req.body.normativas_c == 'undefined' || req.body.normativas_c == 0 ) ? false:true,
    proyectos_c=(typeof req.body.proyectos_c== 'undefined' || req.body.proyectos_c == 0 ) ? false:true,
    servicioalcliente_c=(typeof req.body.servicioalcliente_c == 'undefined' || req.body.servicioalcliente_c == 0 ) ? false:true,
    tributario_c=(typeof req.body.tributario_c == 'undefined' || req.body.tributario_c == 0 ) ? false:true;

  const themes={
    administrativo_c,
    comercio_exterior_c,
    comunicaciones_c,
    economia_naranja_c,
    gestiondecalidad_c,
    gestionhumana_c,
    innovacion_c,
    mercadeo_c,
    procesosyproductividad_c,
    sector_publico_c,
    ti_tecnologiadelainformacion_c,
    comercioyventas_c,
    competenciasblandas_c,
    contabilidad_c,
    gerencia_c,
    gestionestrategica_c,
    idiomas_c,
    juricoylegal_c,
    normativas_c,
    proyectos_c,
    servicioalcliente_c,
    tributario_c
  } ;

  try {
    const newThemes_nit = await dbconnect.query('UPDATE accounts_cstm SET ? WHERE id_c = ? ' , [themes, id_c]);
    
    res.json({ newThemes_nit });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'error',
      error
    })   
  }
  
} )


//actualización  de los temas de interes
router.put("/authData_nit/:id_c", async(req,res,next) => {

  const { id_c } = req.params;

  const { autoriza_datos_c} = req.body;

  
  if( autoriza_datos_c != true){
    throw new Error('please select the input')
  }

  try {
    const newData_nit = await dbconnect.query('UPDATE accounts_cstm SET autoriza_datos_c = ? WHERE id_c = ? ' , [autoriza_datos_c, id_c]);

    res.json({ newData_nit });

  } catch (error){
    return res.status(500).json({
      mensaje: 'error',
      error
    })
  }

} )




//obtener  de los temas de interes de clientes

router.get('/themes_customer', async(req, res) => {
  let doc = req.query.doc;
  const themescustomer= await dbconnect.query("SELECT cc.id_c as 'id_c', cc.autorizacion_datos_personale_c as 'autorizacion_datos_personale_c', cc.administrativo_c as 'administrativo_c', cc.comercialventas_c as 'comercialventas_c',cc.comercioexterior_c as 'comercioexterior_c',cc.competenciasblandas_c as 'competenciasblandas_c',cc.comunicaciones_c as 'comunicaciones_c',cc.contabilidad_c as 'contabilidad_c',cc.economianaranja_c as 'economianaranja_c', cc.gerencia_c as 'gerencia_c', cc.gestiondecalidad_c as 'gestiondecalidad_c', cc.gestionestrategica_c as 'gestionestrategica_c', cc.gestionhumana_c as 'gestionhumana_c', cc.idiomas_c as 'idiomas_c',cc.innovacion_c as 'innovacion_c', cc.contabilidad_c as 'contabilidad_c',cc.juridicoylegal_c as 'juridicoylegal_c',cc.mercadeo_c as 'mercadeo_c',cc.normativas_c as 'normativas_c',cc.procesosproductividad_c as 'procesosproductividad_c',cc.proyectos_c as 'proyectos_c', cc.sectorpublico_c as 'sectorpublico_c', cc.serviciocliente_c as 'servicioalcliente_c', cc.ti_c as 'ti_c' , cc.tributario_c as 'tributario_c' FROM contacts_cstm as cc WHERE cc.identificacion_c ="+doc);
  if(themescustomer.length > 0){
      res.status(200).json({'responde': themescustomer});
  }else{
      let respuesta = {"id":"0","status":"error"};
      res.status(204).json({'responde': respuesta});
  }
});


//actualización  de los temas de interes de clientes
router.put("/newinterest/:id_c",(req,res) => {
    const { id_c } = req.params;
    // const valid =((typeof boolean)!='boolean')? false:true
      administrativo_c =(typeof req.body.administrativo_c == 'undefined' || req.body.administrativo_c == 0 ) ? false:true,
      comercialventas_c=(typeof req.body.comercialventas_c == 'undefined' || req.body.comercialventas_c == 0 ) ? false:true,
      comercioexterior_c=(typeof req.body.comercioexterior_c == 'undefined' || req.body.comercioexterior_c == 0 ) ? false:true,
      competenciasblandas_c=(typeof req.body.competenciasblandas_c == 'undefined' || req.body.competenciasblandas_c == 0 ) ? false:true,
      comunicaciones_c=(typeof req.body.comunicaciones_c == 'undefined' || req.body.comunicaciones_c == 0 ) ? false:true,
      contabilidad_c=(typeof req.body.contabilidad_c == 'undefined' || req.body.contabilidad_c == 0 ) ? false:true,
      economianaranja_c=(typeof req.body.economianaranja_c == 'undefined' || req.body.economianaranja_c == 0 ) ? false:true,
      gerencia_c=(typeof req.body.gerencia_c == 'undefined' || req.body.gerencia_c == 0 ) ? false:true,
      gestiondecalidad_c=(typeof req.body.gestiondecalidad_c == 'undefined' || req.body.gestiondecalidad_c == 0 ) ? false:true,
      gestionestrategica_c=(typeof req.body.gestionestrategica_c == 'undefined' || req.body.gestionestrategica_c == 0 ) ? false:true,
      gestionhumana_c=(typeof req.body.gestionhumana_c == 'undefined' || req.body.gestionhumana_c == 0 ) ? false:true,
      idiomas_c=(typeof req.body.idiomas_c == 'undefined' || req.body.idiomas_c == 0 ) ? false:true,
      innovacion_c=(typeof req.body.innovacion_c == 'undefined' || req.body.innovacion_c == 0 ) ? false:true,
      juridicoylegal_c=(typeof req.body.juridicoylegal_c == 'undefined' || req.body.juridicoylegal_c == 0 ) ? false:true,
      mercadeo_c=(typeof req.body.mercadeo_c == 'undefined' || req.body.mercadeo_c == 0 ) ? false:true,
      normativas_c=(typeof req.body.normativas_c == 'undefined' || req.body.normativas_c == 0 ) ? false:true,
      procesosproductividad_c=(typeof req.body.procesosproductividad_c == 'undefined' || req.body.procesosproductividad_c == 0 ) ? false:true,
      proyectos_c=(typeof req.body.proyectos_c == 'undefined' || req.body.proyectos_c == 0 ) ? false:true,
      sectorpublico_c=(typeof req.body.sectorpublico_c == 'undefined' || req.body.sectorpublico_c == 0 ) ? false:true,
      serviciocliente_c=(typeof req.body.serviciocliente_c == 'undefined' || req.body.serviciocliente_c == 0 ) ? false:true,
      ti_c=(typeof req.body.tic_c == 'undefined' || req.body.tic_c == 0 ) ? false:true,
      tributario_c=(typeof req.body.tributario_c == 'undefined' || req.body.tributario_c == 0 ) ? false:true;

    const themes={
      administrativo_c,
      comercialventas_c,
      comercioexterior_c,
      competenciasblandas_c,
      comunicaciones_c,
      contabilidad_c,
      economianaranja_c,
      gerencia_c,
      gestiondecalidad_c,
      gestionestrategica_c,
      gestionhumana_c,
      idiomas_c,
      innovacion_c ,
      juridicoylegal_c,
      mercadeo_c,
      normativas_c,
      procesosproductividad_c,
      proyectos_c,
      sectorpublico_c,
      serviciocliente_c,
      ti_c,
      tributario_c
    } ;

    try {
      const newThemes = dbconnect.query('UPDATE contacts_cstm SET ? WHERE id_c = ?',[themes,id_c],);
      res.json({ newThemes });
      
    } catch (error) {
      return res.status(500).json({
        mensaje: 'error',
        error
      })   
    }
    
} )


//actualización  de los temas de interes
router.put("/authData/:id_c", (req,res,next) => {
    const {id_c} = req.params;
    let { autorizacion_datos_personale_c } = req.body

    
    if( autorizacion_datos_personale_c != true){
      throw new Error('please select the input')
    }

    try {
      const newData = dbconnect.query('UPDATE contacts_cstm SET  autorizacion_datos_personale_c = ? WHERE id_c=?',[autorizacion_datos_personale_c,id_c]);
      res.json({ newData });
    } catch (error){
      return res.status(500).json({
        mensaje: 'error',
        error
      })
    }
 
} )


module.exports = router;
