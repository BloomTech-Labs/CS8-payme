# GiveMeMyMoney API

# Endpoints

## /api/register

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

## /api/login

| Property | Type   | Required |
| -------- | ------ | -------- |
| username | String | Yes      |
| password | String | Yes      |

Success will return:

```js
response = {
  token: 'JWT String',
  user: {
    subscription: 'perdiem',
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
