import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const j = req.body;
  const userId = j.userId;
  const accountId = j.accountId;
  const send = j.sendA;
  const sendAd = j.sendAd;
  const walletId = 2;

  const result = await fetch('http://0.0.0.0:8000/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      addr: sendAd,
      btc_amount: Number(send),
      wallet_id: walletId,
      wallet_password: '123',
      api_password: '123',
    }),
  });
  const data = await result.json();

  const re = await prisma.account.update({
    where: {
      id: accountId,
      userId: userId,
    },
    data: {
      balance: {
        decrement: send,
      },
    },
  });

  const url = `http://0.0.0.0:8000/api/detail/${data.sr_id}`;
  const urlhistory = 'http://0.0.0.0:8000/api/history?limit=1';
  const urlsTransqueue = 'http://0.0.0.0:8000/api/queue';

  const transSt = await fetch(url);
  const transHis = await fetch(urlhistory);
  const transSts = await fetch(urlsTransqueue);
  if (!transHis.ok || !transSts.ok || !transSt.ok) {
    throw new Error(`HTTP error! Status: ${transSt.status}`);
    throw new Error(`HTTP error! Status: ${transHis.status}`);
    throw new Error(`HTTP error! Status: ${transSts.status}`);
  }

  const responseHis = await transHis.json();
  const responseDatas = await transSts.json();
  const responseDataSeries = await transSt.json();

  console.log('Raw response:', responseHis);
  console.log('Raw response:', responseDatas);
  console.log('Raw response:', responseDataSeries);

  const withdrawalTransactionData = {
    sr_id: data.sr_id,
    sr_timestamp: responseDataSeries.sr_timestamp,
    sr_address: sendAd,
    sr_amount: send,
    sr_fees: responseDatas[walletId].fee,
  };

  console.log('Raw response:', withdrawalTransactionData);

  res.json(withdrawalTransactionData);
}
