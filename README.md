# Directory Tree App

A web-based directory tree explorer built with React and Express.js.

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000/api
```

### Option 2: Development Mode

```bash
# Install dependencies
cd server && npm install
cd client && npm install

# Start backend
cd server && npm start

# Start frontend (in new terminal)
cd client && npm start
```

## 📁 Project Structure

```
directory-tree/
├── client/                    # React frontend
│   ├── src/                  # Source code
│   ├── Dockerfile            # Frontend container
│   └── .dockerignore         # Docker exclusions
├── server/                   # Express.js backend
│   ├── controllers/          # API controllers
│   ├── data/                 # Static directory data
│   ├── helpers/              # Utility functions
│   ├── middleware/           # Express middleware
│   ├── routes/               # API routes
│   ├── Dockerfile            # Backend container
│   └── .dockerignore         # Docker exclusions
├── docker-compose.yml        # Docker orchestration
└── README.md                 # This file
```

## 🎯 Features

- **Directory Tree Visualization** - Interactive tree view
- **Expandable/Collapsible** - Click to expand directories
- **Navigation** - Double-click to navigate into directories
- **Address Bar** - Direct path input and navigation
- **Home Button** - Quick return to root directory
- **Lazy Loading** - Load directory contents on demand
- **Responsive Design** - Works on different screen sizes

## 🛠 Tech Stack

- **Frontend**: React.js, React Router DOM
- **Backend**: Express.js, Node.js
- **Containerization**: Docker, Docker Compose
- **Styling**: CSS3 with modern design

## 🔧 Configuration

### Ports

- **Frontend**: 3000
- **Backend**: 4000

### Environment Variables

- `REACT_APP_API_BASE_URL`: API base URL (configured in Docker)

## 🐳 Docker Commands

```bash
# Start application
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs

# Stop services
docker-compose down
```
