
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

## Infrastructure as Code  
### Ansible Setup

This section explains how to use Ansible to automate the deployment of the Express.js app inside a Docker container.

---

```bash
# Start by creating the basic Ansible folder layout
mkdir -p ansible/roles

# Define host(s) to deploy to in ansible/inventory.ini
[webserver]
localhost ansible_connection=local

# Create ansible/deploy_app.yml with the following content
---
- hosts: webserver
  become: yes
  tasks:
    - name: Ensure Docker is running
      service:
        name: docker
        state: started

    - name: Build Docker image
      docker_image:
        build:
          path: "{{ playbook_dir }}/.."
        name: express-app
        source: build
        force_source: yes

    - name: Run Docker container
      docker_container:
        name: express-app
        image: express-app
        state: started
        recreate: yes
        published_ports:
          - "8080:8080"

# This playbook performs the following:

- Ensures Docker is running

- Builds a Docker image named express-app

- Starts (or restarts) the container, mapping port 8080 to the host
```

## CI/CD Pipeline  
### GitHub Actions Setup

This section sets up a GitHub Actions workflow to automatically deploy the Express.js application using Ansible whenever changes are pushed to the `main` branch.

---

### Create Workflow Directory

Begin by creating the directory for GitHub Actions workflows:

```bash
# Begin by creating the directory for GitHub Action workflows
mkdir -p .github/workflows

# Create .github/workflows/deploy.yml with the following contents 
name: Deploy Application

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: self-hosted
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Run Ansible Playbook
        run: |
          cd ${{ github.workspace }}
          ansible-playbook -i ansible/inventory.ini ansible/deploy_app.yml -vv
# This workflow does the following when code is pushed to the main branch:

- Uses a self-hosted runner to run the pipeline (assumes a runner is already set up)

- Checks out the code from the repository

- Runs the Ansible playbook to build and deploy the Dockerized Express.js app

```
