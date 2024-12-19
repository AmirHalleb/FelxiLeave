const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT ||3000
const authRoutes=require('./routes/auth.routes')
const LeaveRoutes= require("./routes/leaves.routes")
const cors = require('cors'); // Import the CORS package


dotenv.config();
app.use(express.json()); 
app.use(cors()); // This will allow all origins by default

app.use('/auth',authRoutes);

app.use('/leaves',LeaveRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
