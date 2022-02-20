import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Company from "../models/Company";

const router = express.Router();

// @route GET /api/companies
router.get("/", async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    return res.send(companies);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/companies
router.post(
  "/",
  [check("name", "Company name is a required field").not().isEmpty()],

  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name } = req.body;

      const company_build = new Company({ name });

      const company = await company_build.save();

      return res.send(company);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/companies/company_id
router.put(
  "/:company_id",
  [check("name", "Company name is a required field").not().isEmpty()],

  async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/companies/:company_id
router.get("/:company_id", async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;
    const company = await Company.findById(company_id);
    return res.send(company);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/companies/:company_id
router.delete("/:company_id", async (req: Request, res: Response) => {
  try {
    const { company_id } = req.params;

    await Company.remove({ _id: company_id });

    return res.send("Company deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
