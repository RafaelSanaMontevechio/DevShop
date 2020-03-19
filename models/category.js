const init = db => {

    const slug = require('../utils/slug');
    const validation = require('../utils/validation');
    const Joi = require('@hapi/joi');

    const createSchema = Joi.object().keys({
        category: Joi.string().min(5).max(245).required(),
        descripton: Joi.string().min(5).required()
    });

    const getCategories = async () => {
        const categories = await db('categories').select('*');
        const categoriesWithSlug = categories.map(category => {
            const newCategory = { ...category, slug: slug(category.category) }
            return newCategory
        });
        return categoriesWithSlug
    }

    const getCategoryById = async (id) => {
        const category = await db('categories').select('*').where('id', id)
        return category
    }

    const createCategory = async (category) => {
        const value = validation.validation(category, createSchema);
        await db('categories').insert(value);
        return true;
    }

    const updateCategory = async (id, category) => {
        const value = validation.validation(category, createSchema);
        await db('categories').where({ id }).update(value);
        return true;
    }


    const removeCategory = async (id) => {
        await db('categories').where({ id }).del();
    }
    
    return {
        getCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        removeCategory
    }
}

module.exports = init