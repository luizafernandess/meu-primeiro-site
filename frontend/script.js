async function login(){

 const email = document.getElementById("email").value
 const senha = document.getElementById("senha").value

 const res = await fetch("http://localhost:3000/login",{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body: JSON.stringify({
   email,
   senha
  })

 })

 const msg = await res.text()

 alert(msg)

}
async function buscarUsuarios(){

 const resposta = await fetch("http://localhost:3000/usuarios")

 const dados = await resposta.json()

 console.log(dados)

}