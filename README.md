# Supply Locator System

A web-based supply locator system for managing and finding relief centers and supplies. This system provides separate interfaces for users and administrators.

## Features

### User Interface
- **Sign Up & Login**: Users can create accounts with name, phone number, address, ID, and password
- **SMS Permission**: Request permission for SMS notifications about relief centers
- **Offline Map**: Download offline maps for accessing relief center locations without internet
- **Quick Actions**: Search supplies, view relief centers, and manage profile

### Admin Interface
- **Sign Up & Login**: Administrators can create accounts with name, phone number, address, ID, and password
- **Relief Center Management**: Add and manage relief centers with:
  - Relief center name
  - Location address
  - Supply type (Food & Water, Medical Supplies, Shelter & Clothing, Hygiene Products, Tools & Equipment, Other)
  - Status (Available, Limited Stock, Unavailable, Closed)
- **View Centers**: See all added relief centers in a list

## How to Use

1. **Open the Application**: Open `index.html` in a web browser
2. **Choose Access Type**: Select either "User Access" or "Admin Access"
3. **Sign Up or Login**: 
   - New users/admins: Click "Sign Up" and fill in the required information
   - Existing users/admins: Click "Login" and enter your credentials
4. **User Dashboard**: After login, users can:
   - Enable SMS notifications
   - Download offline maps
   - Access quick actions
5. **Admin Dashboard**: After login, admins can:
   - Add new relief centers
   - View all relief centers
   - Manage supply information

## Technical Details

- **Storage**: Uses browser's LocalStorage for data persistence
- **Session Management**: Uses SessionStorage for active user/admin sessions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## File Structure

```
miniproject/
├── index.html              # Landing page
├── user-login.html         # User login/signup page
├── admin-login.html        # Admin login/signup page
├── user-dashboard.html     # User dashboard
├── admin-dashboard.html    # Admin dashboard
├── styles.css              # All styling
├── script.js               # All JavaScript functionality
└── README.md               # This file
```

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Notes

- All data is stored locally in the browser
- No backend server required
- Perfect for offline use after initial setup
- Data persists across browser sessions

