const companyModel = require("../models/companyMasterModel");

// Departments
const createDepartment = async (req, res) => {
  try {
    const data = await companyModel.insertUpdateDepartment(req.body);
    res.json({ success: true, msg: "Department saved successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const fetchDepartments = async (req, res) => {
  try {
    const data = await companyModel.getDepartments();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Companies
const createCompany = async (req, res) => {
  try {
    const data = await companyModel.insertUpdateCompany(req.body);
    res.json({ success: true, msg: "Company saved successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const fetchCompanies = async (req, res) => {
  try {
    const data = await companyModel.getCompanies();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Branches
const createBranch = async (req, res) => {
  try {
    const data = await companyModel.insertUpdateBranch(req.body);
    res.json({ success: true, msg: "Branch saved successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const fetchBranches = async (req, res) => {
  try {
    const data = await companyModel.getBranches();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const fetchBranchesByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    if (!companyId) return res.status(400).json({ success: false, msg: "Company ID required" });

    const data = await companyModel.getBranchesByCompany(companyId);
    if (!data) return res.status(404).json({ success: false, msg: "No branches found" });

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Roles
const fetchRoles = async (req, res) => {
  try {
    const data = await companyModel.getRoles();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Documents
const fetchDocuments = async (req, res) => {
  try {
    const data = await companyModel.getDocuments();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Role Mapping Docs
const fetchRoleMappingDocs = async (req, res) => {
  try {
    const { roleId } = req.params;
    const data = await companyModel.getRoleMappingDocs(roleId);
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createDepartment,
  fetchDepartments,
  createCompany,
  fetchCompanies,
  createBranch,
  fetchBranches,
  fetchBranchesByCompany,
  fetchRoles,
  fetchDocuments,
  fetchRoleMappingDocs,
};