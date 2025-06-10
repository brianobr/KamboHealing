# Azure App Service Framework Compatibility Guide

## Node.js Frameworks

| Framework | Compatibility | Deployment Method | Notes | Common Issues |
|-----------|---------------|-------------------|-------|---------------|
| **Express.js** | ✅ Excellent | Direct/Container | Native support, mature ecosystem | Port binding (use 0.0.0.0) |
| **Next.js** | ✅ Excellent | Static/SSR/Container | Built-in Azure support, optimized builds | Config for standalone output |
| **Nuxt.js** | ✅ Good | SSR/Static/Container | Works well with proper config | Memory usage in SSR mode |
| **React (Vite)** | ✅ Excellent | Static + API | Fast builds, good performance | Build output path configuration |
| **React (CRA)** | ✅ Good | Static + API | Reliable but slower builds | Large bundle sizes |
| **Vue.js** | ✅ Excellent | Static/SSR | Lightweight, fast deployment | Router history mode config |
| **Angular** | ✅ Good | Static + API | Enterprise ready | Large bundle, slow cold starts |
| **Svelte/SvelteKit** | ✅ Good | Static/SSR | Small bundles, fast performance | Less Azure-specific documentation |
| **Fastify** | ✅ Excellent | Direct/Container | High performance, good for APIs | Plugin compatibility |
| **Koa.js** | ✅ Good | Direct/Container | Minimal, flexible | Middleware setup complexity |
| **NestJS** | ✅ Good | Direct/Container | Enterprise features | Startup time, memory usage |

## Python Frameworks

| Framework | Compatibility | Deployment Method | Notes | Common Issues |
|-----------|---------------|-------------------|-------|---------------|
| **Flask** | ✅ Excellent | Direct/Container | Simple, well-documented | WSGI server configuration |
| **Django** | ✅ Excellent | Direct/Container | Mature, full-featured | Static files serving |
| **FastAPI** | ✅ Excellent | Container/Direct | Modern, fast, auto-docs | ASGI server setup |
| **Pyramid** | ✅ Good | Direct/Container | Flexible, scalable | Less common, setup complexity |
| **Tornado** | ✅ Good | Container | Async, real-time apps | WebSocket configuration |
| **Bottle** | ✅ Good | Direct | Minimal, single file | Limited features |

## .NET Frameworks

| Framework | Compatibility | Deployment Method | Notes | Common Issues |
|-----------|---------------|-------------------|-------|---------------|
| **ASP.NET Core** | ✅ Excellent | Direct | Native Azure integration | Version compatibility |
| **ASP.NET MVC** | ✅ Excellent | Direct | Mature, enterprise ready | Legacy dependency issues |
| **Blazor** | ✅ Excellent | Direct/Static | Modern SPA framework | SignalR configuration |
| **Web API** | ✅ Excellent | Direct | REST API focused | CORS configuration |

## Java Frameworks

| Framework | Compatibility | Deployment Method | Notes | Common Issues |
|-----------|---------------|-------------------|-------|---------------|
| **Spring Boot** | ✅ Excellent | Container/Direct | Enterprise grade | Memory configuration |
| **Spring MVC** | ✅ Good | Container | Traditional web apps | Complex configuration |
| **Quarkus** | ✅ Good | Container | Cloud-native, fast startup | Limited Azure docs |
| **Micronaut** | ✅ Good | Container | Low memory, fast startup | Newer framework |

## PHP Frameworks

| Framework | Compatibility | Deployment Method | Notes | Common Issues |
|-----------|---------------|-------------------|-------|---------------|
| **Laravel** | ✅ Excellent | Direct | Rich ecosystem | File permissions, cache |
| **Symfony** | ✅ Excellent | Direct | Enterprise features | Complex routing |
| **CodeIgniter** | ✅ Good | Direct | Lightweight, simple | Limited modern features |
| **WordPress** | ✅ Excellent | Direct | CMS platform | Database configuration |

## Ruby Frameworks

| Framework | Compatibility | Deployment Method | Notes | Common Issues |
|-----------|---------------|-------------------|-------|---------------|
| **Ruby on Rails** | ⚠️ Limited | Container | Works but complex setup | Asset pipeline, dependencies |
| **Sinatra** | ✅ Good | Container | Minimal, flexible | Ruby version management |

## Go Frameworks

| Framework | Compatibility | Deployment Method | Notes | Common Issues |
|-----------|---------------|-------------------|-------|---------------|
| **Gin** | ✅ Excellent | Container/Direct | Fast, minimal | Static file serving |
| **Echo** | ✅ Excellent | Container | High performance | Middleware configuration |
| **Fiber** | ✅ Good | Container | Express-like API | Less mature ecosystem |

## Problematic Frameworks

| Framework | Issues | Workaround |
|-----------|--------|------------|
| **Deno** | ❌ Limited runtime support | Use containers |
| **Bun** | ❌ No native support | Use containers |
| **Electron** | ❌ Desktop app framework | Not applicable |
| **React Native** | ❌ Mobile framework | Not applicable |

## Deployment Best Practices by Type

### Static Sites (React, Vue, Angular)
- ✅ Use Azure Static Web Apps for best performance
- ✅ Configure SPA routing properly
- ✅ Optimize build output

### API-Only Applications
- ✅ Use Azure App Service with Linux containers
- ✅ Configure health checks
- ✅ Set proper environment variables

### Full-Stack Applications
- ✅ Separate frontend and backend deployments
- ✅ Use Azure Container Registry for custom images
- ✅ Configure proper startup commands

### Real-time Applications
- ✅ Use Azure SignalR Service
- ✅ Configure WebSocket support
- ✅ Test connection scaling

## Key Success Factors

1. **Port Configuration**: Always bind to `0.0.0.0` and use `process.env.PORT`
2. **Build Process**: Ensure builds are reproducible and fast
3. **Startup Time**: Keep cold start times under 30 seconds
4. **Health Checks**: Implement proper health endpoints
5. **Logging**: Use structured logging for debugging
6. **Static Assets**: Serve static files efficiently
7. **Environment Variables**: Use Azure App Settings for configuration

## Troubleshooting Common Issues

| Issue | Solution |
|-------|----------|
| Deployment timeout | Check startup commands, reduce build complexity |
| Port binding errors | Use `0.0.0.0:${PORT}` instead of `localhost` |
| Static files not served | Configure proper static file paths |
| Memory issues | Optimize dependencies, use appropriate pricing tier |
| Slow cold starts | Minimize startup operations, use warm-up requests |