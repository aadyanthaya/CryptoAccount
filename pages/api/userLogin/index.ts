import prisma from '../../../lib/prisma';

export default async function handle(req,res){
const{uuid,status} = req.query;
const j = req.body;
const name = j.username;
const password = j.password;

const result = await prisma.user.findFirst({

    where: { name: name,
             password:password }
});
res.json(result);
}