const express = require('express');

const app = express();
const PORT = 5000;

app.get('/api', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://rashataher1245:rasha1245@cluster0.xbdfnwr.mongodb.net/'; // Replace with your MongoDB connection string

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

app.post('/api/users', async (req, res) => {
  try {
    const db = client.db('Testing'); // Replace with your database name
    const collection = db.collection('users');

    const newUser = req.body;
    const result = await collection.insertOne(newUser);

    res.json(result.ops[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Existing code for connection and user creation...

// app.get('/api/users', async (req, res) => {
//   try {
//     const db = client.db('Testing'); // Replace with your database name
//     const collection = db.collection('users');

//     const users = await collection.find({}).toArray();

//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.get('/api/users/:id', async (req, res) => {
//   try {
//     const db = client.db('Testing'); // Replace with your database name
//     const collection = db.collection('users');

//     const userId = req.params.id;

//     const user = await collection.findOne({ _id: userId });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


async function addUserToDatabase() {
  try {
    const db = client.db('Testing'); // Use your database name
    const collection = db.collection('Users'); // Use your collection name

    const user = { name: 'Joya', age: 22 };
    const result = await collection.insertOne(user);

    console.log('User added:', result.ops);
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    // Close the connection after adding the user
    await client.close();
  }
}
// Call the function to connect
connectToDatabase();

addUserToDatabase();
