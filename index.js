const express = require('express');
const path = require('path');
const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'devshop'
    }
});

const category = require('./models/category');
const products = require('./models/product');

/** Visualiza as queries que estão sendo geradas pelo knex */
db.on('query', query => {
    console.log('SQL:', query.sql);
});

const app = express()

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    const categories = await category.getCategories(db)();
    res.render('home', {
        categories
    });
});

app.get('/categoria/:id/:slug', async (req, res) => {
    const categories = await category.getCategories(db)();
    const prod = await products.getProductsByCategoryId(db)(req.params.id);
    const cat = await category.getCategoryById(db)(req.params.id);
    res.render('category', {
        products: prod,
        categories,
        category: cat
    });
});

app.listen(port, err => {
    if (err) {
        console.log('Não foi possivel iniciar o servidor!');
    } else {
        console.log('DevShop is running...');
    }
});