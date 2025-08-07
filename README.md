
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
