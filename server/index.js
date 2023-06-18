import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.js'
import cors from 'cors'


const app = express()
app.use(cors());

const MONGOURI = "mongodb+srv://shanujyadav:9528492010@mern-todo.kdpdpkr.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGOURI, { useNewUrlParser: true })

mongoose.connection.on('connected', () => {
    console.log('db Connected')
})
mongoose.connection.on('disconnected', () => {
    console.log('db not Connected')
})
mongoose.connection.on('error', () => {
    console.log(error.message())
})
app.use(express.json());

app.use(router)

const port = 8000
app.listen(port, () => { console.log(`server is running at ${port}`) })