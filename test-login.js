fetch("http://localhost:3000/api/auth/login", {
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({email:"admin@cozycorner.com", password:"cozyadmin123"})
})
.then(async r => {
  console.log("Status:", r.status)
  const text = await r.text();
  console.log("Body:", text)
}).catch(console.error)
