import express from "express";
import { validateAuthToken, validateStore } from "../middleware";
import { ProductCategoryModel } from "../model/ProductCategoryModel";

const router = express.Router();

router.post("/create", validateAuthToken, validateStore, async (req, res) => {
  const { category_name, description } = req.body;
  const user  = res.locals.user;
  const store_id = res.locals.store.store_id;
  if (!category_name)
    return res.status(400).json({ error: "Please enter Category Name!" });

  const category = await ProductCategoryModel.findOne({
    where: {
      store_id,
      category_name,
    },
  });

  if (category)
    return res.status(403).json({ error: `Category ${category_name} already exists!` });

  const productCategory = await ProductCategoryModel.create({
    category_name,
    description,
    createdBy: user.user_id,
    store_id,
  });

  return res.status(201).json(productCategory);
});

router.put(
  "/:category_id",
  validateAuthToken,
  validateStore,
  async (req, res) => {
    const { category_name, description } = req.body;
    const { category_id } = req.params;
    const store_id  = res.locals.store.store_id;

    const category = await ProductCategoryModel.findOne({
        where: {
          store_id,
          category_id,
        },
      });

    if(!category) return res.status(404).send({error:"Category not found!"})

    await ProductCategoryModel.update(
      { category_name, description },
      { where: { category_id, store_id } }
    );

    return res.status(201).json({message:"Category Updated successfully!"});
  }
);

router.get(
  "/",
  validateAuthToken,
  validateStore,
  async (req, res) => {
    const store_id  = res.locals.store.store_id;

    const productCategories = await ProductCategoryModel.findAll({
      where: { store_id },
    });

    return res.json(productCategories);
  }
);

router.get(
  "/:category_id",
  validateAuthToken,
  validateStore,
  async (req, res) => {
    const { category_id } = req.params;
    const { store_id } = res.locals.store;

    const productCategory = await ProductCategoryModel.findOne({
      where: { category_id, store_id },
    });

    if (!productCategory) {
      return res.status(404).json({ error: "Product category not found" });
    }

    res.json(productCategory);
  }
);

router.delete(
  "/:category_id",
  validateAuthToken,
  validateStore,
  async (req, res) => {
    const { category_id } = req.params;
    const { store_id } = res.locals.store;

    await ProductCategoryModel.destroy({ where: { category_id, store_id } });

    res.sendStatus(204);
  }
);
export default router;
