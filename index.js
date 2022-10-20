import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('essential-oils-app')
const oils = database.collection('oils')
const blogs = database.collection('blogs')

client.connect()
console.log('connected to mongo')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(4040, () => console.log('API is lisenting on 4040'))

//*******  OILS *********// 
// Test
// GET
app.get('/oils', async (request, response) => {
    const allOils = await oils.find().toArray()
    response.send(allOils)
})

// POST
app.post('/add-oil', async (request, response) => {    
    await oils.insertOne(request.body)
    response.send("Oil was added")
})

// DELETE 
app.delete('/remove-oil', async (request, response) => {
    await oils.findOneAndDelete(request.query)
    response.json("Oil was deleted")
})

//******  BLOGS ********//
// GET
app.get('/blogs', async (request, response) => {
    const allBlogs = await blogs.find().toArray()
    response.send(allBlogs)
})

// POST
app.post('/blogs', async (request, response) => {    
    await blogs.insertOne(request.body)
    response.send("Blog was added")
})

// DELETE 
app.delete('/blogs', async (request, response) => {
    await blogs.findOneAndDelete(request.query)
    response.json("Blog was deleted")
})

// PUT = Update... first like DELETE, then like a POST
app.put('/blogs', async (request, response) => {
    await blogs.findOneAndUpdate(request.query, {$set:request.body})
    response.json("Reader left a comment")
})
