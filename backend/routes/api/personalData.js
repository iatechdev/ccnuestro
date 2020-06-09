const { Router } = require("express");
const router = Router();
const dbconnect = require("../../lib/dbconnet");
const uuid = require("uuid").v4;
const datetime = require ("node-datetime") ;


router.post('/createUser', async(req, res, next) => {

  id= uuid();
  id_mall_rel= uuid();
  id_mall= uuid();
  const date_modified = datetime.create()
  const date = date_modified.format('Y-m-d H:m');
  const {
    tipo,
    sic
  } = req.body;

try{
  const match = await dbconnect.query("SELECT a.id as 'id',a.sic_code as 'sic_code', ac.tipo_identificacion_c as 'tipo_identificacion_c' FROM accounts as a INNER JOIN accounts_cstm as ac ON a.id = ac.id_c WHERE a.sic_code="+sic);
 
  if(match.length > 0){
    const Userexist = await dbconnect.query("SELECT a.id as 'id', a.sic_code as 'sic_code',a.name as 'name', ac.tipo_identificacion_c as 'tipo_identificacion_c',ac.celular_c as 'celular_c', ea.email_address as 'email_address' FROM accounts as a LEFT JOIN accounts_cstm as ac ON a.id = ac.id_c LEFT JOIN email_addr_bean_rel as eabr ON ac.id_c = eabr.bean_id LEFT JOIN email_addresses as ea ON eabr.email_address_id = ea.id WHERE a.sic_code ="+sic);
    res.status(200).json({
      ok:true,
      Userexist
    })
  }
  else if(match.length <= 0){
    const registro = await dbconnect.query('INSERT INTO accounts (id, date_entered, sic_code) VALUES(?,?,?)', [id,date,sic]);
    const registro2 = await dbconnect.query('INSERT INTO accounts_cstm (id_c , tipo_identificacion_c) VALUES(?,?)', [id,tipo]);
    const rel_email = await dbconnect.query('INSERT INTO email_addr_bean_rel (id, email_address_id, bean_id) VALUES(?,?,?)', [id_mall_rel,id_mall,id]); 
    const name_email = await dbconnect.query('INSERT INTO email_addresses (id, email_address) VALUES(?,\'\')', [id_mall])
    const Userexist =await dbconnect.query("SELECT a.sic_code as 'sic_code', a.date_entered as 'date_entered', a.id as 'id',ac.tipo_identificacion_c as 'tipo_identificacion_c' FROM accounts as a INNER JOIN accounts_cstm as ac ON a.id = ac.id_c WHERE a.sic_code="+sic)
  
    res.status(200).json({
      ok:true,
      rel_email,
      name_email,
      Userexist
    
    })
  }
  
  } catch(error){
    console.log(error);
    res.json(error)
  }

});


router.get("/getuser", async (req, res) => {
  let sic_code = req.query.sic_code;

    const User = await dbconnect.query("SELECT a.id as 'id',ac.tipo_identificacion_c as 'tipo_identificacion_c', a.sic_code as 'sic_code',a.name as 'name', ac.celular_c as 'celular_c', ea.email_address as 'email_address' FROM accounts as a INNER JOIN accounts_cstm as ac ON a.id = ac.id_c INNER JOIN email_addr_bean_rel as eabr ON ac.id_c = eabr.bean_id INNER JOIN email_addresses as ea ON eabr.email_address_id = ea.id WHERE a.sic_code ="+sic_code);
    if(User.length > 0){
      res.status(200).json({
        ok:true,
        User
      })
    }else{
        res.status(204).json({
         ok:false
        })
    }
});

module.exports = router;

