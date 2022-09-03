import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('essential-oils-app')
const oils = database.collection('oils')

client.connect()
console.log('connected to mongo')

const app = express()
app.use(cors())
app.use(express.json())


app.listen(4040, () => console.log('API is lisenting on 4040'))

app.get('/', async (request, response) => {
    const allOils = await oils.find().toArray()
    response.send(allOils)
})