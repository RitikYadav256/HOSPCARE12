# HospCare Backend

HospCare is a hospital management system backend designed to streamline and automate the management of doctors, patients, and appointments. Built with **Node.js**, **Express**, and **MongoDB**, this backend provides a robust RESTful API for efficient hospital operation management.

## Features

- **Doctor Management:** Add, update, and view doctors with details such as name, specialization, contact info, and organization.
- **Patient Management:** Manage patient records including personal info and medical details.
- **Appointment Scheduling:** Create and manage appointments linking doctors and patients with date, service type, and status.
- **Data Relationships:** Uses MongoDB references to associate appointments with doctors and patients.
- **RESTful API:** Well-structured API endpoints for easy integration with frontend or mobile applications.
- **Middleware Support:** Supports CORS, JSON parsing, and error handling for smooth communication.

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- Body-parser
- CORS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hospcare-backend.git
   cd hospcare-backend
