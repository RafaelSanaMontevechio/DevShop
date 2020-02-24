const init = db => {

    const router = require('express').Router();

    const home = require('../controllers/home');
    const auth = require('../controllers/auth');

    const admin = require('./admin/index');
    const categoriesRouter = require('./categories');
    const productsRouter = require('./products');

    /** auth */
    router.get('/', home.getIndex);
    router.post('/login', auth.login(db));
    router.get('/logout', auth.logout);
    
    /** router */
    router.use('/admin', admin(db));
    router.use('/categoria', categoriesRouter(db));
    router.use('/produto', productsRouter(db));

    return router
}

module.exports = init 