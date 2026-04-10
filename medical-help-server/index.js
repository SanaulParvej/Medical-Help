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
    const homecareBookingCollection = db.collection("homecareBookings");
    const physiotherapyBookingCollection = db.collection("pysiotherapyBookings");

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

    app.patch("/users/role/:id", async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: role
        },
      };
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
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
      let query = {};

      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await userCollection.find(query).toArray();
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


    // Nursing Care Bookings

    app.post('/nursing-bookings', async (req, res) => {
      const bookingData = req.body;

      const query = {
        phone: bookingData.phone,
        startDate: bookingData.startDate,
        planName: bookingData.planName
      };

      const alreadyBooked = await nursingBookingCollection.findOne(query);

      if (alreadyBooked) {
        return res.send({
          message: 'আপনি ইতিমধ্যে এই তারিখের জন্য এই প্যাকেজটি বুক করেছেন! আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',
          insertedId: null
        });
      }

      const result = await nursingBookingCollection.insertOne(bookingData);
      res.send(result);
    });

    app.get('/nursing-bookings', async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { patientEmail: req.query.email };
      }
      const result = await nursingBookingCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/nursing-bookings/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status,
        },
      };

      try {
        const result = await nursingBookingCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send({ message: "স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে" });
      }
    });

    // Physiotherapy Bookings

    app.post('/physiotherapy-bookings', async (req, res) => {
      const bookingData = req.body;

      const query = {
        phone: bookingData.phone,
        startDate: bookingData.startDate,
        planName: bookingData.planName
      };

      const alreadyBooked = await physiotherapyBookingCollection.findOne(query);

      if (alreadyBooked) {
        return res.send({
          message: 'আপনি ইতিমধ্যে এই তারিখের জন্য এই প্যাকেজটি বুক করেছেন! আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',
          insertedId: null
        });
      }

      const result = await physiotherapyBookingCollection.insertOne(bookingData);
      res.send(result);
    });
    app.get('/physiotherapy-bookings', async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { patientEmail: req.query.email };
      }
      const result = await physiotherapyBookingCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/physiotherapy-bookings/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status,
        },
      };
      try {
        const result = await physiotherapyBookingCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send({ message: "স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে" });
      }
    });

    // Home Care Bookings

    app.post('/homecare-bookings', async (req, res) => {
      const bookingData = req.body;

      const query = {
        phone: bookingData.phone,
        startDate: bookingData.startDate,
        planName: bookingData.planName
      };

      const alreadyBooked = await homecareBookingCollection.findOne(query);

      if (alreadyBooked) {
        return res.send({
          message: 'apni itimodhei ei tarikh er jonno ei package ti book korechen!',
          insertedId: null
        });
      }

      const result = await homecareBookingCollection.insertOne(bookingData);
      res.send(result);
    });

    app.get('/homecare-bookings', async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { patientEmail: req.query.email };
      }
      const result = await homecareBookingCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/homecare-bookings/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status,
        },
      };

      try {
        const result = await homecareBookingCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send({ message: "স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে" });
      }
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

    app.delete("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      try {
        const result = await doctorCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).send({ message: "ডাক্তার ডিলিট করতে সার্ভারে সমস্যা হয়েছে" });
      }
    });

    app.patch("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedData = req.body;

      const updateDoc = {
        $set: updatedData
      };

      const result = await doctorCollection.updateOne(filter, updateDoc);
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

    app.patch("/appointments/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status,
        },
      };

      try {
        const result = await appointmentCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send({ message: "স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে" });
      }
    });

    // Admin State

    app.get("/admin-stats", async (req, res) => {
      try {
        const totalUsers = await userCollection.estimatedDocumentCount();
        const totalDoctors = await doctorCollection.estimatedDocumentCount();
        const totalAppointments = await appointmentCollection.estimatedDocumentCount();

        const pendingAppointments = await appointmentCollection.countDocuments({ status: "pending" });
        const approvedAppointments = await appointmentCollection.countDocuments({ status: "approved" });
        const cancelledAppointments = await appointmentCollection.countDocuments({ status: "cancelled" });


        const doctorData = await appointmentCollection.aggregate([
          { $match: { status: "approved" } },
          {
            $group: {
              _id: null,
              total: { $sum: "$totalFee" }
            }
          }
        ]).toArray();

        const nursingData = await nursingBookingCollection.aggregate([
          { $match: { status: "approved" } },
          {
            $group: {
              _id: null,
              total: { $sum: "$planPrice" }
            }
          }
        ]).toArray();

        const homecareData = await homecareBookingCollection.aggregate([
          { $match: { status: "approved" } },
          {
            $group: {
              _id: null,
              total: { $sum: "$planPrice" }
            }
          }
        ]).toArray();

        const physiotherapyData = await physiotherapyBookingCollection.aggregate([
          { $match: { status: "approved" } },
          {
            $group: {
              _id: null,
              total: { $sum: "$planPrice" }
            }
          }
        ]).toArray();

        const doctorRevenue = doctorData[0]?.total || 0;
        const nursingRevenue = nursingData[0]?.total || 0;
        const homecareRevenue = homecareData[0]?.total || 0;
        const physiotherapyRevenue = physiotherapyData[0]?.total || 0;

        const totalRevenue = doctorRevenue + nursingRevenue + homecareRevenue + physiotherapyRevenue;

        const recentAppointments = await appointmentCollection
          .find()
          .sort({ _id: -1 })
          .limit(5)
          .toArray();

        res.send({
          overview: {
            totalUsers,
            totalDoctors,
            totalAppointments,
            totalRevenue
          },

          appointments: {
            pending: pendingAppointments,
            approved: approvedAppointments,
            cancelled: cancelledAppointments
          },

          revenueByService: {
            doctor: doctorRevenue,
            nursing: nursingRevenue,
            homecare: homecareRevenue,
            physiotherapy: physiotherapyRevenue
          },

          recentAppointments
        });

      } catch (error) {
        console.error("Admin stats error:", error);
        res.status(500).send({ message: "Admin stats error" });
      }
    });


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } finally {
  }
}
run().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.send(" server is running");
});
