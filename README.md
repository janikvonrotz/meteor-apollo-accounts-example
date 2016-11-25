# Meteor Apollo Accounts Example

Example app implementing [Meteor Apollo Accounts](https://github.com/nicolaslopezj/meteor-apollo-accounts).  
Blog post: [Authenticate Meteor accounts with the Apollo GraphQL API](https://janikvonrotz.ch/2016/11/12/authenticate-meteor-accounts-with-the-apollo-graphql-api/)  

## Installation

* Git clone this repo
* Run `npm install` and `npm start`
* Go to [http://localhost:3000](http://localhost:3000) to use the app
* Or open [http://localhost:3000/graphiql](http://localhost:3000/graphiql) and test the API

## Features

* Real-time subscriptions implementation (not Meteor)
* Authenticate users with Meteor accounts
* Social login with Facebook and Google
* Restrict access on the grapqhl API
* Use existing Apollo schema
* Redirect user on client
* Update user profile
* Register new users
* Email verification
* Password change
* Password reset

## Screenshot

![](screenshot.png)

## Todo

- [x] Password change component
- [x] Social login with Facebook and Google
- [x] Add email Verification message to App
- [x] Do a lot of stuff
- [x] CRUD view for posts
- [x] Reactity for posts insert, delete and update
- [x] Update pubsup with callback
- [ ] Create user with profile directly
- [x] Redirect on route when user not logged in
- [ ] Only send subscriptions if user is logged in

# Source

[Apollo Example GitHunt server](https://github.com/apollostack/GitHunt-API)

[Apollo Example GitHunt React client](https://github.com/apollostack/GitHunt-React)

[GraphQL Subscriptions in Apollo Client](https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb)

[A proposal for GraphQL subscriptions](https://dev-blog.apollodata.com/a-proposal-for-graphql-subscriptions-1d89b1934c18#.)

[GraphQL Subscriptions in Apollo Client](https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb)
