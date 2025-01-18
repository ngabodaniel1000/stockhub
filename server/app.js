const express = require('express')
const app = express()
const port = 8889

app.get('/', (req, res) => res.send('Hello World!'))
app.get("/users",(req,res)=>{
    res.json([{name:"john",age:30,location:"USA"},{name:"jane",age:25,location:"UK"}])
})
app.listen(port, () => console.log(`App is listening on port ${port}!`))