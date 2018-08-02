<p align="center">
  <br><br>
  <img src="https://i.imgur.com/lUDcswe.png">
</p>








# **Description**

### payMe is a subscription based application that allows "Admins" to upload invoices, and set automatic email/sms messages to be sent to their "Client". The client can click the link in the email/sms and be directed to a page where they can easily and without barriers make the required payment to the admin.

## TechStack

- MongoDB
- Express
- React
- Node.js
- Redux
- Mongoose
- bcrypt
- jwt
- Twillio
- Stripe
- axios
- react router
- cron
- nodemailer

## App Walkthrough

- Create Admin account

- Connect Admin account to their stripe account (This is a requirement. In order for the Admin to receive a payment from their client, they must have a stripe account to receive the funds.)

- Admin can purchase a 30 day subscription or individual invoice credits. Admin will not be able to upload an invoice and set up reminders without one of these, and they can not purhase either of these without first connecting their payMe account with a stripe account.

- With active sub or avaliable credit, Admin can upload a PDF invoice, specify their client's contact info, and the total amount of the invoice.

- Admin can set up "reminders" that will send an email/sms to the client with a link for the client to pay the invoice. Email and SMS reminder are seperate, and can be sent with different frequencies. They are not required, so the Admin can choose Email, SMS, or both. (1 Invoice Credit will cover all the reminders of Emails and SMS messages)

- Clients can click on the link in the message and will be directed to a page where they can view the PDF invoice that the Admin has uploaded. Clients do not have to log in. If they have an issue with the amount or the content of the PDF, they can click the contact's name and send them an email directly. The client can also click the pay button to enter their credit card info and pay the invoice.

- Invoices paid by the client are automatically deposited into the admin's stripe account. A 5% fee is taken from the total invoice amount to cover stripe credit card fees.

# **Deployed Site**

### http://givememymoney.herokuapp.com

<!-- ## User Components

* **Landing** - "/" or "/landing" - *IN DEVELOPMENT* - When a user hits the landing page, they are given the option to Learn More, Donate, or Log In. 

* **Login** - "/login" - Accepts the user's email address and password and checks against the hashed password stored on the database before passing the user to the voting page.

* **Info** - "/info" - *IN DEVELOPMENT* - The info page uses a series a slides to step a new user through the idea behind Numberless, as well as it's basic usage. Once the user has looked over the info, they are brought to the Donate page.

* **Donate** - "/pledge" - The donate page lets a new user select the amount they would like to contribute on a monthly basis, and they are then sent to the user creation page, with their selected donation passed to the user creator.

* **UserCreator** - "/newuser" - The user creation page allows a new user to sign up for an account using their email and a created password. They then sign up for a subscription for their pledge using the amount selected in the Donate component. Their CC information is collected and processed by Stripe, and a new user is created in the database with their email, password (encrypted with `bcrypt`), Stripe customer ID, donation amount, and a flag for whether or not they have voted on this month's charities. Once the user is created, they move on to the voting page.

* **Voting** - "/voting" - *IN DEVELOPMENT* - The voting page displays the name and logo for the two charities chosen that month. The user can pull up a description of each charity or cast their vote. Their vote is then added to that charity's vote count and the user is sent to the Thank You page.

* **ThankYou** * - "/thankyou" - *IN DEVELOPMENT* - The Thank You page thanks the user for voting for the charity they chose. If the user has already voted that month, this page is loaded in place of the Voting page after log in.

## Admin Components

* **Admin** * - "/admin" - *IN DEVELOPMENT* - The admin page is a protected route. At login, if a user has the `admin` flag set to true, they are redirected to the admin page, which displays a list of current admin users and a list of charities. The user can then add new admin users and charities to the database. -->



## Backend Schemas

### User Schema

```
stripe: {
      code: {
        type: String,
        default: '',
      },
      scope: {
        type: String,
        default: '',
      },
    },
    // E-mail address is used as a username
    username: {
      type: Email,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    subscription: {
      type: Number,
      default: 0,
    },
    invoiceCredits: {
      type: Number,
      default: 0,
    },
    invoices: [{ type: ObjectId, ref: 'Invoice' }],
  },
  {
    timestamps: true,
  }
  ```

  ### Invoice Schema

  ```
  clientName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    number: {
      type: String,
      required: true,
    },
    img: { data: Buffer, contentType: String },
    totalAmount: {
      type: Number,
      required: true,
    },
    phone: {
      number: Number,
      frequency: {
        type: String,
        default: 'weekly',
      },
    },
    email: {
      address: Email,
      frequency: {
        type: String,
        default: 'weekly',
      },
    },
    admin: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    reminders: [{ type: ObjectId, ref: 'Reminder' }],
  },
  {
    timestamps: true,
  }
  ```
<!-- 
## Routes

* **/create-user** - POST - Takes in a new user with `email`, `password`, `userPledge`, `customerID`, `subscriptionID` and `voted` in the request body. Passes the password to the `hashPassword` middleware and adds that user to the database, and returns the created user.

* **/create-stripe-customer** - POST - Takes in a `description`, `source` and `email` provided in the request body, which is then passed to Stripe. Returns the created Stripe customer.

* **/create-stripe-subscription** - POST - Takes in a `customer`, the Stripe customer ID, and an `items` array, which contains the Stripe plan ID the customer is subscribing to. Returns the created Stripe subscription object.

* **/login** - POST - Takes in a `email` and `password` from the request body and passes them through the `authenticate` middleware. If the user is verified, returns that user.

* **/users/:id** - GET - Takes in an `id` in the params, and returns the user object, including `id`, `email`, `userPledge`, `customerID`, `subscriptionID` and `voted`.

* **/users/:id** - PUT - Takes in an `id` in the params and a `vote` in the body, which is the `id` of the charity the user voted for, and updates that user's `voted` value to the chosen charity's id. 

* **/adminusers** - GET - Returns a list of all users with `admin` flagged to true.

* **/create-charity** - POST - Takes in a new charity with `charity`, `image` and `description` in the request body. Creates a charity with the `winner` value set to `false`, the `active` value set to `false`, and the `votes` value set to `0` and adds that charity to the database.

* **/charities** - GET - Returns an array of all charities in the database.

* **/charities/:id** - PUT - Takes in an `id` from the params and a `vote` from the request body, which is the number of votes to be added to the, charity's `votes` value. Increments the votes accordingly. 

* **/charities/:id** - GET - Takes in an `id` from the params and returns the charity matching that `id`.

## Middleware

* **hashPassword** - Uses `bcrypt` to encrypt the user's password before it hits the database.

* **authenticate** - Uses `bcrypt` to check the incoming password against the user's hashed password stored in the database. -->


