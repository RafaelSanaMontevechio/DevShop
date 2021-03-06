const init = db => {

    const router = require('express').Router();

    const categoriesRouter = require('./categories');
    //const productsRouter = require('./products');

    router.use((req, res, next) => {
        if (req.session.user) {
            if (req.session.user.roles.indexOf('admin') < 0) {
                res.redirect('/');
            } else {
                next();
            }
        } else {
            res.redirect('/login');
        }
    });

    router.get('/', (req, res) => res.render('admin/index'));

    router.use('/categorias', categoriesRouter(db));
    //router.use('/produto', productsRouter(db));

    return router
}

module.exports = init 
