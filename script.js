// Tab switching functionality
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        tabs[1].classList.add('active');
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// User Signup
function handleUserSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        id: formData.get('id'),
        password: formData.get('password'),
        type: 'user'
    };

    // Check if user ID already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find(u => u.id === userData.id)) {
        alert('User ID already exists. Please choose a different ID.');
        return;
    }

    // Save user data
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Sign up successful! Please login.');
    switchTab('login');
    event.target.reset();
}

// User Login
function handleUserLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const password = formData.get('password');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === id && u.password === password && u.type === 'user');

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'user-dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Admin Signup
function handleAdminSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const adminData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        id: formData.get('id'),
        password: formData.get('password'),
        type: 'admin'
    };

    // Check if admin ID already exists
    const existingAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
    if (existingAdmins.find(a => a.id === adminData.id)) {
        alert('Admin ID already exists. Please choose a different ID.');
        return;
    }

    // Save admin data
    existingAdmins.push(adminData);
    localStorage.setItem('admins', JSON.stringify(existingAdmins));

    alert('Sign up successful! Please login.');
    switchTab('login');
    event.target.reset();
}

// Admin Login
function handleAdminLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const password = formData.get('password');

    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const admin = admins.find(a => a.id === id && a.password === password && a.type === 'admin');

    if (admin) {
        sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
        window.location.href = 'admin-dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Logout
function logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentAdmin');
    window.location.href = 'index.html';
}

// User Dashboard Functions
window.addEventListener('DOMContentLoaded', function() {
    // Load user name if on user dashboard
    if (window.location.pathname.includes('user-dashboard')) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            window.location.href = 'user-login.html';
            return;
        }
        document.getElementById('userName').textContent = currentUser.name;
        
        // Check SMS permission status
        const smsPermission = localStorage.getItem('smsPermission_' + currentUser.id);
        if (smsPermission === 'granted') {
            document.getElementById('smsStatus').textContent = '✓ SMS notifications enabled';
            document.getElementById('smsStatus').classList.add('success');
        }
    }

    // Load admin dashboard data
    if (window.location.pathname.includes('admin-dashboard')) {
        const currentAdmin = JSON.parse(sessionStorage.getItem('currentAdmin') || 'null');
        if (!currentAdmin) {
            window.location.href = 'admin-login.html';
            return;
        }
        loadReliefCenters();
    }
});

// Request SMS Permission
function requestSMSPermission() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;

    // Simulate SMS permission request
    const granted = confirm('Allow SMS notifications to receive updates about relief centers and supplies?');
    
    if (granted) {
        localStorage.setItem('smsPermission_' + currentUser.id, 'granted');
        document.getElementById('smsStatus').textContent = '✓ SMS notifications enabled';
        document.getElementById('smsStatus').classList.add('success');
        alert('SMS notifications enabled successfully!');
    } else {
        alert('SMS notifications permission denied. You can enable it later from settings.');
    }
}

// Download Map
function downloadMap() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;

    // Simulate map download
    const downloadStatus = document.getElementById('mapStatus');
    downloadStatus.textContent = 'Downloading map...';
    downloadStatus.classList.remove('success');

    setTimeout(() => {
        downloadStatus.textContent = '✓ Offline map downloaded successfully!';
        downloadStatus.classList.add('success');
        localStorage.setItem('mapDownloaded_' + currentUser.id, 'true');
        alert('Offline map downloaded successfully! You can now access relief center locations without internet.');
    }, 2000);
}

// View Map
function viewMap() {
    alert('Opening online map...\n\nNote: This would integrate with a mapping service like Google Maps or OpenStreetMap to show relief center locations.');
    // In a real implementation, this would open a map interface
}

// Search Supplies
function searchSupplies() {
    alert('Search Supplies feature would open a search interface to find available supplies near your location.');
}

// View Relief Centers
function viewReliefCenters() {
    alert('Relief Centers feature would show a list of all relief centers with their locations and available supplies.');
}

// View Profile
function viewProfile() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        alert(`Profile Information:\n\nName: ${currentUser.name}\nPhone: ${currentUser.phone}\nAddress: ${currentUser.address}\nUser ID: ${currentUser.id}`);
    }
}

// Handle Relief Center Submit
function handleReliefCenterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const centerData = {
        id: Date.now().toString(),
        centerName: formData.get('centerName'),
        locationAddress: formData.get('locationAddress'),
        supplyType: formData.get('supplyType'),
        status: formData.get('status'),
        createdAt: new Date().toISOString()
    };

    // Save relief center
    const centers = JSON.parse(localStorage.getItem('reliefCenters') || '[]');
    centers.push(centerData);
    localStorage.setItem('reliefCenters', JSON.stringify(centers));

    alert('Relief center saved successfully!');
    event.target.reset();
    loadReliefCenters();
}

// Load Relief Centers
function loadReliefCenters() {
    const centers = JSON.parse(localStorage.getItem('reliefCenters') || '[]');
    const centersList = document.getElementById('centersList');
    
    if (centers.length === 0) {
        centersList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">No relief centers added yet. Add one using the form above.</p>';
        return;
    }

    centersList.innerHTML = centers.map(center => `
        <div class="center-item">
            <h3>${center.centerName}</h3>
            <p><strong>Location:</strong> ${center.locationAddress}</p>
            <div class="center-meta">
                <span class="supply-type">${getSupplyTypeLabel(center.supplyType)}</span>
                <span class="status-${center.status}">${getStatusLabel(center.status)}</span>
            </div>
        </div>
    `).reverse().join('');
}

// Get Supply Type Label
function getSupplyTypeLabel(type) {
    const labels = {
        'food': 'Food & Water',
        'medical': 'Medical Supplies',
        'shelter': 'Shelter & Clothing',
        'hygiene': 'Hygiene Products',
        'tools': 'Tools & Equipment',
        'other': 'Other'
    };
    return labels[type] || type;
}

// Get Status Label
function getStatusLabel(status) {
    const labels = {
        'available': 'Available',
        'limited': 'Limited Stock',
        'unavailable': 'Unavailable',
        'closed': 'Closed'
    };
    return labels[status] || status;
}

