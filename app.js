const init = db => {

    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const app = express();
    const path = require('path');

    const routes = require('./routes');
    const category = require('./models/category');

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    app.use(session({
        secret: 'MyDevshopRules',
        name: 'sessionId',
    }));
    app.use(bodyParser.json({ extended: true }));
    app.use(bodyParser.urlencoded());
    app.use(express.static(path.join(__dirname, 'public')));

    /** Middleware - tudo que é chamado no express passa antes por ele */
    app.use(async (req, res, next) => {
        const categories = await category.getCategories(db)();
        const { user } = req.session;
        /** Envia dados de um middleware para a frente da aplicação */
        res.locals = {
            categories, user
        }
        next();
    });

    app.use(routes(db));

    return app;
}

module.exports = init