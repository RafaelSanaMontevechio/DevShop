const category = require('../models/category');
const product = require('../models/product');

const getCategories = db => async (req, res) => {
    const products = await product.getProductsByCategoryId(db)(req.params.id);
    const cat = await category.getCategoryById(db)(req.params.id);
    res.render('category', {
        products,
        category: cat
    });
}

const adminGetCategories = db => async (req, res) => {
    const categories = await category.getCategories(db)();
    res.render('admin/categories/index', {
        categories
    });
}

const adminCreateCategory = db => async (req, res) => {
    if (req.method === 'GET') {
        res.render('admin/categories/create');
    } else {
        try {
            await category.createCategory(db)(req.body);
            res.send(req.body);
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = {
    adminGetCategories,
    adminCreateCategory,

    getCategories
}