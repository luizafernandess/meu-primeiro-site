const express = require("express")
const mysql = require("mysql2")
const bcrypt = require("bcrypt")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())

// servir arquivos HTML
app.use(express.static(path.join(__dirname)))

// conexão com banco (Railway)
const db = mysql.createConnection({
 host: process.env.MYSQLHOST,
 user: process.env.MYSQLUSER,
 password: process.env.MYSQLPASSWORD,
 database: process.env.MYSQLDATABASE,
 port: process.env.MYSQLPORT
})

// testar conexão
db.connect((err) => {
 if (err) {
  console.log("Erro ao conectar no banco:", err)
 } else {
  console.log("Conectado ao banco MySQL")
 }
})

// rota inicial
app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "index.html"))
})

/* REGISTRO */
app.post("/registro", async (req, res) => {

 const { email, senha } = req.body

 if (!email || !senha) {
  return res.send("preencha tudo")
 }

 try {

  const hash = await bcrypt.hash(senha, 10)

  db.query(
   "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
   [email, hash],
   (err, result) => {

    if (err) {
     console.log(err)
     return res.send("erro ao registrar")
    }

    res.send("usuario registrado")

   }
  )

 } catch (error) {
  res.send("erro no servidor")
 }

})

/* LOGIN */
app.post("/login", (req, res) => {

 const { email, senha } = req.body

 db.query(
  "SELECT * FROM usuarios WHERE email=?",
  [email],
  async (err, result) => {

   if (err) {
    console.log(err)
    return res.send("erro no servidor")
   }

   if (result.length === 0) {
    return res.send("usuario não encontrado")
   }

   const usuario = result[0]

   const valido = await bcrypt.compare(senha, usuario.senha)

   if (!valido) {
    return res.send("senha incorreta")
   }

   res.send("login sucesso")

  }
 )

})

// porta
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
 console.log("Servidor rodando na porta " + PORT)
})