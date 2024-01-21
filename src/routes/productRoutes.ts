import express from 'express';
import { validateAuthToken, validateStore } from '../middleware';
import { ProductModel } from '../model/ProductModel';
import { Op } from 'sequelize';

const router = express.Router();


router.post('/create', validateAuthToken, validateStore, async (req, res) => {
    const {  product_category_id, name, description, price, inventory_quantity } = req.body;
    const store_id  = res.locals.store.store_id;
    const createdBy  = res.locals.user.user_id;

    if(!product_category_id || !name || !price || !inventory_quantity)
    return res
        .status(400)
        .json({ error: "Product category, name, price and inventory quantity are required" });


    const existing_product = await ProductModel.findOne({
        where: {
            store_id,
            name,
        },
        });
    
        if (existing_product)
        return res.status(403).json({ error: `Product ${name} already exists!` });

    const product = await ProductModel.create({
        store_id,
        product_category_id,
        name,
        description,
        price,
        inventory_quantity,
        createdBy,
    });

    res.status(201).json(product);
});


router.put('/:product_id', validateAuthToken, validateStore, async (req, res) => {
    const { product_id } = req.params;
    const { store_id } = res.locals.store;
    const { product_category_id, name, description, price, inventory_quantity } = req.body;

    await ProductModel.update(
        { product_category_id, name, description, price, inventory_quantity },
        { where: { product_id, store_id } }
    );

    return res.status(201).json({message:"Product Updated successfully!"});
});


router.get('/', validateAuthToken, validateStore, async (req, res) => {
    const { store_id } = res.locals.store;

    const { category, priceMin, priceMax, q } = req.query as any;

    const whereCondition: any = { store_id };

    if (category) {
        whereCondition.product_category_id = category;
    }

    if (priceMin && !isNaN(parseFloat(priceMin))) {
        whereCondition.price = { [Op.gte]: parseFloat(priceMin) };
    }

    if (priceMax && !isNaN(parseFloat(priceMax))) {
        whereCondition.price = {
            ...whereCondition.price,
            [Op.lte]: parseFloat(priceMax),
        };
    }

    if (q) {
        whereCondition.name = { [Op.like]: `%${q}%` };
    }


    const products = await ProductModel.findAll({ where: whereCondition });

    res.json(products);
});


router.get('/:product_id', validateAuthToken, validateStore, async (req, res) => {
    const { product_id } = req.params;
    const { store_id } = res.locals.store;

    const product = await ProductModel.findOne({ where: { product_id, store_id } });

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});


router.delete('/:product_id', validateAuthToken, validateStore, async (req, res) => {
    const { product_id } = req.params;
    const { store_id } = res.locals.store;

    await ProductModel.destroy({ where: { product_id, store_id } });

    res.sendStatus(204);
});

export default router;
