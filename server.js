const express = require("express")
const mysql = require("mysql2")
const bcrypt = require("bcrypt")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())

// servir arquivos HTML
app.use(express.static(__dirname))

// rota inicial
app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "index.html"))
})

// REGISTRO
app.post("/registro", async (req, res) => {

 const { email, senha } = req.body

 if (!email || !senha) {
  return res.send("preencha tudo")
 }

 res.send("usuario registrado")
})

// LOGIN
app.post("/login", async (req, res) => {

 const { email, senha } = req.body

 if (email === "teste@email.com" && senha === "123") {
  res.send("login sucesso")
 } else {
  res.send("email ou senha incorreto")
 }

})

// PORTA (IMPORTANTE PARA RENDER)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
 console.log("Servidor rodando na porta " + PORT)
})