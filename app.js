const express = require('express');
 const cors = require('cors');
 
 const app = express();
 const PORT = 4500;
 
 app.use(cors());
 
 app.get('/', (req, res) => {
   res.send('Hello, world!');
 });
 
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });