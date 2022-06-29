const app = require("./index");

const connect = require("./Configs/db");

const port = process.env.PORT || 8081;

app.listen(port, async () => {
  try {
    await connect();
    console.log("Listening to the port 8081");
  } catch (e) {
    console.log(e.message);
  }
});
