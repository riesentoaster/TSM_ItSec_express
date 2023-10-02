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
 
## The mysql client with express.js

https://expressjs.com/en/guide/database-integration.html#mysql

```Terminal
npm install mysql
```

```JavaScript
var userId = 'some user provided value';
var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  // ...
});
```

or with question mark

```JavaScript
connection.query('SELECT * FROM users WHERE id = ?', [userId], function (error, results, fields) {
  if (error) throw error;
  // ...
});
```

Multiple placeholders are mapped to values in the same order as passed. For example, in the following query foo equals a, bar equals b, baz equals c, and id will be userId:

```JavaScript
connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
  if (error) throw error;
  // ...
});
```
