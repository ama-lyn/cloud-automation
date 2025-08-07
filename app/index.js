const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from the self-hosted DevOps demo!');
});

app.listen(port, () => {
  console.log(`App running at http://0.0.0.0:${port}`);
});
