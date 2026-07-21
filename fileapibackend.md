# Backend API Documentation

## Project: CRM

This document describes the backend APIs used in the CRM application.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints

### User Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/register` | Register user |

### Customer Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers/:id` | Get customer by ID |
| POST | `/api/customers` | Add a new customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |

## Contribution

Backend API documentation and API structure analysis contributed by Jaskirat Singh Virk.