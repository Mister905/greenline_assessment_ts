import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Product";

const router = express.Router();

// @route GET /api/product/company/:company_id
router.get("/company/:company_id", async (req: Request, res: Response) => {
  const { company_id } = req.params;
  const products = await Product.find({ company_id });
  return res.send(products);
});

// @route GET /api/product/:product_id
router.get("/:product_id", async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const product = await Product.findById(product_id);
  return res.send(product);
});

// @route POST /api/product/company/:company_id
router.post(
  "/company/:company_id",
  [check("name", "Product name is a required field").not().isEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company_id } = req.params;

    const { name } = req.body;

    const product_build = new Product({
      company: company_id,
      name,
    });

    await product_build.save();

    return res.send(product_build);
  }
);

// @route PUT /api/product/:product_id
router.put(
  "/:product_id",
  [check("name", "Product name is a required field").not().isEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { product_id } = req.params;

    const { name } = req.body;

    let updated_product = await Product.findOneAndUpdate(
      { _id: product_id },
      {
        name,
      },
      { new: true }
    );
    return res.send(updated_product);
  }
);

// @route DELETE /api/product/product_id
router.delete("/:product_id", async (req: Request, res: Response) => {
  const { product_id } = req.params;

  await Product.remove({ _id: product_id });

  return res.send("Product deleted");
});

module.exports = router;
