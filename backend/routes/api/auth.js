const { Router } = require("express");
const router = Router();
const dbconnect = require("../../lib/dbconnet");
const uuid = require("uuid").v4;
const datetime = require ("node-datetime") ;

router.get("/getuser", async (req, res) => {
  try {
    const user = await dbconnect.query("SELECT * FROM accounts");
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
});

//ruta para la validación del nit

router.post("/valid", async (req, res) => {
  const { sic,tipo } = req.body;
  const validateuser = await dbconnect.query("SELECT * FROM accounts WHERE sic_code = ?",[sic]);
  if (validateuser.length > 0) {
    const validatetipo = await dbconnect.query("SELECT * FROM accounts_cstm WHERE tipo_identificacion_c = ? AND id_c = ?",[tipo,validateuser[0].id]);
    if (validatetipo.length > 0) {
      res.status(200).json({
        ok: validatetipo
      });
    }
} else {
    res.status(204).json({
      ok: false,
    });
  };
});


router.put("/data/:id", (req,res,next) => {
  const { id } = req.params;
  const { name, celular_c, email_name, ia_mall_id_c} = req.body

    try{
      if(typeof ia_mall_id_c != "string") return res.json({error: true, message : 'seleccione el centro comercial'})
      const id_mall = dbconnect.query('SELECT id FROM ia_mall WHERE LOWER(name) = ?', [ia_mall_id_c.toLowerCase()])
      const Query = 'UPDATE accounts as a '+ 
      'INNER JOIN accounts_cstm as ac ON a.id = ac.id_c '+
      'INNER JOIN email_addr_bean_rel as eabr ON ac.id_c = eabr.bean_id '+
      'INNER JOIN email_addresses as ea ON eabr.email_address_id = ea.id '+
      'INNER JOIN ia_mall as ia ON ac.ia_mall_id_c = ia.id '+
      'SET a.name = ?, celular_c = ?, email_address = ?, ia.name= ?, tipohabeasdata_c = "web" , habeasdata_c = 1 WHERE a.id = ?'
    const newData = dbconnect.query( Query , [name, celular_c,email_name, ia_mall_id_c, id]);
      res.json({ newData, Query});
    }
    catch (error){
      return res.status(500).json({
        mensaje: 'error',
        error
      })
    }
})


/*router.put('/seguridad/:id', async(req,res) => {
  const { id } = req.params;

  // const valid =((typeof boolean)!='boolean')? false:true
  tapabocas =(typeof req.body.tapabocas == 'undefined' || req.body.tapabocas == 0 ) ? false:true;
  mascarilla =(typeof req.body.mascarilla == 'undefined' ||  req.mascarilla == 0 ) ? false:true;
  guantes =(typeof req.body.guantes == 'undefined' ||  req.guantes == 0 ) ? false:true;
  pregunta1_c =(typeof req.body.pregunta1_c == 'undefined' || req.pregunta1_c == 0 ) ? false:true;
  pregunta2_c =(typeof req.body.pregunta2_c == 'undefined' || req.pregunta2_c == 0 ) ? false:true;
  pregunta3_c =(typeof req.body.pregunta3_c == 'undefined' ||req.pregunta3_c == 0 ) ? false:true;
  pregunta4_c =(typeof req.body.pregunta4_c == 'undefined' || req.pregunta4_c == 0 ) ? false:true;
  pregunta5_c =(typeof req.body.pregunta5_c == 'undefined' ||req.pregunta5_c == 0 ) ? false:true;



  /*const themes= [
    tapabocas,
    mascarilla,
    guantes,
    pregunta1_c,
    pregunta2_c,
    pregunta3_c,
    pregunta4_c,
    pregunta5_c
   ] ;

  try {
    const Query = 'UPDATE accounts as a '+
    'INNER JOIN accounts_ia_controlbioseguridad_1_c  as aic ON a.id = aic.accounts_ia_controlbioseguridad_1accounts_ida '+
    'INNER JOIN ia_controlbioseguridad as iacb ON aic.accounts_ia_controlbioseguridad_1ia_controlbioseguridad_idb = iacb.id '+
    'INNER JOIN  ia_controlbioseguridad_cstm as iacs ON iacb.id = iacs.id_c '+
    'SET tapabocas = ?, mascarilla = ?, guantes = ?, pregunta1_c = ?, pregunta2_c = ?, pregunta3_c = ?, pregunta4_c = ?, pregunta5_c = ? WHERE a.id = ? '

    const control= dbconnect.query( Query, [...themes, id]);

    res.json({ control, Query});
  } catch (error) {
    return res.status(500).json({
      mensaje: 'error',
      error
    })   
  }
} )*/

//ruta para la validación el authorización de datos


router.post('/seguridad',async(req,res) => {
  const id = uuid()
  const id_cs = uuid()
  const date_modified = datetime.create()
  const date = date_modified.format('Y-m-d H:m');
  
  const{
    user,
    tapabocas,
    mascarilla,
    guantes,
    pregunta1_c,
    pregunta2_c,
    pregunta3_c,
    pregunta4_c,
    pregunta5_c
  }=req.body

  
  try{
    const controles = await dbconnect.query ('INSERT INTO accounts_ia_controlbioseguridad_1_c (id,date_modified,accounts_ia_controlbioseguridad_1accounts_ida,accounts_ia_controlbioseguridad_1ia_controlbioseguridad_idb) VALUES(?,?,?,?)',[id, date, user, id_cs]);
    const control = await dbconnect.query ('INSERT INTO ia_controlbioseguridad (id,date_entered,tapabocas,mascarilla,guantes) VALUES(?,?,?,?,?) ',[id_cs, date,tapabocas,mascarilla,guantes]);
    const preguntas =await dbconnect.query ('INSERT INTO ia_controlbioseguridad_cstm (id_c, pregunta1_c, pregunta2_c,pregunta3_c,pregunta4_c, pregunta5_c) VALUES(?,?,?,?,?,?) ',[id_cs, pregunta1_c, pregunta2_c,pregunta3_c,pregunta4_c, pregunta5_c]);
    
    res.status(200).json({
      'responde': 
      controles,
      control,
      preguntas,
      ok: true
    });
  } catch(error){
    res.json(error)
  }
});

module.exports = router;

