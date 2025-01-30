//* Server => App => Routers => Controllers => Services => Models
const app = require("./app/app");


const PORT = 5001;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});