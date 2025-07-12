# StackNotes

StackNotes is a MERN (MongoDB, Express, React, Node.js) stack application designed for managing notes. The project is containerized using Docker and includes both backend and frontend services.

## Project Structure

```
StackNotes/
├── docker-compose.yml
├── BACKEND/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── types/
│       └── views/
│   
├── FRONTEND/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── config/
│   │   └── types/
│   └── public/
```

## Prerequisites

- Docker and Docker Compose installed on your system.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:davidlihor/StackNotes.git
   cd StackNotes
   ```

2. Create `.env` files for both backend and frontend services.

### Backend `.env` File

Create a `.env` file in the `BACKEND/` directory with the following content:

```
NODE_ENVIRONMENT=Development
DATABASE_URI=mongodb://root:mongopw@mongodb:27017
ACCESS_TOKEN_SECRET=<your-access-token-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend `.env` File

Create a `.env` file in the `FRONTEND/` directory with the following content:

```
VITE_API_URL=http://localhost:3500
```

3. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3500](http://localhost:3500)

## Services

### Backend
- **Framework**: Node.js with Express
- **Database**: MongoDB
- **Features**:
  - Authentication and Authorization
  - CRUD operations for notes and users

### Frontend
- **Framework**: React with Vite
- **Features**:
  - User authentication
  - Note management
  - Role-based access control

## Docker Configuration

The project uses Docker Compose to manage services:

- **Backend**: Runs on port `3500`
- **Frontend**: Runs on port `3000`
- **MongoDB**: Runs on port `27017`

## Volumes

- `backendLogs`: Stores backend logs.
- `mongodbData`: Stores MongoDB data.

## Networks

- `public`: Shared network for frontend and backend.
- `private`: Isolated network for backend and MongoDB.

## Notes

- Replace `<your-access-token-secret>` and `<your-refresh-token-secret>` in the backend `.env` file with secure values.
- Ensure that the `.env` files are not committed to version control.

## License

This project is licensed under the MIT License.
