import prisma from '../../../lib/prisma';
import Big from 'big.js';


const conversion = 100000000;

const toBitcoin = function (satoshi) {
  //validate arg
  var satoshiType = typeof satoshi;
  if (satoshiType === 'string') {
    satoshi = Number(satoshi);
    satoshiType = 'number';
  }
  if (satoshiType !== 'number') {
    throw new TypeError(
      'toBitcoin must be called on a number or string, got ' + satoshiType
    );
  }
  if (!Number.isInteger(satoshi)) {
    throw new TypeError(
      'toBitcoin must be called on a whole number or string format whole number'
    );
  }

  var bigSatoshi = new Big(satoshi);
  return Number(bigSatoshi.div(conversion));
};

export default async function handle(req, res) {
  const { addr, status, value, txid } = req.query;

  const j = req.body;
  const currency = j.currency;

  const addressData = await prisma.address.findFirst({
    where: {
      id: addr,
    },
  });

  const re = await prisma.account.update({
    where: {
      id: addressData.accountId,
    },
    data: {
      balance: {
        increment: toBitcoin(value),
      }
    },
  });

  res.json(re);
}
