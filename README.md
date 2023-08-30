Shopping Checklist
This repository contains information about a full-stack shopping items checklist, where users can:

Create an account and register
Add new shopping items
Update existing shopping items
Delete shopping items they no longer want
View the percentage of items bought out of the total items in a progress bar
Backend
How to Start the Backend
To run the backend:

Download the repository
Navigate to the project directory and then to the "backend" folder
Run the command: npm run dev
API Endpoints
Shopping Items
GET /api/v1/shoppingItems

Retrieve all available shopping items sorted by their date.
GET /api/v1/shoppingItems/:id

Get details of a specific shopping item.
POST /api/v1/shoppingItems

Create a new shopping item.
PUT /api/v1/shoppingItems/:id

Update or edit a specific shopping item.
DELETE /api/v1/shoppingItems/:id

Delete a specific shopping item.
Authentication
POST /api/v1/auth/register

Create a new user account.
POST /api/v1/auth/login

Log in with email and password.
GET /api/v1/auth/logout

Log the user out.
GET /api/v1/getCurrentUser

Get the currently logged-in user.
PUT /api/v1/auth/updateDetails

Update user information.
PUT /api/v1/auth/updatePassword

Change the password for the current user.
Total Cost
GET /api/v1/totalCosts
Retrieve the total costs and total bought cost of the current user's items.
Frontend
How to Start the Frontend
To run the frontend:

Download the repository
Navigate to the project directory and then to the "frontend" folder
Run the command: npm start
