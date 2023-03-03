# The Collection (backend)

**The Collection** is a Web-app for personal collections managements. It was made as a project for itransition internship.

- node.js
- express
- mongoose
- mongoDB
- bcryptjs
- jsonwebtoken

> **Attention!** The backend is deployed on a free service render.com, so when you run the application for the first time, you need to wait a little bit. Thank you 🙏

[Link to the server deploy](https://the-collection-backend.onrender.com/)

[Link to the app deploy](https://the-collection-saachko.netlify.app/)

## Endpoints:

`Auth` (`auth/` route)

- `POST /signup` - new user registration
- `POST /signin` - user authorization

`Users` (`users/` route)

- `GET /` - get all users **(only for admin)**
- `GET /:userId` - get user by id **(only for logged in users)**
- `DELETE /:userId` - delete user by id **(only for logged in users)**
- `PUT /:userId` - update user by id**(only for logged in users)**

`Collections` (`collections/` route)

- `GET /` - get all collections
- `GET /:collectionId` - get collection by id
- `GET /user/:userId` - get collections by selected user **(only for logged in users)**
- `POST /` - create new collection **(only for logged in users)**
- `DELETE /:collectionId` - delete collection by id **(only for logged in users)**
- `PUT /:collectionId` - update collection by id **(only for logged in users)**

`Items` (`items/` route)

- `GET /` - get all items
- `GET /:itemId` - get item by id
- `GET /collection/:collectionId` - get items in selected collection 
- `POST /` - create new item **(only for logged in users)**
- `DELETE /:itemId` - delete item by id **(only for logged in users)**
- `PUT /:itemId` - update item by id **(only for logged in users)**

`Custom fields` (`customFields/` route)

- `GET /:fieldId` - get custom field by id
- `GET /collection/:collectionId` - get custom fields in selected collection 
- `POST /` - create new custom field **(only for logged in users)**
- `DELETE /:fieldId` - delete custom field by id **(only for logged in users)**
- `PUT /:fieldId` - update custom field by id **(only for logged in users)**

`Comments` (`comments/` route)

- `GET /all` - get all comments
- `GET /:commentId` - get comment by id
- `GET /item/:itemId` - get comments to selected item 
- `GET /` - get lately changed comment (created, deleted)
- `POST /` - create new comment **(only for logged in users)**
- `DELETE /:commentId` - delete comment by id **(only for logged in users)**
- `PUT /:commentId` - update comment by id **(only for logged in users)**

`Tags` (`tags/` route)

- `GET /` - get all tags
- `GET /:tagId` - get tag by id
- `GET /item/:itemId` - get tags to selected item 
- `POST /` - create new tag **(only for logged in users)**
- `PUT /:itemId` - update tag by id **(only for logged in users)**

_Developed by [Anastasiya Sachko](https://github.com/saachko)_

