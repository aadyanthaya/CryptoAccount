import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';



import prisma from '../lib/prisma';

function Wallet() {
  const [walletID, setWalletID] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [xpub, setXpub] = useState('');
  const [seed, setSeed] = useState('');
  const [currency, setCurrency] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [activeTab, setActiveTab] = useState(null);
  const [username, setUsername] = React.useState('');
  const [accountData, setAccountData] = useState(null);
  const [depositA, setDepositA] = useState('');
  const [sendAdd, setsendAdd] = useState('');
  const [amount, setamount] = useState('');
  const [conversion, setConversion] = useState(0);
  const [dataSend, setDataSend] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          userId: router.query.userId,
        };
        const response = await fetch('/api/cryptoAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Assuming you have the `data` variable available here
        });

        if (response.ok) {
          const data = await response.json();
          setAccountData(data);
          setXpub(data.xpub);
          setCurrency(data.currency);
          setSeed(data.recevingad);
          setConversion((data.conversion * data.balance).toFixed(2));
        } else {
          const errorMessage = await response.text();
          setError(errorMessage);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  const generate = async () => {
    try {
      const data = {
        userId: router.query.userId,
        accountId: accountData.id,
      };
      const response = await fetch('/api/depositAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Assuming you have the `data` variable available here
      });
      if (response.ok) {
        const data = await response.json();
        setDepositA(data.address);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onUpdate = async () => {
    try {
      const data = {
        accountid: accountData.id,
        xpub: xpub,
        recevingad: seed,
        currency: currency,
      };
      const response = await fetch('/api/updateXpub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Assuming you have the `data` variable available here
      });

      if (response.ok) {
        const data = await response.json();
        alert('update success!');
        console.log('updated', data);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const onSend = async () => {
    try {
      const datas = {
        accountid: accountData.id,
        userId: router.query.userId,
        sendAd: sendAdd,
        sendA: amount,
      };
      const response = await fetch('/api/amountWithdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas), // Assuming you have the `data` variable available here
      });

      if (response.ok) {
        const dataSend = await response.json();
        setDataSend(dataSend);
        alert('Amount sent successfully!');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const tabsData = [
    { key: 'details', label: 'Wallet Details' },
    { key: 'deposits', label: 'Deposits' },
    { key: 'withdrawal', label: 'Withdrawal status' },
  ];

  const onExit = () => {
    router.push('/thanks');
  };

  return (
    <div>
      <style>
        {`

.outer-container {
    background-color: #111f2c; /* You can choose any color you like */
    min-height: 100vh; /* This will ensure the background color covers the full height of the viewport */
    display: flex;
    justify-content: center;
    align-items: center; /* These 3 lines will center the wallet-container div in the middle of the viewport */
}
        .wallet-container {
          font-family: Arial, sans-serif;
          width: 800px;
          margin: 0 auto;
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          background-color: #f2f5f8;
        }
        .wallet-container2 {
          font-family: Arial, sans-serif;
          width: 1000px;
          margin: 0 auto;
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          background-color: #f2f5f8;
        }


        .wallet-container h2 {
          font-size: 50px;
          margin-bottom: 20px;
          text-align: center;
          font-color: #0ed39e!important;
        }

        .wallet-container h3 {
          font-size: 40px;
          margin-bottom: 20px;
          text-align: center;
          font-style: Bold;
          font-color: #0ed39e!important;
        }

        .wallet-container label {
          display: block;
          margin: 10px 0 5px;
        }

        .wallet-container input[type="text"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .wallet-container button {
          background-color: #0ed39e!important;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 15px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin: 5px;
        }

        .wallet-container button:hover {
          background-color: #0056b3;
        }
        .logo-container{
            background-color: #111f2c;
            text-align: center;
            top: 0,
            left: 0,
            zIndex: 1000
        }
        .tabs {
          display: flex;
          margin-bottom: 20px;
        }
        .tabs button {
          flex: 1;
          padding: 10px;
          cursor: pointer;
          border: none;
          background-color: #f5f5f5;
          border-bottom: 2px solid transparent;
          transition: border-color 0.3s;
        }
        .tabs button.active {
          border-bottom-color: #0ed39e!important;
        }
        
       
        `}
      </style>

      <div className="outer-container">
        <div className="wallet-container">
          <div>
            <button onClick={onExit}>Exit</button>
          </div>
          <div>
            <input type="text" value={accountData?.id || ''} readOnly />
            <h2>Amount Balance</h2>
            <h3>
              {accountData?.balance || '0.0000000'} BTC === {conversion}{' '}
              {currency}
            </h3>

            <div className="tabs">
              <button
                onClick={() => setActiveTab('login')}
                className={activeTab === 'login' ? 'active' : ''}
              >
                Crypto Account Details
              </button>
              <button
                onClick={() => {
                  setActiveTab('signup');
                  generate();
                }}
                className={activeTab === 'signup' ? 'active' : ''}
              >
                Deposits
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={activeTab === 'profile' ? 'active' : ''}
              >
                Withdrawal
              </button>
            </div>
            {activeTab === 'login' && (
              <div>
                <label>Username:</label>
                <input type="text" value={accountData.username} readOnly />
                <br />
                <label>Currencey Type :</label>
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <br />
                <button onClick={onUpdate}>Update</button>
              </div>
            )}
            {activeTab === 'signup' && (
              <div>
                <br />
                <label>Deposits To :</label>
                <input
                  type="text"
                  value={depositA}
                  onChange={(e) => setDepositA(e.target.value)}
                />
              </div>
            )}
            {activeTab === 'profile' && (
              <div>
                <br />
                <label>Send To :</label>
                <input
                  type="text"
                  value={sendAdd}
                  onChange={(e) => setsendAdd(e.target.value)}
                />
                <br />
                <label>Amount :</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                />
                <button onClick={onSend}>Send</button>
                <h3>Withdrawal Status</h3>
                <table id="transactionTable">
  <thead>
    <tr><th>Transaction Log</th><th>Status</th></tr>
  </thead>
  <tbody>
    {dataSend ? (
      <tr>
        <td>
          Timestamp:{dataSend.sr_timestamp},Sr Id: {dataSend.sr_id},Sending Address: {dataSend.sr_address},SenderAmount: {dataSend.sr_amount},Transaction Fees: {dataSend.sr_fees}
        </td>
        <td>{/* Status information here */}</td>
      </tr>
    ) : (
      <tr>
        <td>No data to display</td>
      </tr>
    )}
  </tbody>
</table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
