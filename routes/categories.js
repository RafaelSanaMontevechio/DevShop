const init = db => {
    const router = require('express').Router();
    const categoriesController = require('../controllers/categories');
    
    router.get('/:id/:slug', categoriesController.getCategories(db));

    return router
}

module.exports = init