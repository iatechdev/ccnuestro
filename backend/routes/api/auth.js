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

router.put("/data/:sic_code",async(req,res,next) => {
  const { sic_code } = req.params;
  const {name, celular_c, email_name, ia_mall_id_c} = req.body

    try{
      if(typeof ia_mall_id_c != "string") return res.json({error: true, message : 'seleccione el centro comercial'});
      const id_mall = await dbconnect.query('SELECT id FROM ia_mall WHERE LOWER(name) = ?', [ia_mall_id_c.toLowerCase()]);
      if(!id_mall || id_mall.lenght <= 0){
        return res.json({
          error: true,
          msj:'No existe el CC'
        })
      }
      console.log(id_mall)
      switch (id_mall[0].id) {
        case "4bbb8759-71b3-a113-94ff-5d2a195fb31a":
          select_mall ="c1e8b5ff-8aa7-8f11-f25d-5d63aeb9e0bb"
          break;
          case "7d0d0a3f-5d38-4fe0-f3e3-5d7aca3409af":
          select_mall ="aef7ae43-c84f-5690-4247-5d7ace150dc4"
          break;
          case "96c9cc49-c8e1-e0f4-d2bb-5d2a19a5dfb1":
          select_mall ="96c9cc49-c8e1-e0f4-d2bb-5d2a19a5dfb1"
          break;
          case "99af0640-df44-306e-c31b-5d29ec2d88cf":
          select_mall ="5b6f0d50-7449-38d0-802b-5d29fd4f998e"
          break;        
        default:
          select_mall="none"
          break;
      }
      const Query = 'UPDATE accounts as a '+ 
      'LEFT JOIN accounts_cstm as ac ON a.id = ac.id_c '+
      'LEFT JOIN email_addr_bean_rel as eabr ON ac.id_c = eabr.bean_id '+
      'LEFT JOIN email_addresses as ea ON eabr.email_address_id = ea.id '+
      'LEFT JOIN ia_mall as ia ON ac.ia_mall_id_c = ia.id '+
      'SET a.name = ?, ac.celular_c = ?, ea.email_address = ?, ac.ia_mall_id_c= ?, ac.tipohabeasdata_c = "web" ,a.assigned_user_id = ?,ac.habeasdata_c = 1 WHERE a.sic_code = ?'
      const newData = await dbconnect.query( Query , [name, celular_c,email_name,id_mall[0].id,select_mall, sic_code]);
 
      res.json({ newData, Query});


    }
    catch (error){
      return res.status(500).json({
        mensaje: 'error',
        error
      })
    }
})


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
    
    res.json({
      'responde': 
      controles,
      control,
      preguntas,
      ok: true
    });
  } catch(error){
    console.log(error);
    res.json(error)
  }
});

module.exports = router;

