const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes')

app.use(express.json());


app.use('/tasks', taskRoutes);

app.listen(8080, () =>{
    console.log(`Server is running on port 8080`)
} )
