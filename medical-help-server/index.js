const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("Medical-Help");
    const userCollection = db.collection("users");
    const doctorCollection = db.collection("doctors");
    const appointmentCollection = db.collection("appointments");
    const nursingBookingCollection = db.collection("nursingBookings");

    app.get("/users/role/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);

      let role = "user";
      if (user) {
        role = user.role;
      }
      res.send({ role: role });
    });

    const checkAdminRole = async (req, res, next) => {
      const email = req.headers["user-email"];

      if (!email) {
        return res.status(401).send({ message: "Email not provided" });
      }

      const user = await userCollection.findOne({ email: email });

      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ message: "Forbidden access. Only admins allowed." });
      }

      next();
    };

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Doctors
    app.get("/doctors", async (req, res) => {
      const result = await doctorCollection.find().toArray();
      res.send(result);
    });

    app.get("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const doctor = await doctorCollection.findOne(query);
      res.send(doctor);
    });

    app.post("/doctors", async (req, res) => {
      const newDoctor = req.body;
      const query = { registration_number: newDoctor.registration_number };
      const existingDoctor = await doctorCollection.findOne(query);

      if (existingDoctor) {
        return res.send({
          message: "এই রেজিস্ট্রেশন নম্বরের ডাক্তার আগে থেকেই ডেটাবেসে আছেন!",
          insertedId: null,
        });
      }

      const result = await doctorCollection.insertOne(newDoctor);
      res.send(result);
    });

    // Appointments

    app.post("/appointments", async (req, res) => {
      const appointment = req.body;

      const query = {
        doctorId: appointment.doctorId,
        date: appointment.date,
        time: appointment.time,
      };
      const alreadyBooked = await appointmentCollection.findOne(query);

      if (alreadyBooked) {
        return res.send({
          message:
            "দুঃখিত, এই সময়ের স্লটটি আগেই বুক করা হয়েছে! দয়া করে অন্য একটি সময় নির্বাচন করুন।",
          insertedId: null,
        });
      }
      const result = await appointmentCollection.insertOne(appointment);
      res.send(result);
    });

    app.get("/appointments", async (req, res) => {
      let query = {};

      if (req.query?.email) {
        query = { patientEmail: req.query.email };
      }
      const result = await appointmentCollection.find(query).toArray();
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
