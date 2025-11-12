const {getPool,mssql} = require("../db/db");


// Generic function to execute SP with optional JSON input or parameters
const executeSP = async (spName, payload = {}, paramName = null) => {
  const pool = await getPool();
  const request = pool.request();

  if (paramName && payload !== undefined) {
    request.input(paramName, mssql.NVarChar(mssql.MAX), JSON.stringify(payload));
  }

  const result = await request.execute(spName);
  return result.recordset;
};

// -------------------- Departments --------------------
const insertUpdateDepartment = async (payload) =>
  await executeSP("MA.USP_INS_UPD_DEPARTMENT", payload, "DepartmentJson");

const getDepartments = async () =>
  await executeSP("MA.USP_GET_DEPARTMENTS");

// -------------------- Companies --------------------
const insertUpdateCompany = async (payload) =>
  await executeSP("MA.USP_INSUPD_Company_With_Address_JSON", payload, "CompanyJson");

const getCompanies = async () =>
  await executeSP("MA.USP_GET_Companies_JSON");

// -------------------- Branches --------------------
const insertUpdateBranch = async (payload) =>
  await executeSP("MA.USP_INS_UPD_BRANCH_WITH_ADDRESS", payload, "BranchJson");

const getBranches = async () =>
  await executeSP("MA.USP_GET_All_Branches");

const getBranchesByCompany = async (companyId) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("CompanyID", mssql.Int, companyId)
    .execute("MA.USP_GET_Company_With_Branches_And_Addresses");

  return result.recordset?.[0];
};

// -------------------- Roles --------------------
const getRoles = async () => await executeSP("se.USP_GET_ROLES_JSON");

// -------------------- Documents --------------------
const getDocuments = async () => await executeSP("se.USP_GET_DOCUMENTS_JSON");

// -------------------- Role Mapping Docs --------------------
const getRoleMappingDocs = async (roleId) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("RoleID", mssql.Int, roleId)
    .execute("se.USP_GET_ROLE_DOCUMENTS_JSON");

  return result.recordset;
};

module.exports = {
  insertUpdateDepartment,
  getDepartments,
  insertUpdateCompany,
  getCompanies,
  insertUpdateBranch,
  getBranches,
  getBranchesByCompany,
  getRoles,
  getDocuments,
  getRoleMappingDocs,
};