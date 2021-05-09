# E-Commerce-web-app-using-MERN

It is a E-commerce web application developed using React js, Node js, MongoDb and Express. It is fully functional with different views for admin and user and also integrated with payment gateways for checkout. It is deployed to heroku and you can check it out using the link given below.

## Note :

Kindly check both roles in the application with signin details given below

https://e-commerce-mern-app9.herokuapp.com/


### Admin signin:

Email : admin@gmail.com

Password: 123456

### User signin:
Email : user@gmail.com

Password: 123456

## Features:
1. HomePage
2. Cart
3. Admin Dashboard
4. SignIn
5. SignUp
6. SignOut
7. Payment gateway (Stripe)

Private routes used for different roles. Authentication used JWT - 'Json Web Token' and stored the token in cache to easily login without entering login details everytime. 

Implemented Add to cart and Remove from cart functinalities. Used conditional rendering for views and priviliges of different roles.

Password is encypted using crypto and salt using a private key and stored the encrypted password in MongoDb Atlas. Integrated the stripe payment gateway for the cart checkout.
