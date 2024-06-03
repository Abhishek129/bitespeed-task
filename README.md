# Bitespeed Identify Service

This service provides an endpoint to identify and consolidate customer contact information from multiple purchases on FluxKart.com.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Sequelize (ORM)
- **Hosting:** Render.com

## Setup Instructions

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Abhishek129/bitespeed-task.git
    cd bitespeed-task
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add your database connection details:
    ```plaintext
    DB_NAME=yourdbname
    DB_USER=yourusername
    DB_PASSWORD=yourpassword
    DB_HOST=yourhostserver
    DB_PORT=yourdatabaseportnumber
    PORT=yourappportnumber
    ```

4. Run the migrations to create the necessary tables:
    ```sh
    npm run migrate
    ```

5. Seed the database with initial data:
    ```sh
    npm run seed
    ```

4. **Run the application:**
    ```sh
    npm run dev
    ```

### API Documentation

#### Identify Contact

- **URL:** `https://bitespeed-task-l0su.onrender.com`
- **Endpoint:** `/identify`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "phoneNumber": "1234567890"
    }
    ```
- **Response:**
    ```json
    {
      "contact": {
        "primaryContatctId": 1,
        "emails": ["user@example.com"],
        "phoneNumbers": ["1234567890"],
        "secondaryContactIds": []
      }
    }
    ```

This guide should help you set up and run your application without the issue.
