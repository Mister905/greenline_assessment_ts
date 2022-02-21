import express, { Request, Response } from "express";
import Sale from "../models/Sale";

const router = express.Router();

// @route GET /api/sales
router.get("/", async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find();
    return res.send(sales);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/sale/:sale_id
router.get("/:sale_id", async (req: Request, res: Response) => {
  try {
    const { sale_id } = req.params;
    const sale = await Sale.findById(sale_id);
    return res.send(sale);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/sale/product/:product_id
router.get("/product/:product_id", async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params;
    const sales = await Sale.find({ product_id });
    return res.send(sales);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/sale/product/:product_id
router.post("/product/:product_id", async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params;

    const sale_build = new Sale({
      product: product_id,
    });

    await sale_build.save();

    return res.send(sale_build);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/sale/:sale_id
router.delete("/:sale_id", async (req: Request, res: Response) => {
  try {
    const { sale_id } = req.params;

    await Sale.remove({ _id: sale_id });

    return res.send("Sale deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
