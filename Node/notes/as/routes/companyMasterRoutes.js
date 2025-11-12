const express = require('express');
const router = express.Router();
const compnayController = require("../controllers/companyMasterController");

// Departments
router.post("/departments", compnayController.createDepartment);
router.get("/getdepartments", compnayController.fetchDepartments);

// Companies
router.post("/companies", compnayController.createCompany);
router.get("/getcompanies", compnayController.fetchCompanies);

// Branches
router.post("/branches", compnayController.createBranch);
router.get("/getbranches", compnayController.fetchBranches);
router.get("/getbranches/:companyId", compnayController.fetchBranchesByCompany);

// Roles
router.get("/getroles", compnayController.fetchRoles);

// Documents
router.get("/getdocs", compnayController.fetchDocuments);

// Role Mapping Documents
router.get("/getrolemappingdocs/:roleId", compnayController.fetchRoleMappingDocs);

module.exports = router;