# HTTPS Setup

Perform all command from `https` directory.

Install packages

```bash
npm install
```

drop your certificate and key files in the `cert` directory

```bash
mkdir certs
cp /path/to/cert.pem certs/cert.pem
cp /path/to/key.pem certs/key.pem
```

setup `.env` file

```bash
touch .env
```

and add the following (certificate password)

```env
PASSPHRASE="your_passphrase"
```

run the app
    
```bash
npm start
```

access secure website via [https://localhost:8000](https://localhost:8000)


## Additional Resources

Get free certificates from a provider or use `openssl` to generate your own

* [(https://www.openssl.org](https://www.openssl.org)
* [https://letsencrypt.org](https://letsencrypt.org)
* [https://wiseid.com](https://wiseid.com)

 Used references used for this example

* [https://expressjs.com/en/advanced/best-practice-security.html#use-helmet](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet)
* [https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
* [https://nodejs.org/api/https.html](https://nodejs.org/api/https.html)