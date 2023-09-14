# Crypto Accounts 


https://github.com/aadyanthaya/CryptoAccount/assets/91294460/bb273f82-e65c-41b9-bb9b-d2f6c4811068


This project allows users to create/manage Bitcoin accounts. Users can deposit/withdraw bitcoin into their account similarly to bitcoin exchanges. Crypto accounts system is an integral part of any crypto exchange/crypto games application.

Functionality Overview

Setup:
First,  start my wallet service which creates a new wallet and gives me an Xpub
Then  setup the store in the blockonomics using the above xpub
then I add the api key from blockonomics to my webapp.

Login:
Now  load my web app
then create an account by signing up in the crypto account which creates an account in the database
then it takes you to the account page where he/she can select the currency and see wallet details.

Deposit:
then you go to the deposit tab which uses new_address api and using that address, I goto testbench and make a deposit.
then have a callback URL which gets updated and I update the DB with the new balance.

Withdrawal:
The user clicks on the withdraw button which asks for an address and BTC.
Once the details are entered, I use wallet_service and make a transfer request.
This gives me transaction details and I show it to the user.
