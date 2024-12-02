# Trucking Logistics Management System

## Overview

This project is a Trucking Logistics Management System built using Next.js with NextAuth for authentication. It simulates the interaction between truck owners, drivers, and customers.

## Features

- User Authentication using Google OAuth 2.0 with NextAuth
- Dashboard displaying summary of available trucks, drivers, and active orders
- Truck Management: View, add, edit, remove trucks; change truck status
- Driver Management: View, add, edit, remove drivers; assign driver to truck
- Order Management: View, add, edit orders; assign driver to order
- API Integration using React Query
- Mobile-Friendly Design
- Error Handling and Form Validation

## Technologies Used

- Next.js (v14+)
- NextAuth for Authentication
- JSON Server for Backend Simulation
- React Query for Data Fetching
- SCSS for Styling
- React State and Context API for State Management

## Setup

To run this project locally:

1. Clone the repository:
   git clone https://github.com/kaitcham/ironji_challenge.git

2. Install dependencies:
   npm install

3. Set environment variables:
   API_URL=****\*\*****\*\*\*****\*\*****
   AUTH_GOOGLE_SECRET=**\*\*\*\***\*\*\***\*\*\*\***
   AUTH_SECRET=******\*\*\*\*******\*\*\*******\*\*\*\*******
   AUTH_GOOGLE_ID=********\*\*********\*\*********\*\*********

4. Start the development server:
   npm run dev

5. Start JSON Server in another terminal:
   npx json-server --watch db.json --port 3001

## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/yourusername/trucking-logistics-system/issues) if you want to contribute or report a bug.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [React Query](https://react-query.vite-demo.now.expo.dev/)
- [JSON Server](https://github.com/typicode/json-server)
