# E-Commerce-web-app-using-MERN

It is an E-Commerce Web application developed using ReactJs for frontend, NodeJs for backend, MongoDb for database and express framework.
It has so many features like as we see in present E-commerce websites and all are full functional.

## Features:
1. Home page
2. User cart
3. Admin Dashboard
4. SignIn
5. SignOut
6. SignUp 
7. Integrated with stripe online payment gateway. 

This wep application can be accessed via 2 roles. 
## Roles:
1. Admin
2. User

Admin privilage is useful to create products, upload product pictures, Set price for a product, update product and manage product categories.

Password encryption is done using JSON Web Token, crypto and uuid to generate a secure code that will be stored in the MongoDb database and while sign in, the saved encrypted code will be decrypted on the go in the Nodejs backend server and match both user entered and present decrypted passwords for Authentication.

Used PrivateRoutes to restrict access for unauthorised.

Included Add to Cart and Remove from cart functionalities.

The stripe payment gateway will help to make payment for the total value of products in the cart.
