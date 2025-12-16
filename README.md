# Изпитник (Orthodox Church Calendar Flashcard Application)

A full-stack flashcard learning application built with React and Django REST Framework. The application integrates with an automated Orthodox church calendar engine to organize and display liturgical content by date. Deployed at [https://www.рождествен.ник.com/](https://www.рождествен.ник.com/)

## Technologies Used

### Frontend
- **React** - UI library
- **React Router** - Client-side routing with protected routes
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS** - Custom styling with animations

### Backend
- **Django** - Web framework
- **Django REST Framework** - RESTful API
- **Django Authentication** - User management and session handling
- **Orthodox Calendar Engine** - Automated calculation of dynamic church holidays and dates

## Features

### Dynamic Orthodox Calendar Integration
- Automated calculation of Orthodox holidays and liturgical dates
- Date-based article organization following the church calendar
- Calendar view for browsing liturgical content by date

### User Management
- User registration and authentication
- Profile management (view, edit, delete)
- User profiles for viewing other users
- Session-based authentication with CSRF protection

### Articles (Flashcards)
- Create, read, update, and delete flashcards
- Browse all articles or filter by date
- Personal article management
- Favorite articles functionality
- Today's liturgical content on homepage

### Backend-Driven UI
- **Navigation**: Main navigation items loaded dynamically from backend
- **Theming**: Background colors, fonts, and styling provided by backend API
- **Header Images**: Header images configured via backend
- **Important**: Without backend connection, navigation will not load

### Protected Routes
Routes are configured with `auth_required` flag to restrict access to authenticated users only.

## React Functionalities

- **Component-based architecture** - Modular, reusable components
- **React Router configuration** - Centralized route management in `src/routes/config.jsx`
- **Nested routing** - Base layout with nested child routes
- **Protected routes** - Authentication-required routes with automatic redirect
- **Dynamic UI loading** - Navigation and theme loaded from backend on mount
- **In-memory token storage** - Access tokens stored in memory for security

## API Endpoints

### Configuration & Calendar
- `GET /api/config/` - Get navigation items, theme settings, and UI configuration
- `GET /api/calendar/` - Get Orthodox calendar dates and holidays
- `GET /api/calendar/:date/` - Get specific date liturgical information

### Authentication
- `POST /api/register/` - User registration (CSRF protected)
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout

### Articles
- `GET /api/articles/` - List all articles (with optional date/favorites filters)
- `GET /api/articles/:id/` - Get specific article
- `POST /api/articles/` - Create new article
- `PUT/PATCH /api/articles/:id/` - Update article
- `DELETE /api/articles/:id/` - Delete article

### User Profile
- `GET /api/profile/` - Get current user profile
- `GET /api/users/:id/` - Get specific user profile
- `PUT/PATCH /api/profile/` - Update profile
- `DELETE /api/profile/` - Delete account

## API Usage

### Authentication Required
Include credentials in requests for authenticated endpoints. The application uses session-based authentication with CSRF tokens.

### CSRF Protection
For state-changing requests (POST, PUT, DELETE), include the CSRF token:
- Get token from cookie or Django endpoint
- Include in request headers: `X-CSRFToken: <token>`

### Example Request

```javascript
fetch('/api/articles/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCsrfToken()
  },
  credentials: 'include',
  body: JSON.stringify({ 
    title: 'Liturgical Note', 
    content: 'Content for today',
    date: '2025-12-12'
  })
})
```

## Architecture Notes

### Backend Dependency
The application **requires an active backend connection** to function properly:
- Navigation menu loads from backend API
- Theme and styling configuration provided by backend
- Header images served from backend
- Calendar data computed by backend engine

Without backend connectivity, the application will display minimal UI with no navigation.

### Orthodox Calendar Engine
The backend includes an automated engine that:
- Calculates movable feasts (Easter, Pentecost, etc.)
- Provides liturgical calendar data
- Organizes content by church calendar dates
- Supports both Julian and Gregorian calendar systems

## Deployment

**Production URL**: [https://www.рождествен.ник.com/](https://www.рождествен.ник.com/)

The domain uses Cyrillic characters (IDN - Internationalized Domain Name).

## Setup

1. Install frontend dependencies: `npm install`
2. Install backend dependencies: `pip install -r requirements.txt`
3. Configure Django settings for CORS, CSRF, and calendar engine
4. Run migrations: `python manage.py migrate`
5. Run Django server: `python manage.py runserver`
6. Run React dev server: `npm start`
