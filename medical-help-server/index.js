const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 4000


app.use(cors())
app.use(express.json());


const uri = "mongodb://medical-admin:rvdtuLFrLA2PFY3o@ac-iydmfi3-shard-00-00.rbn9qen.mongodb.net:27017,ac-iydmfi3-shard-00-01.rbn9qen.mongodb.net:27017,ac-iydmfi3-shard-00-02.rbn9qen.mongodb.net:27017/?authSource=admin&replicaSet=atlas-m585ba-shard-0&tls=true&retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
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
      const email = req.headers['user-email']; // Frontend theke header e email asbe

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

      // Prothome check korchi ei email diye already kono user database e ache kina
      // (Eta pore Social login er somoy khub kaje dibe, jate eki user barbar save na hoy)
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        // User age thekei thakle notun kore ar insert korbo na
        return res.send({ message: 'User already exists', insertedId: null });
      }

      // User na thakle database a notun user hisabe insert korbo
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

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send(" server is running");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})