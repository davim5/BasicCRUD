const express = require('express');
const path = require('path');




const app = express();

app.listen(3000, function(){
  console.log('Listening to port 3000!');
});

app.use(express.json());

app.get('/condominios', (req,res)=>{
  return res.json({ message : 'Condominio Get'});
})

app.post('/condominios', (req,res)=>{
  return res.json({ message: 'Condominio Post'});
})

app.put('/condominios',(req,res)=>{
  return res.json({ message: 'Condominio Update'});
})

app.delete('/condominios',(req,res)=>{
  return res.json({ message: 'Condominios Delete'})
})


