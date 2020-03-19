const init = db => {

    const router = require('express').Router();
    const categoriesController = require('../../controllers/categories')(db);

    router.get('/', categoriesController.adminGetCategories);

    router.get('/nova', categoriesController.adminCreateCategory);
    router.post('/nova', categoriesController.adminCreateCategory);

    router.get('/editar/:id', categoriesController.adminUpdateCategory);
    router.post('/editar/:id', categoriesController.adminUpdateCategory);

    router.get('/excluir/:id', categoriesController.adminRemoveCategory);

    return router
}

module.exports = init