const { Router } = require("express");
const router = Router();
const dbconnect = require("../../lib/dbconnet");



//obtener  datos personales de clientes

router.get('/data_customer', async(req, res) => {
  let doc = req.query.doc;
  const themescustomer= await dbconnect.query("SELECT  c.id as 'id', c.first_name as 'first_name',c.last_name as 'last_name',c.phone_mobile as 'phone_mobile',c.phone_work as 'phone_work',ea.email_address as 'email_address'  FROM contacts_cstm as cc INNER JOIN contacts as c ON c.id = cc.id_c INNER JOIN email_addr_bean_rel as eabr ON cc.id_c = eabr.bean_id INNER JOIN email_addresses as ea ON ea.id = eabr.email_address_id  WHERE cc.identificacion_c ="+doc);
  if(themescustomer.length > 0){
      res.status(200).json({'responde': themescustomer});
  }else{
      let respuesta = {"id":"0","status":"error"};
      res.status(204).json({'responde': respuesta});
  }
});



//actualización  de los temas de interes
router.put("/data_customer/:id", (req,res,next) => {
    const { id } = req.params;
    const { first_name, last_name, email_address } = req.body

    try {
      const newData = dbconnect.query('UPDATE contacts INNER JOIN email_addr_bean_rel ON contacts.id = email_addr_bean_rel.bean_id INNER JOIN email_addresses ON email_addresses.id = email_addr_bean_rel.email_address_id SET first_name = ?, last_name = ?, email_address = ? WHERE contacts.id = ?',[first_name, last_name, email_address, id]);
      res.json({ newData });
    } catch (error){
      return res.status(500).json({
        mensaje: 'error',
        error
      })
    }
 
} )


module.exports = router;
