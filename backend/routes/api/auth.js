const { Router } = require("express");
const router = Router();
const dbconnect = require("../../lib/dbconnet");
const passport = "passport";

router.get("/getuser", async (req, res) => {
  try {
    const user = await dbconnect.query("SELECT * FROM accounts");
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
});

//ruta para la validación del nit

router.post("/validuser", async (req, res) => {
    const { sic } = req.body;
    const validateuser = await dbconnect.query("SELECT * FROM accounts WHERE sic_code = ?",[sic]);
    
    if (validateuser.length <= 0) {
      const validateid = await dbconnect.query("SELECT * FROM contacts_cstm WHERE sic_code = ?",[sic]);
      if (validateid.length <= 0) {
        res.status(204).json({
          ok: false 
      });
      } else {
          res.status(200).json({
          status:200,
          ok: true
        });
      }
    } else {
      res.status(200).json({
        ok: true,
      });
    };
});


router.post("/valid", async (req, res) => {
  const { sic,tipo } = req.body;
  const validateuser = await dbconnect.query("SELECT * FROM accounts WHERE sic_code = ?",[sic]);
  if (validateuser.length > 0) {
    const validatetipo = await dbconnect.query("SELECT * FROM accounts_cstm WHERE tipo_identificacion_c = ? AND id_c = ?",[tipo,validateuser[0].id]);
    if (validatetipo.length > 0) {
      res.status(200).json({
        ok: true,
      });
    }
} else {
    res.status(204).json({
      ok: false,
    });
  };
});


//ruta para la validación el authorización de datos

module.exports = router;
