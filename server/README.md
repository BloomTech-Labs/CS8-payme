# GiveMeMyMoney API

# Endpoints

## POST -- `/api/register` -- POST

Registers a new client.

| Property     | Type                                                      | Required |
| ------------ | --------------------------------------------------------- | -------- |
| username     | Email address                                             | Yes      |
| password     | String 6+ characters                                      | Yes      |
| firstName    | String                                                    | Yes      |
| lastName     | String                                                    | Yes      |
| phone        | String -- US Phone numbers only. 10 characters.           | Yes      |
| subscription | "perdiam" - $1.99 per invoice. "monthly" -- $20 per month | no       |

Success will return

```js
{
  token: 'JWT String',
  user: {
    subscription: 'perdiem',
    invoices: [],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
  },
};
```

Failure will return:

```js
{
  message: 'Reason for failure';
}
```

## GET -- `/api/login` -- GET

JWT must be sent as Authorization header fromatted as 'bearer {token}'. If JWT is valid, will return user same information as successful login or register post. If not valid, will return "Unauthorized".

## POST -- `/api/login` -- POST

| Property | Type   | Required |
| -------- | ------ | -------- |
| username | String | Yes      |
| password | String | Yes      |

Success will return:

```js
{
  token: 'JWT String',
  user: {
    subscription: 'perdiem',
    invoices: [],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
  },
};
```

Failure will return:

```js
{
  message: 'Reason for failure';
}
```

## POST -- `/api/changepassword` -- POST

Active JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.

| Property    | Type   | Required |
| ----------- | ------ | -------- |
| newPassword | String | Yes      |

Success will return:

```js
{
  token: 'JWT String',
  user: {
    subscription: 'perdiem',
    invoices: [],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
  },
};
```

## POST -- `/api/addinvoice/` -- POST

Active JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.

| Property        | Type    | Required |
| --------------- | ------- | -------- |
| clientName      | String  | Yes      |
| companyName     | String  | Yes      |
| isPaid          | Boolean | No       |
| number          | Number  | Yes      |
| pdf             | Array   | No       |
| totalAmount     | String  | Yes      |
| phone.number    | Number  | No       |
| phone.frequency | String  | No       |
| email.address   | String  | No       |
| email.frequency | String  | No       |

Success will return:

```js
{
    user: {
    subscription: 'perdiem',
    invoices: [{
            "clientName": "Austen Allred",
            "companyName": "Lambda School",
            "isPaid": false,
            "phone": {
                "number": 123456789,
                "frequency": "daily"
            },
            "email": {
                "address": "bob@bob.com",
                "frequency": "weekly"
            },
            "pdf": [
                42,
                14,
                78,
                52
            ],
            "_id": "5b4e33af0bfad9fcd8893c17",
            "number": "123456",
            "totalAmount": "$423.84",
            "__v": 0
        }],
    _id: '5b4d02ac6b3ee4ba0b0dd5f2',
    username: 'testing@test.com',
    phone: '1234567890',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '2018-07-16T20:40:12.758Z',
    updatedAt: '2018-07-16T20:40:12.758Z',
    __v: 0,
};
```

If invoice number is already in use, will return:
`{ message: 'Invoice number already exists.' }`

If invoice failed to save, will return:
`{ message: "Failed to save invoice to database."}`

## GET -- `/api/invoices` -- GET

JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.
If JWT is active, will return:

```js
{
  invoices: [{ Invoice }, { Invoice }, { Invoice }];
}
```

## GET -- `/api/invoices/:number` -- GET

JWT must be placed on the Authorization headers. If JWT is not active, "Unauthorized" will be returned.

`number` is the invoive number you would like returned.

If JWT is active, and `number` is a valid invoice number, will return just the requested invoice.

if JWT is active, and `number` is NOT a valid invoice number, will return:
`{ message: 'Invoice number does not exist.' }`

## GET -- `/api/payinvoice/:invoiceID` -- GET

JWT is not required.

`invoiceID` is the \_id number of the invoice you want to view. This route is used so our client's client does not need to have an account or be logged in to view or pay an invoice that they were sent.

If `invoiceID` is valid, will return:

```js
{
    "clientName": String,
    "companyName": String,
    "isPaid": Boolean,
    "phone": {
        "number": Number,
        "frequency": String
    },
    "email": {
        "address": String,
        "frequency": String
    },
    "pdf": [],
    "_id": String,
    "number": String,
    "totalAmount": String,
    "__v": 0
}

```

if `invoiceID` is not valid, will return:
`{ message: 'Invoice not found.' }`
