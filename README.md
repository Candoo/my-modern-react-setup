# Thornton Pickard Camera Catalog - Frontend

React 19 frontend application for browsing and managing the Thornton Pickard camera and ephemera collection. Part of the full-stack Thornton Pickard application.

## 🎯 About

This is the user interface for the Thornton Pickard camera catalog, providing an intuitive way to:

- Browse and search historical camera models
- View detailed camera specifications and images
- Filter cameras by manufacturer, year, and format
- Manage user accounts and authentication
- Upload and manage camera images

## 🔗 Related Repositories

This frontend works with:

- **[Thornton-Pickard-Api](https://github.com/Candoo/Thornton-Pickard-Api)** - Backend API
- **[Thornton-Pickard-Deployment](https://github.com/Candoo/Thornton-Pickard-Deployment)** - Full-stack deployment setup

**⚡ Quick Start:** For the easiest setup of the entire application, use the [Thornton Pickard deployment repository](https://github.com/Candoo/Thornton-Pickard-Deployment).

## ✨ Features

- ⚡️ **Vite** for fast builds and hot module replacement
- ⚛️ **React 19** with TypeScript for type safety
- 🔄 **Tanstack Query** for efficient data fetching and caching
- 🎨 **Tailwind CSS** for modern, responsive styling
- 🛡️ **Error Boundaries** for graceful error handling
- 🔍 **Development error overlay** for debugging
- 💅 **Prettier** for consistent code formatting
- 🐳 **Docker support** with nginx for production deployment
- 🔐 **JWT Authentication** integration
- 📱 **Responsive design** for mobile and desktop

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- The backend API running (see [thornton-pickard-api](https://github.com/Candoo/Thornton-Pickard-Api))

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Candoo/my-modern-react-setup.git
   cd my-modern-react-setup
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:

   ```env
   # Backend API URL
   VITE_API_URL=http://localhost:8080
   
   # Optional: Enable debug mode
   VITE_DEBUG=true
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Access the application:**

   Visit `http://localhost:5173` in your browser.

### Development with Backend

To run the frontend with the full backend stack:

1. Start the backend API (see [thornton-pickard-api README](https://github.com/Candoo/Thornton-Pickard-Api))
2. Ensure `VITE_API_URL` in your `.env` points to the API (default: `http://localhost:8080`)
3. Start the frontend development server

The frontend will proxy API requests to the backend automatically.

## 🐳 Docker Deployment

### Building the Docker Image

```bash
# Build the production image
docker build -t thornton-pickard-frontend .

# Run the container
docker run -d -p 3000:80 --name pickard-frontend \
  -e VITE_API_URL=http://localhost:8080 \
  thornton-pickard-frontend
```

Visit `http://localhost:3000`

### Using Docker Compose

For the complete application stack, use the [Thornton Pickard deployment repository](https://github.com/Candoo/Thornton-Pickard-Deployment):

```bash
# Clone the deployment repo
git clone https://github.com/Candoo/Thornton-Pickard-Deployment.git

# Follow the setup instructions in Thornton-Pickard-Deployment/README.md
```

## 📜 Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes
- `npm run lint` - Run ESLint (if configured)

## 🏗️ Project Structure

```
my-modern-react-setup/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ErrorBoundary.tsx
│   │   ├── CameraCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── CameraDetail.tsx
│   │   └── Login.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useCameras.ts
│   ├── services/           # API service layer
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── cameras.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── camera.ts
│   │   └── user.ts
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── docker-compose.yml      # Local Docker Compose (optional)
├── nginx.conf              # Nginx configuration for production
├── .dockerignore
├── .gitignore
├── .prettierrc             # Prettier configuration
├── eslint.config.js        # ESLint configuration
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md
```

## 🔌 API Integration

The frontend communicates with the backend API using Tanstack Query for efficient data management.

### Environment Variables

- `VITE_API_URL` - Backend API base URL (default: `http://localhost:8080`)

### Example API Usage

```typescript
// src/services/cameras.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCameras = async (params) => {
  const response = await api.get('/api/v1/cameras', { params });
  return response.data;
};
```

### Authentication

The app uses JWT tokens stored in localStorage:

```typescript
// Token is automatically included in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling:

- Utility-first CSS framework
- Responsive design out of the box
- Custom configuration in `tailwind.config.js`
- Global styles in `src/index.css`

### Customizing Theme

Edit `tailwind.config.js` to customize colors, spacing, fonts, etc.:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        'pickard-blue': '#1e40af',
        'pickard-gold': '#f59e0b',
      },
    },
  },
};
```

## 🛡️ Error Handling

### Development Mode

- Vite's dev overlay shows syntax and compile errors
- Runtime render errors are caught by Error Boundary
- Test with the "Trigger Render Error" button (if available)

### Production Mode

- Error Boundary displays user-friendly error messages
- Prevents full application crashes
- Errors are logged to console for debugging

Test production error handling:

```bash
npm run build
npm run preview
```

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

## 🚢 Deployment

### Production Build

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Deployment Options

This application can be deployed to:

- **Static Hosting:** Vercel, Netlify, GitHub Pages
- **Docker:** AWS ECS, Google Cloud Run, Azure Container Instances
- **Traditional:** Any web server with nginx/Apache
- **CDN:** Cloudflare Pages, AWS CloudFront

### Environment Variables for Production

Set these in your deployment platform:

```env
VITE_API_URL=https://api.yourdomain.com
```

**Note:** Vite only includes environment variables prefixed with `VITE_` in the build.

## 🔐 Security Considerations

- Never commit `.env` files with secrets
- API tokens are stored in localStorage (consider httpOnly cookies for production)
- Implement HTTPS in production
- Configure CORS properly on the backend
- Validate and sanitize all user inputs
- Keep dependencies updated

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3001
```

### API Connection Errors

1. Verify backend API is running: `curl http://localhost:8080/health`
2. Check `VITE_API_URL` in `.env`
3. Ensure CORS is configured on backend
4. Check browser console for specific errors

### Build Failures

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

## 📦 Technology Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 5
- **Language:** TypeScript 5
- **Data Fetching:** Tanstack Query (React Query)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Code Formatting:** Prettier
- **Linting:** ESLint
- **Web Server (Production):** Nginx
- **Containerization:** Docker

### Code Style

- Follow TypeScript best practices
- Use functional components and hooks
- Format code with Prettier before committing
- Write meaningful commit messages

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Related Links

- [Backend API Repository](https://github.com/Candoo/Thornton-Pickard-Api)
- [Deployment Repository](https://github.com/Candoo/Thornton-Pickard-Deployment)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Tanstack Query Documentation](https://tanstack.com/query)

---

**Built with React ⚛️ for the Thornton Pickard camera community**
