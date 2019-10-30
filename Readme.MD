# SHOPPING CART FRONTEND

Shopping cart FrontEnd made in Ionic 4. You can watch the NodeJS + ExpressJS + Sequelize + MySQL backend in: https://github.com/JoseAlbertoVazq/shopping-cart-node

## Install

Remember! You have to execute the following command after cloning this repository:

```bash
npm install
```

## First steps

If you want to run this project as a PWA, just run 

```bash
ionic serve
```
If you want to install this app in Android or iOS, you have to run the following commands:

```bash
ionic cordova prepare PLATFORM
```
(You have to execute the previous command only once, if you have already done in the past, just run
this one: )

```bash
ionic cordova run PLATFORM
```

Instead of PLATFORM you have to enter "android" or "ios"

## Where is this project running?

If you are running this project as a PWA, you can have this beautiful frontend in http://localhost:8100

# MOBILE APP

If you chose to run this project in Android or iOS, and your are running the Node backend in localhost on your computer, you have to go to /src/enviroments/enviroment.ts, and change "apiUrl" to: ipaddress:3000 (where ipaddress is your local ip). Mobile internet connection must be in WiFi mode.


Any doubts, any suggestion, any request or any invitation to a good dinner, you can write an issue and I will read it as soon as I can.

## Autor

José Alberto Vázquez López

https://www.linkedin.com/in/josealbertovazq/
https://twitter.com/JoseAlbertoVazq
https://www.instagram.com/JoseAlbertoVazq
https://www.facebook.com/JoseAlbertoVazq