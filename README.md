# Crypto Accounts 



https://github.com/aadyanthaya/CryptoAccount/assets/91294460/cdb32d37-bec0-40db-a319-0ae254fcff07









# Functionality Overview 

This project allows users to create and manage Bitcoin accounts. It provides functionalities similar to Bitcoin exchanges, and is an essential component for any crypto exchange or crypto gaming application.

### Setup

1. **Start Wallet Service**: Initialize your wallet service, which will create a new wallet and provide you with an Xpub key.
2. **Blockonomics Setup**: Use the generated Xpub key to set up your store in Blockonomics.
3. **API Key**: Add the API key from Blockonomics to your web application.

## Table of Contents
1. [Login](#login)
2. [Deposit](#deposit)
3. [Withdrawal](#withdrawal)


### Login

1. **Load Web App**: Open your web application in a browser.
2. **Account Creation**: Sign up to create a crypto account, which will also create an account record in the database.
3. **Account Page**: After signing up, you will be redirected to the account page where you can select your currency and view wallet details.

### Deposit

1. **Navigate to Deposit Tab**: Here, the `new_address` API is used to generate a new Bitcoin address.
2. **Testbench Deposit**: Use the newly generated address to make a deposit using a testbench.
3. **Callback URL**: A callback URL will be triggered upon deposit, which will update your database with the new balance.

### Withdrawal

1. **Initiate Withdrawal**: Click on the 'Withdraw' button, which will prompt you to enter a Bitcoin address and the amount of BTC to withdraw.
2. **Transfer Request**: Use the `wallet_service` to initiate the withdrawal.
3. **Transaction Details**: You will receive transaction details which will be displayed to the user.


