const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",

};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages",(req, res)=>{
  res.send(messages)
})
app.post("/messages/add", (req, res)=>{
  const {from, text} = req.body;
  if(from && text){
    const message = {
      from: from,
      text: text
            }
          messages.push(message)
    res.send({"success" : true});

  }else{
    res.sendStatus(400);
  }
  


})

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
