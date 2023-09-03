import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { uuid, status } = req.query;
    
    const j = req.body;
    const id = j.accountId;
    const name = j.username;
    const email = j.email;
    const password = j.password;

    const accountId = uuid;
    const accountUsername = name;
    const balance = 0.000;



    //The following query uses upsert to update a User record with a specific email address,
    // or create that User record if it does not exist
    
    const result = await prisma.user.upsert({
     where:{
        email: email
     },
     create:{
        id : id,
        name : name,
        email : email,
        password : password
     },
     update:{
        password: password
     }

    });

    const result1 = await prisma.account.create({
      data: {
        username: accountUsername,
        user : { connect: { email: email } },
      }
    });

res.json(result);
}
