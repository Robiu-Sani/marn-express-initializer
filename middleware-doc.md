# 🛠️ Complete Error Handling & Validation Documentation

## 📋 Table of Contents
1. [Global Error Handler](#global-error-handler)
2. [404 Not Found Handler](#404-not-found-handler)
3. [Request Validation Middleware](#request-validation-middleware)
4. [Usage Examples](#usage-examples)
5. [Integration Guide](#integration-guide)

---

## 1. Global Error Handler

### Purpose
Catches all errors from your application and sends consistent, formatted error responses.

### How It Works

**Step 1:** Receives any error thrown in your app  
**Step 2:** Extracts status code (default 500) and message (default "Something went wrong!")  
**Step 3:** Sends formatted JSON response  
**Step 4:** Shows error stack trace only in development environment

### Error Response Format

```json
{
  "success": false,
  "message": "Error message here",
  "error": { /* full error object */ },
  "stack": "stack trace (development only) or null (production)"
}
```

### When It Triggers

| Scenario | Status Code |
|----------|-------------|
| Database connection fails | 500 |
| Duplicate key error | 500 |
| Validation error from Zod | 400 |
| Custom ApiError thrown | Your custom code |
| Any uncaught exception | 500 |

---

## 2. 404 Not Found Handler

### Purpose
Handles requests to endpoints that don't exist in your application.

### How It Works

**Step 1:** Catches any request that reaches this middleware  
**Step 2:** Returns 404 status with details about the invalid path  
**Step 3:** Informs the client which URL they tried to access

### Response Format

```json
{
  "success": false,
  "message": "API Not Found",
  "error": "The requested path '/invalid/url' does not exist on this server."
}
```

### When It Triggers
- User visits `/api/wrong-endpoint` that doesn't exist
- Typo in API URL
- Deleted or renamed endpoint

---

## 3. Request Validation Middleware

### Purpose
Validates incoming request data (body, query, params, cookies) against Zod schemas before reaching your route handlers.

### How It Works

**Step 1:** Receives a Zod validation schema  
**Step 2:** Parses request body, query, params, and cookies against the schema  
**Step 3:** If valid → proceeds to next middleware  
**Step 4:** If invalid → throws validation error (caught by global error handler)

### What It Validates

| Property | Description |
|----------|-------------|
| `req.body` | POST/PUT request data |
| `req.query` | URL query parameters |
| `req.params` | Route parameters |
| `req.cookies` | Cookie data |

---

## 📚 Usage Examples

### Example 1: Global Setup in App

```typescript
// app.ts or server.ts
import express from 'express';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';

const app = express();

// Your routes here
app.use('/api', authRoutes, userRoutes, productRoutes);

// ⚠️ IMPORTANT: Error handlers go AFTER all routes
app.use(globalErrorHandler);  // Catches all errors
app.use(notFound);            // Catches 404s
```

### Example 2: Validation in Routes

```typescript
// user.routes.ts
import { Router } from 'express';
import { z } from 'zod';
import validateRequest from '../middleware/validateRequest';
import { UserController } from './user.controller';

const router = Router();

// Define validation schema
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['admin', 'user', 'manager']).optional()
  })
});

// Apply validation before controller
router.post(
  '/users',
  validateRequest(createUserSchema),
  UserController.createUser
);

// Validate query params
const getUsersSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(Number),
    limit: z.string().optional().transform(Number),
    role: z.enum(['admin', 'user']).optional()
  })
});

router.get(
  '/users',
  validateRequest(getUsersSchema),
  UserController.getUsers
);

// Validate route params
const userIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format')
  })
});

router.get(
  '/users/:id',
  validateRequest(userIdSchema),
  UserController.getUserById
);
```

### Example 3: Combined Validation

```typescript
// Validate everything at once
const updateUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User ID required')
  }),
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional()
  }),
  query: z.object({
    fields: z.string().optional()
  })
});

router.patch(
  '/users/:id',
  validateRequest(updateUserSchema),
  UserController.updateUser
);
```

### Example 4: Custom Error in Controller

```typescript
// user.controller.ts
import { Request, Response } from 'express';
import { ApiError } from '../utils/apiError';
import httpStatus from 'http-status';

export const UserController = {
  createUser: async (req: Request, res: Response) => {
    // If something goes wrong, throw error
    const existingUser = await User.findOne({ email: req.body.email });
    
    if (existingUser) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'User with this email already exists'
      );
    }
    
    const user = await User.create(req.body);
    
    res.status(201).json({
      success: true,
      data: user
    });
  }
};
```

---

## 🔗 Integration Guide

### Complete Setup Example

```typescript
// server.ts
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import { AuthRouter } from './routes/auth.routes';
import { UserRouter } from './routes/user.routes';

const app = express();

// 1. Global middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// 2. Routes
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);

// 3. Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 4. Error handlers (LAST!)
app.use(globalErrorHandler);  // Handles all errors
app.use(notFound);            // Handles 404s

export default app;
```

### Middleware Order Matters!

```typescript
// ✅ CORRECT ORDER
app.use(express.json());           // 1. Body parser
app.use(cookieParser());           // 2. Cookie parser
app.use('/api', routes);           // 3. Routes
app.use(globalErrorHandler);       // 4. Error handler
app.use(notFound);                 // 5. 404 handler

// ❌ WRONG ORDER (404 will trigger before routes)
app.use(notFound);                 // This catches everything!
app.use('/api', routes);           // Routes never reached
app.use(globalErrorHandler);
```

---

## 🎯 Common Use Cases

### Use Case 1: Login Validation

```typescript
const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password required')
  })
});

router.post('/login', validateRequest(loginSchema), AuthController.login);
```

### Use Case 2: Pagination Validation

```typescript
const paginationSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).default('1'),
    limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
    sortBy: z.string().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
  })
});

router.get('/products', validateRequest(paginationSchema), ProductController.getAll);
```

### Use Case 3: File Upload Validation

```typescript
const uploadSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().max(500).optional()
  }),
  query: z.object({
    folder: z.string().optional()
  })
});

router.post('/upload', validateRequest(uploadSchema), UploadController.uploadFile);
```

---

## ⚠️ Important Notes

### Global Error Handler
- Must be the **last** middleware in your app
- Catches errors from async routes when using `catchAsync`
- Hides stack traces in production for security

### 404 Handler
- Must come **after** all routes and error handler
- Only triggers when no route matches the request
- Helps API consumers identify typos

### Validation Middleware
- Always use with `catchAsync` to catch validation errors
- Validates BEFORE your controller logic
- Throws Zod errors automatically
- Can validate body, query, params, and cookies together

---

## 🚨 Error Response Examples

### Validation Error (Zod)
```json
{
  "success": false,
  "message": "Validation error",
  "error": {
    "issues": [
      {
        "code": "too_small",
        "minimum": 3,
        "type": "string",
        "path": ["body", "name"],
        "message": "Name must be at least 3 characters"
      }
    ]
  }
}
```

### Custom ApiError
```json
{
  "success": false,
  "message": "User with this email already exists",
  "error": {
    "statusCode": 409,
    "message": "User with this email already exists"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "API Not Found",
  "error": "The requested path '/api/wrong-url' does not exist on this server."
}
```

---

## ✅ Summary

| Middleware | Purpose | Position in App |
|------------|---------|-----------------|
| `validateRequest` | Validates incoming data | Before route handlers |
| `globalErrorHandler` | Catches all errors | After all routes |
| `notFound` | Handles invalid URLs | Last middleware |

These three middleware functions work together to provide:
- **Clean validation** before processing requests
- **Consistent error responses** across your API
- **Helpful 404 messages** for API consumers
- **Security** by hiding stack traces in production


