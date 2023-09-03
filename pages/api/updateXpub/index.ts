import prisma from '../../../lib/prisma';

export default async function handle(req, res){
const{uuid, status} = req.query;
const j = req.body;
const id = j.accountid;
const xpub = j.xpub;
const recevingad = j.recevingad;
const currency = j.currency;

const result = await prisma.account.update({
    where:{
       id: id
    },
    data:{
       xpub: xpub,
       recevingad :recevingad,
       currency: currency, 
    }
   });
   console.log(xpub);
res.json(result);
}
