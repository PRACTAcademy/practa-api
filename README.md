# MITPA API

Welcome to the MITPA API! This API provides functionalities for managing users, rankings, study results, and integration with Discord.

> 🔐 **CORS (Cross-Origin Resource Sharing) is ENABLED in this API.**
>
> ❗ **Only official and authorized MITPA websites are allowed to make requests to the API endpoints.**
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
  curl -X POST -F "userId=123" -F "image=@path/to/image.jpg" http://api.mitpa.tech/share-result
  ```

### 2. **/ranking**
- **Method:** `GET`
- **Description:** Returns the user ranking based on accumulated points.
- **Usage example:**
  ```bash
  curl http://api.mitpa.tech/ranking
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
  curl http://api.mitpa.tech/user-email/123
  curl -X POST -H "Content-Type: application/json" -d '{"userId": "123", "email": "user@example.com"}' http://api.mitpa.tech/user-email
  ```

### 4. **/get-study-days/:userId**
- **Method:** `GET`
- **Description:** Returns the user's study days and total points.
- **Parameters:**
    - `userId` (required): User ID.
- **Usage example:**
  ```bash
  curl http://api.mitpa.tech/get-study-days/123
  ```

### 5. **/user-info/:userId**
- **Method:** `GET`
- **Description:** Returns user information such as nickname, level, points, and completed SEs.
- **Parameters:**
    - `userId` (required): User ID.
- **Usage example:**
  ```bash
  curl http://api.mitpa.tech/user-info/123
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
  curl http://api.mitpa.tech/user-ses/123
  curl -X POST -H "Content-Type: application/json" -d '{"userId": "123", "SE": {"title": "SE1", "score": 90, "total": 100, "date": "2023-01-01"}}' http://api.mitpa.tech/user-ses
  ```

### 7. **/verify-user**
- **Method:** `POST`
- **Description:** Verifies a user and creates an initial data file for them.
- **Parameters:**
    - `user_id` (required): User ID.
    - `email` (optional): User email.
- **Usage example:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"user_id": "123", "email": "user@example.com"}' http://api.mitpa.tech/verify-user
  ```

### 8. **/generate-code**
- **Method:** `POST`
- **Description:** Generates a verification code and sends it by email.
- **Parameters:**
    - `to` (required): Recipient email.
    - `user_id` (required): User ID.
- **Usage example:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"to": "user@example.com", "user_id": "123"}' http://api.mitpa.tech/generate-code
  ```

### 9. **/verify-code**
- **Method:** `GET`
- **Description:** Verifies if the submitted code is valid.
- **Parameters:**
    - `user_id` (required): User ID.
    - `code` (required): Verification code.
- **Usage example:**
  ```bash
  curl "http://api.mitpa.tech/verify-code?user_id=123&code=654321"
  ```

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
   git clone https://github.com/your-repository/api.mitpa.tech.git
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

We welcome contributions from developers, students, and enthusiasts who are passionate about creating impactful tools for the MITPA community.

If you’d like to contribute, please follow these guidelines:

1. **Fork the repository** and create a new branch with a descriptive name.
2. **Make your changes** with clean, readable code and clear commit messages.
3. **Ensure your code is well-tested** and does not introduce regressions.
4. **Open a pull request** detailing your changes, the problem it solves, and any relevant context.

> 🧠 We're especially interested in contributions that enhance performance, security, and user experience — aligned with MITPA’s mission of academic excellence and innovation.

If you're not sure where to start, check the [issues section](https://github.com/MITPAcademy/api.mitpa.tech/issues) for open tasks, or feel free to open a discussion.
