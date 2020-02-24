const init = db => {
    
    const router = require('express').Router();
    const categoriesController = require('../../controllers/categories');
    
    router.get('/', categoriesController.adminGetCategories(db));

    return router
}

module.exports = init