import bcryptjs from 'bcryptjs';

// Simulated database for demo purposes
let adminUser = {
  username: 'admin',
  // Default password: 'admin'
  passwordHash: '$2a$10$rQJrY.Zi9Qw0UeqK3YXwi.RbO5hF0RhX3PzW.r7zYaB3hqVZsM1Vy',
  loginAttempts: 0,
  lastLoginAttempt: null,
  lastSuccessfulLogin: null,
  isLocked: false,
  lockUntil: null
};

// Constants
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

class AdminAuthService {
  constructor() {
    this.sessions = new Map();
  }

  async login(username, password) {
    // Check if account is locked
    if (this.isAccountLocked()) {
      const remainingTime = Math.ceil((adminUser.lockUntil - Date.now()) / 1000 / 60);
      throw new Error(`Account is locked. Please try again in ${remainingTime} minutes.`);
    }

    // Validate credentials
    if (username !== adminUser.username) {
      await this.handleFailedLogin();
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcryptjs.compare(password, adminUser.passwordHash);
    if (!isValidPassword) {
      await this.handleFailedLogin();
      throw new Error('Invalid credentials');
    }

    // Reset login attempts on successful login
    adminUser.loginAttempts = 0;
    adminUser.lastSuccessfulLogin = new Date();

    // Generate session token
    const sessionToken = this.generateSessionToken();
    this.sessions.set(sessionToken, {
      username: adminUser.username,
      createdAt: Date.now(),
      lastActivity: Date.now()
    });

    return {
      sessionToken,
      expiresIn: SESSION_TIMEOUT
    };
  }

  async changePassword(currentPassword, newPassword) {
    const isValidPassword = await bcryptjs.compare(currentPassword, adminUser.passwordHash);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const newPasswordHash = await bcryptjs.hash(newPassword, salt);
    adminUser.passwordHash = newPasswordHash;

    return true;
  }

  validateSession(sessionToken) {
    const session = this.sessions.get(sessionToken);
    if (!session) return false;

    // Check if session has expired
    if (Date.now() - session.lastActivity > SESSION_TIMEOUT) {
      this.sessions.delete(sessionToken);
      return false;
    }

    // Update last activity
    session.lastActivity = Date.now();
    return true;
  }

  logout(sessionToken) {
    this.sessions.delete(sessionToken);
  }

  // Private methods
  isAccountLocked() {
    return adminUser.isLocked && adminUser.lockUntil > Date.now();
  }

  async handleFailedLogin() {
    adminUser.loginAttempts += 1;
    adminUser.lastLoginAttempt = new Date();

    if (adminUser.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      adminUser.isLocked = true;
      adminUser.lockUntil = Date.now() + LOCK_TIME;
    }
  }

  generateSessionToken() {
    return Math.random().toString(36).substring(2) +
           Date.now().toString(36) +
           Math.random().toString(36).substring(2);
  }
}

export default new AdminAuthService();