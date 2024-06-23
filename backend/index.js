// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const databases = {
    andhra_pradesh: mongoose.createConnection('process.env.MONGODB_ANDHRA_PRADESH', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    karnataka: mongoose.createConnection('process.env.MONGODB_KARNATAKA', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    // Add other states similarly...
  };

const DataSchema = new mongoose.Schema({
    phase: String,
    data: Array,
});

const PhaseData = mongoose.model('PhaseData', phaseDataSchema, 'phaseData');

const models = {
    andhra_pradesh: {
      'phase-1': databases.andhra_pradesh.model('phase-1', DataSchema),
      // Add other phases if needed...
    },
    karnataka: {
      'phase-2': databases.karnataka.model('phase-2', DataSchema),
      // Add other phases if needed...
    },
    // Add other states similarly...
};

app.get('/data/:state/:phase', async (req, res) => {
    const { state, phase } = req.params;

    const model = models[state]?.[phase];
    if (!model) {
    return res.status(400).json({ error: 'Invalid state or phase' });
    }

    try {
    const result = await model.findOne({ phase });
    res.json(result.data);
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});