# PRACTA API

Welcome to the PRACTA API! This API provides functionalities for managing users, rankings, study results, and integration with Discord.

> 🔐 **CORS (Cross-Origin Resource Sharing) is ENABLED in this API.**
>
> ❗ **Only official and authorized PRACTA websites are allowed to make requests to the API endpoints.**
>
> 🚫 Requests made directly from browsers on unauthorized domains will be **automatically blocked**.
>
> 🛡️ This ensures user data security and system integrity.

## Endpoints

### 1. **/share-result**
- **Method:** `POST`
- **Description:** Sends an image and a message to a Discord channel.
- **Parameters:**
    - `userId` (required): User ID.
    - `message` (optional): Message to be sent.
    - `image` (required): Image file.
- **Usage example:**
  ```bash
  curl -X POST -F "userId=123" -F "image=@path/to/image.jpg" http://api.practa.tech/share-result
  ```

### 2. **/ranking**
- **Method:** `GET`
- **Description:** Returns the user ranking based on accumulated points.
- **Usage example:**
  ```bash
  curl http://api.practa.tech/ranking
  ```

### 3. **/user-email**
- **Methods:**
    - `GET /user-email/:userId`: Returns the user's email.
    - `POST /user-email`: Adds or updates the user's email.
- **Parameters:**
    - `userId` (required): User ID.
    - `email` (required for POST): User email.
- **Usage example:**
  ```bash
  curl http://api.practa.tech/user-email/123
  curl -X POST -H "Content-Type: application/json" -d '{"userId": "123", "email": "user@example.com"}' http://api.practa.tech/user-email
  ```

### 4. **/get-study-days/:userId**
- **Method:** `GET`
- **Description:** Returns the user's study days and total points.
- **Parameters:**
    - `userId` (required): User ID.
- **Usage example:**
  ```bash
  curl http://api.practa.tech/get-study-days/123
  ```

### 5. **/user-info/:userId**
- **Method:** `GET`
- **Description:** Returns user information such as nickname, level, points, and completed SEs.
- **Parameters:**
    - `userId` (required): User ID.
- **Usage example:**
  ```bash
  curl http://api.practa.tech/user-info/123
  ```

### 6. **/user-ses**
- **Methods:**
    - `GET /user-ses/:userId`: Returns the user's SEs.
    - `POST /user-ses`: Adds a new SE for the user.
- **Parameters:**
    - `userId` (required): User ID.
    - `SE` (required for POST): Object containing `title`, `score`, `total`, and `date`.
- **Usage example:**
  ```bash
  curl http://api.practa.tech/user-ses/123
  curl -X POST -H "Content-Type: application/json" -d '{"userId": "123", "SE": {"title": "SE1", "score": 90, "total": 100, "date": "2023-01-01"}}' http://api.practa.tech/user-ses
  ```

---

> ⚠️ **Important:**  
> The following endpoints will be **deprecated and fully removed** before the official PRACTA launch.

## Why Are These Endpoints Being Removed?

Originally, PRACTA included email-based verification and code generation features (`/verify-user`, `/generate-code`, `/verify-code`) to handle account confirmation and notifications. However, after careful consideration, we decided to remove email collection entirely.

This decision has three main goals:
- ✅ **Lower operating costs:** No need for third-party email services like SendGrid or Twilio.
- ✅ **Simpler user experience:** All authentication and notifications will happen directly through the official Discord bot.
- ✅ **Stronger privacy:** By not storing email addresses, PRACTA minimizes the amount of personal data collected and managed.

With this change, all identity and community checks will rely solely on Discord OAuth, and all updates or alerts will be sent via the Discord bot — **no email needed**.

---

## Deprecated Endpoints

### 7. `/verify-user`
- **Method:** `POST`
- **Description:** Verifies a user and creates an initial data record for them.
- **Parameters:**
  - `user_id` (required): Discord User ID.
  - `email` (optional): User email.
- **Example:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"user_id": "123", "email": "user@example.com"}' http://api.practa.tech/verify-user
  ```

---

### 8. `/generate-code`

* **Method:** `POST`
* **Description:** Generates a verification code and sends it by email.
* **Parameters:**

  * `to` (required): Recipient email.
  * `user_id` (required): Discord User ID.
* **Example:**

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"to": "user@example.com", "user_id": "123"}' http://api.practa.tech/generate-code
  ```

---

### 9. `/verify-code`

* **Method:** `GET`
* **Description:** Checks if a submitted code is valid.
* **Parameters:**

  * `user_id` (required): Discord User ID.
  * `code` (required): Verification code.
* **Example:**

  ```bash
  curl "http://api.practa.tech/verify-code?user_id=123&code=654321"
  ```

---

**These endpoints are kept only for early development/testing and will not be part of the production API.**
All future user verification and notifications will be handled securely through Discord only.



## Configuration

Make sure to set the environment variables in the `.env` file:
- `DISCORD_TOKEN`
- `DISCORD_CHANNEL_ID`
- `MEMBERS_INFO_ENDPOINT`
- `EMAIL_SEND_ENDPOINT`
- `ALLOWED_ORIGIN_1`, `ALLOWED_ORIGIN_2`, etc.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PRACTAcademy/api.practa.tech.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Contribution

We welcome contributions from developers, students, and enthusiasts who are passionate about creating impactful tools for the PRACTA community.

If you’d like to contribute, please follow these guidelines:

1. **Fork the repository** and create a new branch with a descriptive name.
2. **Make your changes** with clean, readable code and clear commit messages.
3. **Ensure your code is well-tested** and does not introduce regressions.
4. **Open a pull request** detailing your changes, the problem it solves, and any relevant context.

> 🧠 We're especially interested in contributions that enhance performance, security, and user experience — aligned with PRACTA’s mission of academic excellence and innovation.

If you're not sure where to start, check the [issues section](https://github.com/PRACTAcademy/api.practa.tech/issues) for open tasks, or feel free to open a discussion.
