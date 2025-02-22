//* Server => App => Routers => Controllers => Services => Models
const app = require("./app/app");
const appConfig = require("./app/share/utils/app.conf");


const PORT = appConfig.PORT || 5001;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});