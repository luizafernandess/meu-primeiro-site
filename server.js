const express = require("express")
const mysql = require("mysql2")
const bcrypt = require("bcrypt")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())

// SERVIR ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname)))

const db = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "487Otne#",
 database: "login_site"
})

// REGISTRO
app.post("/registro", async (req,res)=>{

 const {email,senha} = req.body

 const hash = await bcrypt.hash(senha,10)

 db.query(
  "INSERT INTO usuarios (email,senha) VALUES (?,?)",
  [email,hash],
  (err,result)=>{
    if(err) return res.status(500).send(err)
    res.send("usuario criado")
  }
 )

})

// LOGIN
app.post("/login",(req,res)=>{

 const {email,senha} = req.body

 db.query(
  "SELECT * FROM usuarios WHERE email=?",
  [email],
  async (err,result)=>{

   if(result.length==0){
    return res.send("usuario não encontrado")
   }

   const usuario = result[0]

   const valido = await bcrypt.compare(senha,usuario.senha)

   if(!valido){
    return res.send("senha incorreta")
   }

   res.send("login sucesso")
  }
 )

})

// ABRIR INDEX
app.get("/", (req,res)=>{
 res.sendFile(path.join(__dirname,"index.html"))
})

// PORTA
app.listen(process.env.PORT || 3000,()=>{
 console.log("Servidor rodando 🚀")
})