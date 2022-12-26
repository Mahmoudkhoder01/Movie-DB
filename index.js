const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.send("ok")
})

app.get("/test", (req, res) => {
    res.json({ status: 200, message: 'ok' });
  });

app.get("/time", (req, res)=>{
    const curretnTime = new Date();
    const hours = curretnTime.getHours();
    const minutes = curretnTime.getMinutes();
    res.json({status: 200, message: `${hours}:${minutes}` })
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})