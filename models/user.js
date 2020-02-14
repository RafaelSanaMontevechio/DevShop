const bcrypt = require('bcryptjs');

const generatePassHash = passwd => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwd, salt);
    return hash;
}


const initialUser = db => async () => {
    const count = await db('users').count('id as total');
    if (count[0].total === 0) {
        //cria um admin inicial
        const user = {
            name: 'Admin',
            email: 'admin@admin.com',
            passwd: generatePassHash('admin'),//Coloca a senha de sua preferencia
            email_checked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'admin, financial, customer'
        }
        await db('users').insert(user);
    }
}

module.exports = {
    initialUser
}