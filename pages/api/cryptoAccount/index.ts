import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { uuid, status } = req.query;
    
    const j = req.body;
    const id = j.userId;


    const result = await prisma.account.findFirst({
      where: {
        userId:id
      }
    });

    const rem = await fetch(`https://www.blockonomics.co/api/price?currency=${result.currency}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await rem.json()

    const result1 = await prisma.account.update({
      where: {
        id: result.id
      },
      data: {
        conversion: data.price
      }
    });
 
res.json(result1);
}
