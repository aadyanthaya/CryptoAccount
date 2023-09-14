import prisma from '../../../lib/prisma';
export default async function handle(req, res) {
  const { uuid, status } = req.query;
  const j = req.body;
  const userId = j.userId;
  const accountId = j.accountId;

  const result = await fetch('https://www.blockonomics.co/api/new_address', {
    method: 'POST',
    headers: {
      Authorization: 'API Key will go here ',
    },
    body: '',
  });

  const json = await result.json();
  const addId = json.address;

  await prisma.address.create({
    data: {
      id: addId,
      userId: userId,
      accountId: accountId,
    },
  });
  
  console.log('result');
  console.log(json.address);
  res.json(json);
}
