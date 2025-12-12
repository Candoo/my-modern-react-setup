# My Modern React Setup

⚡️ Vite + React 19 + TypeScript

## Features

- ⚡️ Vite for fast builds and HMR
- ⚛️ React 19 with TypeScript
- 🔄 Tanstack Query for data fetching
- 🎨 CSS Modules + Tailwind CSS
- 🛡️ Error Boundaries for production error handling
- 🔍 Dev error overlay for development
- 💅 Prettier for code formatting
- 🐳 Docker support with nginx

## Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173`

### Docker Deployment

#### Using Docker
```bash
# Build the image
docker build -t my-react-app .

# Run the container
docker run -d -p 3000:80 --name my-react-app my-react-app
```

Visit `http://localhost:3000`

#### Using Docker Compose (Recommended)
```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Docker Commands
```bash
# Stop container
docker stop my-react-app

# Start container
docker start my-react-app

# Remove container
docker rm my-react-app

# View logs
docker logs my-react-app

# Access container shell
docker exec -it my-react-app sh
```

## Project Structure
```
.
├── src/
│   ├── components/
│   │   └── ErrorBoundary.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .dockerignore
├── .gitignore
├── .prettierrc
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Error Handling

### Development
- Syntax/compile errors show Vite's dev overlay
- Runtime render errors caught by Error Boundary
- Test error handling with the "Trigger Render Error" button

### Production
- Error Boundary displays user-friendly error UI
- Prevents full application crashes
- Test with: `npm run build && npm run preview`

## Deployment

The application is containerized and ready for deployment to:
- Docker Swarm
- Kubernetes
- AWS ECS
- Azure Container Instances
- Google Cloud Run
- Any container platform

## Technology Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Data Fetching:** Tanstack Query
- **Styling:** CSS Modules + Tailwind CSS
- **Code Formatting:** Prettier
- **Web Server:** Nginx (production)
- **Container:** Docker

## License

MIT