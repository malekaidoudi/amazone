1-  Introduction
    a-  Install Tools
    b-  Create React App
    c-  Create Git Repository
2-  List Products
    a-  create products array
    b-  add product images
    c-  render products
    d-  style products
3-  Add page routing
    a-  npm i react-router-dom
    b-  create route for home screen
    c-  create router for product screen
4-  Create Node.JS Server
    a-  run npm init in root folder
    b-  Update package.json set type: module
    c-  Add .js to imports
    d-  npm install express
    e-  create server.js
    f-  add start command as node backend/server.js
    g-  require express
    h-  create route for / return backend is ready.
    i-  move products.js from frontend to backend
    j-  create route for /api/products
    k-  return products
    l-  run npm start
5-  Fetch Products From Backend
    a-  set proxy in package.json
    b-  npm install axios
    c-  use state hook
    d-  use effect hook
    e-  use reducer hook
6-  Manage State By Reducer Hook
    a-  define reducer
    b-  update fetch data
    c-  get state from usReducer
7-  Add bootstrap UI Framework
    a-  npm install react-bootstrap bootstrap
    b-  update App.js
8-  Create Product and Rating Component
    a-  create Rating component
    b-  Create Product component
    c-  Use Rating component in Product component
9-  Create Product Details Screen
    a-  fetch product from backend
    b-  create 3 columns for image, info and action
10- Create Loading and Message Component
    a-  create loading component
    b-  use spinner component
    c-  create message component
    d-  create utils.js to define getError function
11- Create React Context For Add Item To Cart
    a-  Create React Context
    b-  define reducer
    c-  create store provider
    d-  implement add to cart button click handler
12- Complete Add To Cart
    a-  check exist item in the cart
    b-  check count in stock in backend
13- Create Cart Screen
    a-  create 2 columns
    b-  display items list
    c-  create action column
14- Complete Cart Screen
    a-  click handler for inc/dec item
    b-  click handler for remove item
    c-  click handler for checkout
15- Create Signin Screen
    a-  create sign in form
    b-  add email and password
    c-  add signin button
16- Connect To MongoDB Database
    a- create atlas mongodb database
    b- install local mongodb database
    c- npm install mongoose
    d- connect to mongodb database
17- Seed Sample Data
    a- create Product model
    b- create User model
    c- create seed route
    d- use route in server.js
    e- seed sample product
18- Seed Sample Users
    a- create user model
    b- seed sample users
    c- create user routes
19- Create Signin Backend API
     a- create signin api
     b- npm install jsonwebtoken
     c- define generateToken
18- Complete Signin Screen
    a- handle submit action
    b- save token in store and local storage
    c- show user name in header
19- Create Shipping Screen
    a- create form inputs
    b- handle save shipping address
    c- add checkout wizard bar