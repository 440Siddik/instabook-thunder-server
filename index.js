const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9ef9oj.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const statusCollection = client
      .db("instabook-thunder")
      .collection("statuses");

      app.post('/statuses', async(req, res) => {
        const statuses = req.body;
        const addStatus = await statusCollection.insertOne(statuses)
        res.send(addStatus)
      })

      app.get('/mystatuses', async(req, res) => {
        let query = {}
        if(req.query.email){
          query = {
            email:req.query.email
          }
        }
        const cursor = statusCollection.find()
        const statuses =  await cursor.toArray()
        res.send(statuses)
      })
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Instabook Thunder Server iS Running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
