const init = db => {
    const router = require('express').Router();
    const productsController = require('../controllers/products');

    router.get('/:id/:slug', productsController.getProduct(db));

    return router
}

module.exports = init