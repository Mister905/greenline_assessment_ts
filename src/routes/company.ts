import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Company from "../models/Company";

const router = express.Router();

// @route GET /api/company
router.get("/", async (req: Request, res: Response) => {
  const companies = await Company.find();
  return res.send(companies);
});

// @route POST /api/company
router.post(
  "/",
  [check("name", "Company name is a required field").not().isEmpty()],

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const company_build = new Company({ name });

    const company = await company_build.save();
    return res.send(company);
  }
);

// @route PUT /api/company/company_id
router.put(
  "/:company_id",
  [check("name", "Company name is a required field").not().isEmpty()],

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const { company_id } = req.params;

    let updated_company = await Company.findOneAndUpdate(
      { _id: company_id },
      {
        name,
      },
      { new: true }
    );
    return res.send(updated_company);
  }
);

// @route GET /api/company/company_id
router.get("/:company_id", async (req: Request, res: Response) => {
  const { company_id } = req.params;
  const company = await Company.findById(company_id);
  return res.send(company);
});

// @route DELETE /api/company/company_id
router.delete("/:company_id", async (req: Request, res: Response) => {
  
  const { company_id } = req.params;

  await Company.remove({ _id: company_id });

  return res.send("Company deleted");
});

module.exports = router;
