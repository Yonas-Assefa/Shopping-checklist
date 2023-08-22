# Shopping Checklist API

This repository contains the backend for a shopping checklist application. It provides API endpoints to manage shopping items and calculate total costs.

## API Endpoints

- **GET /api/v1/shoppingItems**
  - Get all available shopping items.

- **GET /api/v1/shoppingItems/:id**
  - Get details of a specific shopping item.

- **POST /api/v1/shoppingItems**
  - Create a new shopping item.

- **PUT /api/v1/shoppingItems/:id**
  - Update or edit a specific shopping item.

- **DELETE /api/v1/shoppingItems/:id**
  - Delete a specific shopping item.

- **GET /api/v1/totalCosts**
  - Get the sum of costs for all shopping items.
  - Get the sum of costs for all already bought shopping items.

## Installation and Usage

To run the backend server:

1. Clone the project:
2 install dependencies
  npm install
3 run the server
  npm run start
