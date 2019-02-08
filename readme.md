# Homework Assignment #2

## Specifications
1. New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address.
2. Users can log in and log out by creating or destroying a token.
3. When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system).
4. A logged-in user should be able to fill a shopping cart with menu items
5. A logged-in user should be able to create an order. You should integrate with the Sandbox of [Stripe.com](https://stripe.com/) to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and click on the "tokens" tab to see the fake tokens you can use server-side to confirm the integration is working: [https://stripe.com/docs/testing#cards](https://stripe.com/docs/testing#cards)
6. When an order is placed, you should email the user a receipt. You should integrate with the sandbox of [Mailgun.com](http://mailgun.com/) for this. Note: Every Mailgun account comes with a sandbox email account domain (whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need to setup any DNS for your domain for this task [https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account](https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account)

## Run
```bash
node index.js // It will run server on default port

NODE_ENV=production node index.js // It will run server on production port
```

## Directions
1. Create New User Request {POST}
* **Required fields**: name, email, password, address, tosAgreement
* Additional requests: {GET, UPDATE, DELETE}
```bash
http://locahost:3000/user
```

2. Create Login Request {POST} (Token will be created)
* **Required fields**: email, password*
```bash
http://localhost:3000/login
```

3. Create Logout Request {DELETE}
* **Required fields**: id*
```bash
http://localhost:3000/logout?id=tokenid
```
4. Menu Request {GET}
* **Required fields**: email
* **Header fields**: token
<i>Required fields: id</i>
```bash
http://localhost:3000/menu?email=navdeep.er@gmail.com
```
5. Create Cart Request {POST}
* **Required fields**: itemId
* **Header fields**: token
```bash
http://localhost:3000/cart
```
6. Update Cart Request {PUT}
* **Required fields**: id (cart id), itemId, action (update or delete) 
* **Header fields**: token
```bash
http://localhost:3000/cart
```
7. Order Request
* **Required fields**: cartId 
* **Header fields**: token *
```bash
http://localhost:3000/order
```


