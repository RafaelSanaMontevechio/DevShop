const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'devshop'
    }
});

/** Visualiza as queries que estão sendo geradas pelo knex */
db.on('query', query => {
    console.log('SQL:', query.sql);
});

const app = require('./app')(db);

const port = process.env.PORT || 3000;

app.listen(port, err => {
    if (err) {
        console.log('Não foi possivel iniciar o servidor!');
    } else {
        console.log('DevShop is running...');
    }
});
