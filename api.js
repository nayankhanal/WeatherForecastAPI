const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const location = req.body.location;
  const api = "https://api.weatherapi.com/v1/current.json?key=6b97f7480c1344c09a7171153222307&q="+location;
  https.get(api,function(response){
    response.on("data",function(data){
      const weateherData = JSON.parse(data);
      const location = weateherData.location.region;
      const temp = weateherData.current.temp_f;
      const time = weateherData.location.localtime;
      const text = weateherData.current.condition.text;
      const icon = weateherData.current.condition.icon;
      res.write("<h1>"+location+"</h1>");
      res.write("<h1>"+text+"</h1>");
      res.write("<h1>"+time+"</h1>");
      res.write("<h1>"+temp+"</h1>");
      res.write("<img src="+icon+">");
      res.send();
    });
  });
})

app.listen(3000,function(){
  console.log("server is running at the port 3000.");
});
