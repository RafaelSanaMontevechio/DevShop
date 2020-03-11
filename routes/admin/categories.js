const init = db => {
    
    const router = require('express').Router();
    const categoriesController = require('../../controllers/categories');
    
    router.get('/', categoriesController.adminGetCategories(db));
    
    router.get('/nova', categoriesController.adminCreateCategory(db));
    router.post('/nova', categoriesController.adminCreateCategory(db));

    return router
}

module.exports = init