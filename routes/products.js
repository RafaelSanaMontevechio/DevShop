const init = db => {
    const router = require('express').Router();
    const productsController = require('../controllers/products')(db);

    router.get('/:id/:slug', productsController.getProduct);

    return router
}

module.exports = init