
# Cloud Automation & DevOps with GitHub Actions

## Setting Up the Environment

### VM Setup
```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install required packages
sudo apt install -y docker.io ansible git

# Add user to docker group
sudo usermod -aG docker $USER

# Test Docker
docker --version
```

### Application Code  
### Express.js App Setup

This section walks through setting up the Express.js server that powers the DevOps demo.

---

```bash
# Start by initializing a new Node.js project in your root directory:
npm init -y

# Install Express.js:
npm install express

# Create a directory for your application code
mkdir app

# Create the main application file inside the app/ directory
// app/index.js

const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from the self-hosted DevOps demo!');
});

app.listen(port, () => {
  console.log(`App running at http://0.0.0.0:${port}`);
});

```
