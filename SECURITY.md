# Security Policy

## 🔐 Overview

MITPA is committed to protecting its users, systems, and data. This API powers critical infrastructure such as user management, study tracking, and Discord integration. We take security seriously and appreciate responsible disclosure.

All endpoints are designed with **user privacy**, **data integrity**, and **system resilience** in mind. Unauthorized or malicious usage is strictly prohibited and will be blocked automatically.

---

## ✅ Current Security Measures

### 1. **CORS Protection**
- CORS is enabled and **strictly restricted** to **authorized MITPA domains**.
- Unauthorized browser requests from unknown origins are **automatically blocked**.

### 2. **Verification System**
- Emails are used to validate user identity.
- Verification codes are generated and validated using secure, temporary in-memory storage or Redis.
- Limited verification attempts per user/IP should be enforced (recommended: 3–5 max).

### 3. **Input Sanitization**
- All input data (query, body, params) should be validated and sanitized to prevent XSS, SQL/NoSQL injection, and other attacks.

### 4. **Token and Secrets Handling**
- All environment variables (tokens, credentials, and secret keys) must be kept in a `.env` file and **never committed to the repository**.
- Recommended: Rotate credentials regularly and apply least privilege principle.

### 5. **HTTPS Only**
- All production instances of the MITPA API must use **HTTPS** to encrypt traffic.

---

## 🧪 Secure Development Guidelines

- Use libraries like `helmet` for secure HTTP headers.
- Keep all dependencies up to date.
- Avoid use of `alert()` or insecure front-end practices — prefer toast notifications for feedback.
- Ensure centralized and responsive design to minimize exposure to layout manipulation attacks.

---

## 🤝 Reporting Vulnerabilities

If you discover a vulnerability or security issue in the MITPA API or related services:

1. Please **do not open a public GitHub issue**.
2. Instead, contact us **privately and responsibly** via:
📧 security@mitpa.tech

We will acknowledge your report within 48 hours and work with you to resolve the issue promptly.

---

## 🔒 Areas of High Priority

- Authentication & verification logic.
- Email handling endpoints.
- User data storage and access controls.
- Discord integration (tokens, rate limits, image sharing).

---

## 🛠️ Future Improvements

- Implementing **OAuth2 or MITPA SSO** for seamless authentication.
- Adding **logging and monitoring** for suspicious activity.
- Transitioning to a **zero-trust architecture** with permission scopes.
- Encrypting all sensitive user data at rest.

---

Thank you for helping make MITPA a safer and more reliable open-source ecosystem.
