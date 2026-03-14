const express = require('express')
const cors = require('cors')
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 4000


app.use(cors())
app.use(express.json());


const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('Missing MONGODB_URI in medical-help-server/.env');
  console.error('Set MONGODB_URI to your MongoDB connection string and restart the server.');
  process.exit(1);
}
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db("Medical-Help");
    const userCollection = db.collection("users");
    const doctorCollection = db.collection("doctors");

    app.get('/users/role/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);

      let role = 'user';
      if (user) {
        role = user.role;
      }
      res.send({ role: role });
    });

    const checkAdminRole = async (req, res, next) => {
      const email = req.headers['user-email'];

      if (!email) {
        return res.status(401).send({ message: 'Email not provided' });
      }

      const user = await userCollection.findOne({ email: email });

      if (user?.role !== 'admin') {
        return res.status(403).send({ message: 'Forbidden access. Only admins allowed.' });
      }

      next();
    };

    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'User already exists', insertedId: null });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get('/doctors', async (req, res) => {
      const result = await doctorCollection.find().toArray();
      res.send(result);
    });

    app.get('/doctors/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const doctor = await doctorCollection.findOne(query);
      res.send(doctor);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send(" server is running");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})