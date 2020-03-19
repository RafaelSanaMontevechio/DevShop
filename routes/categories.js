const init = db => {
    const router = require('express').Router();
    const categoriesController = require('../controllers/categories')(db);
    
    router.get('/:id/:slug', categoriesController.getCategories);

    return router
}

module.exports = init