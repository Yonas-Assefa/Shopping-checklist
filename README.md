# Shopping Checklist

this repository contains information about a fullstack shopping items checklist, which a user can
-create account and register
-create a new shopping item
-update the shopping item as they want
-delete the shopping item they no longer wnat
-can see percentage of the item bought out of the total items in a progess bar

# Backend

## How to start the backend

To run the backedn:
-download th repo
-cd to the project directory and then to backend
-npm run dev

## API Endpoints

### shopping items

- **GET /api/v1/shoppingItems**

  - Get all available shopping items sorted by their date

- **GET /api/v1/shoppingItems/:id**

  - Get details of a specific shopping item.

- **POST /api/v1/shoppingItems**

  - Create a new shopping item.

- **PUT /api/v1/shoppingItems/:id**

  - Update or edit a specific shopping item.

- **DELETE /api/v1/shoppingItems/:id**
  - Delete a specific shopping item.

### authentication

- **POST /api/v1/auth/register**

  - Create a new user

- **POST /api/v1/auth/login**

  - get loged in with password and email

- **Get /api/v1/auth/logout**

  - get the user loged out

- **Get /api/v1/getCurrentUser**

  - get the currently loged in user

- **Put /api/v1/auth/updateDetails**

  - update the user's information

- **Put /api/v1/auth/updateDetails**
  - change the password of the current user

### Total Cost

- **Get /api/v1/totalCostes**
  - Get the total costs and total bought cost current user's items

# Frontend

## How to start the frontend

To run the backend:
-download th repo
-cd to the project directory and then to frontend
-npm start
