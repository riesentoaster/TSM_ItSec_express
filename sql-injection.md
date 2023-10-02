# Prevent SQL Injection in node.js
 
## Bad example

```javascript
const query = `SELECT * FROM Repository WHERE TAG = '${userQuery}' AND public = 1`
```
```SQL
SELECT * FROM Repository WHERE TAG = 'javascript' AND public = 1;
```
with ;--
```SQL
SELECT * FROM Repository WHERE TAG = 'javascript';--' AND public = 1;
```
equals
```SQL
SELECT * FROM Repository WHERE TAG = 'javascript';
```
 
## The mysql2 client with express.js

```Terminal
npm install mysql2
```

### bad example

```JavaScript
import express from 'express';
import mysql from 'mysql2/promise';
 
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const app = express();
 
app.get('/repositories/:userQuery', async (req, res) => {
    const {userQuery} = req.params;
    const query = `SELECT * FROM Repository WHERE TAG = '${userQuery}' AND public = 1`;
    const [rows] = await connection.query(query);
   res.json(rows);
});
 
app.listen(3001, () =>{
  console.log('App is running');
});
```
 
### Avoid multiple statements if possible
 
```JavaScript
const connection = await mysql.createConnection({
  uri: process.env.DATABASE_URL,
  multipleStatements: false
})
```
 
### Use placeholders
 
```JavaScript
const query = 'SELECT * FROM Repository WHERE TAG = ? AND public = 1'
const [rows] = await connection.query(query, [userQuery])
```
 
### Input validation
 
```JavaScript
 app.get('/repositories/:userQuery', async (req, res) => {
 
    const {userQuery} = req.params;
    const onlyLettersPattern = /^[A-Za-z]+$/;
 
    if(!userQuery.match(onlyLettersPattern)){
      return res.status(400).json({ err: "No special characters and no numbers, please!"})
    }
 
    ...
  });
```
 
### Allowlisting
 
Is useful if you know every possible valid user input. From there, you can easily reject anything else.
 
```JavaScript
 app.get('/repositories/:userQuery', async (req, res) => {
 
    const {userQuery} = req.params;
    const validTags = ["javascript", "html", "css"];
 
    if(!validTags.includes(userQuery)){
      return res.status(400).json({err: "Valid tags only, please!"});
    }
 
    ...
  });
```
 
[source](https://planetscale.com/blog/how-to-prevent-sql-injection-attacks-in-node-js)

