const express = require("express");
const app = express();
const serverPort = 3400;
const sql = require("mssql");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// ✅ Needed to parse JSON from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
  user: "sa",
  password: "p@ssw0rd",
  server: "localhost", // or '127.0.0.1' or 'localhost\\SQLEXPRESS'
  database: "SAMskruthiAirlines",
  options: {
    encrypt: false, // use true for Azure
    trustServerCertificate: true, // required for self-signed certificates
  },
};

//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

/* -----Tripjack----------- */
//get all flights data
const flightsRoutes = require("./TRIPJACK/routes/flightroutes");
app.use("/api/flights", flightsRoutes);

//get the reviews from tripjack
const reviewRoutes = require("./TRIPJACK/routes/reviewRoutes");
app.use("/api/flights", reviewRoutes);

//seat
const seatRoutes = require("./TRIPJACK/routes/seatRoutes");
app.use("/api/flights", seatRoutes);

//farerule
const fareruleRoutes = require("./TRIPJACK/routes/fareruleRoutes");
app.use("/api/flights", fareruleRoutes);

//book booking-details
const bookingRoutes = require("./TRIPJACK/routes/bookingRoutes");
app.use("/api/flights", bookingRoutes);



const tripPlanRoutes = require("./TRIPJACK/routes/tripPlanRoutes");
app.use("/api",tripPlanRoutes);


/* passenger booking */
const passengerBookingRoutes = require("./routes/passengerBookingRoutes");
app.use('/api/flights',passengerBookingRoutes);






/* --------------end of tripjack ------------ */


/* states,countries,cities,districts,nationalities,genders */
const masterDataRoutes = require("./routes/masterDataRoutes");
app.use("/api/master",masterDataRoutes);

/* departments,roles,branches,companies,documents */
const companyMasterRoutes = require("./routes/companyMasterRoutes");
app.use("/api/company",companyMasterRoutes);



/* -----------travel portal------------- */
//employeeotp
const empRoutes = require("./routes/employeeRoutes");
app.use("/employee",empRoutes);


//get airlines
const airlinesRoutes = require("./routes/airlinesRoutes");
app.use('/api/flights',airlinesRoutes)


//get airports
const airportRoutes = require("./routes/airportsRoutes");
app.use("/api/flights",airportRoutes)



/*-----------------corporate admin portal-------------------- */
//admin logins
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin",adminRoutes)








// COUNTRIES
app.get("/getcountries", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("ma.USP_GET_COUNTRIES_JSON"); //

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("DB error:", err);
    res
      .status(500)
      .json({ error: "Database query failed", details: err.message });
  }
});

app.post("/POST_COUNTRY_JSON", async (req, res) => {
  try {
    const loginPayload = req.body; // Get the full JSON from the client
    console.log(loginPayload, "Received JSON");

    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify(loginPayload))
      .execute("MA.USP_INSERTUPDATE_COUNTRY_JSON");

    res.status(200).json({
      message: "Country Master Insert/Update successful",
      result: result.recordset,
    });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({
      error: "Database query failed",
      details: err.message,
    });
  }
});

//STATES

app.get("/getstates", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("ma.USP_GET_STATES_JSON"); //

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("DB error:", err);
    res
      .status(500)
      .json({ error: "Database query failed", details: err.message });
  }
});

app.post("/post_states", async (req, res) => {
  try {
    const loginPayload = req.body; // Get the full JSON from the client
    console.log(loginPayload, "Received JSON");

    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify(loginPayload))
      .execute("MA.USP_INSERTUPDATE_COUNTRY_JSON");

    res.status(200).json({
      message: "Country Master Insert/Update successful",
      result: result.recordset,
    });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({
      error: "Database query failed",
      details: err.message,
    });
  }
});

//CITIES
app.get("/getcities", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    // send empty JSON to satisfy SP requirement
    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify({}))
      .execute("MA.USP_GET_CITIES_JSON");

    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ msg: "Database Query Error", error: err.message });
  }
});

//CITIES Creation
app.post("/POST_CITIES_JSON", async (req, res) => {
  const cititesPayload = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify(cititesPayload))
      .execute("MA.USP_INSERTUPDATE_CITIES_JSON");
    res.status(200).json({
      msg: "Cities Master Insert/Update Successfull",
      result: result.recordset,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Database query failed", result: result.recordset });
  }
});

//DISTRICTS
app.get("/get_districts", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("ma.USP_GET_DISTRICTS_JSON");
    res.status(200).json(result.recordset);
  } catch (err) {
    res.send(500).json({ error: "db query failed", error: err.message });
  }
});

//district creation
app.post("/POST_DISTRICTS_JSON", async (req, res) => {
  const districtsPayload = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify(districtsPayload))
      .execute("MA.USP_INSERTUPDATE_DISTRICTS_JSON");
    res.status(200).json({
      msg: "Districts Master Insert/Update Successful",
      result: result.recordset,
    });
  } catch (err) {
    res.status(500).json({ msg: "Database query failed ", error: err.message });
  }
});

//AREAS
app.get("/getareas", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("ma.USP_GET_AREAS_JSON");
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ msg: "Database Query Error", error: err.message });
  }
});

//AREAS creation

app.post("/POST_AREAS_JSON", async (req, res) => {
  const areasPayload = req.query;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify(areasPayload))
      .execute("MA.USP_INSERTUPDATE_AREAS_JSON");
    res.send(200).json({
      msg: "Areas Master Insert/Update Successfull",
      result: result.recordset,
    });
  } catch (err) {
    res.status(500).json({ msg: "Database Query Failed", error: err.message });
  }
});

//GENDERS
app.post("/getgenders", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const jsonInput = JSON.stringify(req.body || {}); // send {} if empty

    const result = await pool
      .request()
      .input("JsonInput", sql.NVarChar(sql.MAX), jsonInput)
      .execute("MA.USP_GET_GENDERS_JSON");

    const genders = JSON.parse(result.recordset[0].Result);
    res.status(200).json(genders);
  } catch (err) {
    res.status(500).json({ msg: "Database query error", error: err.message });
  }
});

// GET /getgenders
app.get("/getgenders", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const jsonInput = JSON.stringify({}); // empty JSON to fetch all

    const result = await pool
      .request()
      .input("JsonInput", sql.NVarChar(sql.MAX), jsonInput)
      .execute("MA.USP_GET_GENDERS_JSON");

    const genders = JSON.parse(result.recordset[0].Result);
    res.status(200).json(genders); // ✅ send response to client
  } catch (err) {
    res.status(500).json({ msg: "Database query error", error: err.message });
  }
});

//NATIONALITIES

app.get("/getnationalities", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .execute("MA.GET_USP_NATIONALITIES_JSON");
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ msg: "Database query failed", error: err.message });
  }
});

//NATINALITIES

app.post("/POST_NATIONALITIES_JSON", async (req, res) => {
  let nationalitiesPayload = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input(
        "JSON",
        sql.NVarChar(sql.MAX),
        JSON.stringify(nationalitiesPayload)
      )
      .execute("MA.USP_INSERTUPDATE_NATIONALITIES_JSON");
    res.status(200).json({
      msg: "Nationalties Master Insert/Update Successfull",
      result: result.recordset,
    });
  } catch (err) {
    res.status(500).json({ msg: "Db Query error", error: err.message });
  }
});

//Travel app  employee login

/*
 * Validate OTP (Employee login)
 */
app.get("/validateotp", async (req, res) => {
  const { otp } = req.query;
  console.log("Received OTP:", otp);

  if (!otp) {
    return res.status(400).json({ success: false, msg: "OTP is required" });
  }

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify({ OTP: otp }))
      .execute("SE.USP_VERIFY_OTP_LOGIN");

    console.log("Raw DB recordset:", result.recordset);

    const response = result.recordset?.[0];
    let parsedData = null;

    if (response) {
      // Handle SQL Server FOR JSON output
      if (response["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]) {
        parsedData = JSON.parse(
          response["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        );
      } else {
        parsedData = response;
      }
    }

    const isValidValue = Number(parsedData?.IsValid) || 0;

    if (isValidValue === 1) {
      return res.status(200).json({
        success: true,
        data: parsedData,
        isValid: 1,
      });
    } else {
      return res.status(401).json({
        success: false,
        isValid: 0,
        message: "Invalid OTP",
      });
    }
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ success: false, error: "Database query failed" });
  }
});

/*
 * Generate OTP (Employee only)
 */
const { sendEmail } = require("./services/emailService");
app.post("/insupd_otp", async (req, res) => {
  try {
    const loginPayload = req.body;
    console.log("coming from frontend:", loginPayload);

    // Step 1: Validate email
    if (!loginPayload.EMAIL || !/\S+@\S+\.\S+/.test(loginPayload.EMAIL)) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    const pool = await sql.connect(dbConfig);

    // Step 2: Check if email exists
    const userCheck = await pool
      .request()
      .input("EMAIL", sql.NVarChar(255), loginPayload.EMAIL)
      .query("SELECT 1 AS ExistsFlag FROM SE.Users WHERE Email = @EMAIL");

    if (userCheck.recordset.length === 0) {
      return res.status(404).json({ error: "Email not registered" });
    }

    // Step 3: Generate OTP
    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify(loginPayload))
      .execute("SE.USP_INSERT_OTP_LOG_JSON");

    const dbResult =
      result.recordset && result.recordset.length > 0
        ? result.recordset[0]
        : null;

    const otp = dbResult?.OTP || null;

    if (!otp) {
      return res.status(500).json({ error: "OTP not generated by DB" });
    }

    // Step 4: Send OTP email
    await sendEmail({
      to: loginPayload.EMAIL,
      subject: "Your OTP for Secure Verification – Samskruthi Airlines",
      text: `Dear Customer,

Your One-Time Password (OTP) is: ${otp}

Please enter this code to complete your verification.
This OTP is valid for ${process.env.OTP_EXPIRY} minutes.
For your security, do not share this code with anyone.

If you did not request this OTP, please ignore this message.

Best regards,
Samskruthi Airlines – Security Team`,

      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #000;">
      <h2 style="color: #000; margin-bottom: 10px;">Samskruthi Airlines</h2>
      <p>Dear Customer,</p>
      <p>Your One-Time Password (OTP) is: 
        <strong style="font-size: 18px; color: #000;">${otp}</strong>
      </p>
      <p>Please enter this code to complete your verification.</p>
      <p>This OTP is valid for <b style="color: #000;">${process.env.OTP_EXPIRY} minutes</b>.</p>
      <p>For your security, do not share this code with anyone.</p>
      <p>If you did not request this OTP, please ignore this message.</p>
      <br/>
      <p>Best regards,</p>
      <p><strong>Samskruthi Airlines – Security Team</strong></p>

      <br/><br/>

      <!-- Footer logo from local attachment -->
      <div style="text-align: center; margin-top: 30px;">
        <img src="cid:airlineslogo" alt="Samskruthi Airlines Logo" style="width: 120px;"/>
      </div>
    </div>
  `,

      attachments: [
        {
          filename: "airlineLogo.png", // name of file
          path: path.join(__dirname, "./assets/airlineLogo.png"), // local path to your logo
          cid: "airlineslogo", // same as in img src
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("Error in /insupd_otp:", err);
    res.status(500).json({ error: "Request failed", details: err.message });
  }
});

// Login   FOR CORPORATE PORTAL
app.get("/login", async (req, res) => {
  try {
    const { email, password, otp } = req.query;

    console.log("login details:", email, password);
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const pool = await sql.connect(dbConfig);

    const payload = JSON.stringify({
      EMAIL: email,
      PASSWORD: password,
      OTP: otp,
    });

    const result = await pool
      .request()
      .input("JSON", sql.NVarChar, payload)
      .execute("SE.USP_VERIFY_OTP_LOGIN");

    const rawData = result.recordset?.[0];

    if (!rawData) {
      return res.status(401).json({
        error: "No response from database",
      });
    }

    // 🔹 Your proc is returning something like:
    // { "JSON_xxx": "{\"STATUS\":\"SUCCESS\",\"MESSAGE\":\"OTP verified successfully\",\"IsValid\":1}" }

    // Extract JSON string from first column
    const firstKey = Object.keys(rawData)[0];
    const parsed = JSON.parse(rawData[firstKey]);

    // 🔹 Return only the SQL output
    return res.json(parsed);
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({
      error: err.message,
    });
  }
});

/* 
SUPER MANAGER OR ONBOARDING
*/

// ===== Ensure uploads folder exists =====

const multer = require("multer");
// ===== Multer Setup =====
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ===== Multer Setup =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ===== FIXED POST API =====
app.post(
  "/onboardmanager",
  upload.fields([
    { name: "governmentIdProof", maxCount: 1 },
    { name: "companyIdProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let payload = {};

      // ✅ If "payload" is provided as string → parse it
      if (req.body.payload) {
        try {
          payload = JSON.parse(req.body.payload);
        } catch (err) {
          return res
            .status(400)
            .json({ error: "Invalid JSON in payload field" });
        }
      } else {
        // ✅ Otherwise, use req.body directly (for Postman raw JSON or form-data key-values)
        payload = req.body;
      }

      console.log("📥 Incoming Employee Payload:", payload);
      console.log("📂 Uploaded Files:", Object.keys(req.files || {}));

      if (
        !payload.Employee ||
        !Array.isArray(payload.Employee) ||
        payload.Employee.length === 0
      ) {
        return res.status(400).json({ error: "Employee data is required" });
      }

      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input("JsonInput", sql.NVarChar(sql.MAX), JSON.stringify(payload))
        .execute("MA.USP_INSERTUPDATE_ManagerOnboarding_JSON");

      const fullName = `${payload.Employee[0].FirstName || ""} ${
        payload.Employee[0].LastName || ""
      }`.trim();
      console.log(`✅ Manager onboarded successfully: ${fullName || "N/A"}`);

      res.status(200).json({
        success: true,
        message: "Manager Onboarding inserted/updated successfully",
        onboardedEmployee: fullName || null,
        data: result.recordset,
      });
    } catch (error) {
      console.error("❌ Onboarding Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

/* ===============================
  Manager/Employees  Onboarding
================================= */
// Get All Employees
app.get("/getAll", async (req, res) => {
  try {
    console.log("📡 [BACKEND] /getAll API hit from frontend ✅");

    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("MA.USP_GET_EMPLOYEES_JSON");

    let employees = [];
    if (result.recordset.length && result.recordset[0].ResultJson) {
      employees = JSON.parse(result.recordset[0].ResultJson);
    }

    console.log(
      "✅ [BACKEND] Employees fetched successfully:",
      employees.length
    );

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (err) {
    console.error("❌ [BACKEND] Error fetching employees:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

//  Create / Update Employee
app.post("/create", async (req, res) => {
  try {
    console.log("📡 [BACKEND] /create API hit from frontend ✅");
    console.log("📥 [BACKEND] Payload received:", req.body);

    const empPayload = req.body;

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("EmployeeJson", sql.NVarChar(sql.MAX), JSON.stringify(empPayload))
      .output("ResultJson", sql.NVarChar(sql.MAX))
      .execute("MA.USP_INSERTUPDATE_EMPLOYEES_JSON");

    const parsedOutput = JSON.parse(result.output.ResultJson);

    console.log(
      "✅ [BACKEND] Employee inserted/updated successfully:",
      parsedOutput
    );

    res.status(200).json({
      success: true,
      message: "Employee inserted/updated successfully",
      data: parsedOutput,
    });
  } catch (err) {
    console.error("❌ [BACKEND] Error inserting/updating employees:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});



/*  app.post("/users", async (req, res) => {
  try {
    const {  email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "All fields required" });
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input("Email", sql.NVarChar(255), email)
      .input("Password", sql.NVarChar(255), password) // ⚠️ hash it with bcrypt ideally
      .execute("SE.USP_INSERT_OTP_LOG_JSON");

    const userId = result.recordset[0]?.UserId;

    res.status(201).json({
      success: true,
      msg: "User created successfully",
      userId
    });
  } catch (err) {
    console.error("Error in /users:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
  */

/*DEPARTMENTS*/
// POST: Insert/Update Department
app.post("/departments", async (req, res) => {
  try {
    const departmentPayload = req.body; // full payload

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input(
        "DepartmentJson",
        sql.NVarChar(sql.MAX),
        JSON.stringify(departmentPayload)
      )
      .execute("MA.USP_INS_UPD_DEPARTMENT");

    res.json({
      success: true,
      msg: "Department saved successfully",
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error in POST /departments:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Fetch Departments
app.get("/getdepartments", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("MA.USP_GET_DEPARTMENTS");

    res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error("Error in GET /departments:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* COMPANIES */
app.post("/companies", async (req, res) => {
  try {
    const companiesPayload = req.body;

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input(
        "CompanyJson",
        sql.NVarChar(sql.MAX),
        JSON.stringify(companiesPayload)
      )
      .execute("MA.USP_INSUPD_Company_With_Address_JSON");

    res.json({
      success: true,
      msg: "Company saved successfully",
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error in POST /companies:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fetch Companies
app.get("/getcompanies", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("MA.USP_GET_Companies_JSON");

    res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error("Error in GET /companies:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ===============================
   BRANCHES
================================= */
// POST: Insert/Update Branch with Address
app.post("/branches", async (req, res) => {
  try {
    const branchPayload = req.body;

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("BranchJson", sql.NVarChar(sql.MAX), JSON.stringify(branchPayload))
      .execute("MA.USP_INS_UPD_BRANCH_WITH_ADDRESS");

    res.json({
      success: true,
      msg: "Branch saved successfully",
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error in POST /branches:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/getbranches", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("MA.USP_GET_All_Branches");
    res.json({ success: true, data: result.recordset });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET branches by company
app.get("/getbranches/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res
        .status(400)
        .json({ success: false, msg: "Company ID is required" });
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("CompanyID", sql.Int, companyId)
      .execute("MA.USP_GET_Company_With_Branches_And_Addresses");

    const companyData = result.recordset?.[0];

    if (!companyData) {
      return res.status(404).json({ success: false, msg: "No branches found" });
    }

    res.json({ success: true, data: companyData });
  } catch (err) {
    console.error("Error in /getbranches:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* Travel Portal */

// airports

// GET /airports?query=hyd
app.get("/GetAirports", async (req, res) => {
  try {
    let { searchTerm } = req.query;

    // ✅ Ensure searchTerm is either a clean string or null
    if (!searchTerm || !searchTerm.trim()) {
      searchTerm = null;
    } else {
      searchTerm = searchTerm.trim();
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("SearchTerm", sql.NVarChar(100), searchTerm)
      .execute("MA.USP_GetAirports_JSON");

    let airportsJson = [];

    if (result.recordset.length > 0) {
      // Take the first row's first column (unnamed JSON text)
      const rawJson = Object.values(result.recordset[0])[0];
      if (rawJson) {
        airportsJson = JSON.parse(rawJson);
      }
    }

    res.status(200).json(airportsJson);
  } catch (err) {
    console.error("Error fetching airports:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// POST /airports/search
app.post("/InsertAirport", async (req, res) => {
  try {
    const {
      AirportCode,
      AirportName,
      CityID,
      StateID,
      CountryID,
      OrgID,
      GrpID,
      LocID,
      IsActive,
      CreatedBy,
    } = req.body;

    // 🔍 Basic validation
    if (!AirportCode || !AirportName || !CityID || !CountryID || !CreatedBy) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // ✅ Convert request body into JSON string for SQL
    const airportJson = JSON.stringify({
      AirportCode,
      AirportName,
      CityID,
      StateID,
      CountryID,
      OrgID,
      GrpID,
      LocID,
      IsActive,
      CreatedBy,
    });

    const pool = await sql.connect(dbConfig);

    // ✅ Call stored procedure with parameter
    const result = await pool
      .request()
      .input("AirportJSON", sql.NVarChar(sql.MAX), airportJson) // must match @AirportJSON
      .execute("MA.USP_InsertAirport_JSON");

    // ✅ Extract JSON string from weird SQL column name
    const spResponse = result.recordset[0];
    const jsonString = spResponse && Object.values(spResponse)[0];
    const responseJson = jsonString ? JSON.parse(jsonString) : {};

    res.status(200).json(responseJson);
  } catch (err) {
    console.error("Error inserting airport:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// AIRLINES

// GET /airlines?search=air
app.get("/getAirlines", async (req, res) => {
  try {
    const { search } = req.query; // frontend sends ?search=air

    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("SearchTerm", sql.NVarChar(100), search || null)
      .execute("MA.USP_GETAIRLINES_JSON");

    // ✅ Get first column name dynamically
    const jsonColumnName = Object.keys(result.recordset[0] || {})[0];
    let parsedData = [];

    if (jsonColumnName) {
      const jsonValue = result.recordset[0][jsonColumnName];

      if (
        jsonValue &&
        typeof jsonValue === "string" &&
        jsonValue.trim() !== ""
      ) {
        try {
          parsedData = JSON.parse(jsonValue);
        } catch (err) {
          console.error("Invalid JSON from DB:", jsonValue);
          parsedData = [];
        }
      }
    }

    // ✅ Include images safely
    parsedData = parsedData.map((item) => {
      // Option 1: If IMAGEURL/THUMBNAILURL present
      item.ImageURL = item.IMAGEURL || null;
      item.ThumbnailURL = item.THUMBNAILURL || null;

      // Option 2: Convert VARBINARY photo to base64
      if (item.Photo) {
        try {
          item.PhotoBase64 = Buffer.from(item.Photo).toString("base64");
        } catch (e) {
          console.error("Error converting Photo to base64:", e);
          item.PhotoBase64 = null;
        }
        delete item.Photo; // optional
      }

      return item;
    });

    res.json(parsedData);
  } catch (err) {
    console.error("Error in /getAirlines:", err);
    res.status(500).send("Server Error");
  }
});


//triptypes
app.get("/getTripTypes",async(req,res)=>
{
  try{
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM [MA].[TripTypes]`);
    res.status(200).json({
      success:true,
      data:result.recordset
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:'Error Fetching Details',
      error:err.message
    })
  }
})

/*----trip/passenger booking details----*/
/* app.post('/trip-plan', async (req, res) => {
  try {
    // Grab the entire payload from frontend
    const tripPayload = req.body;

    // Convert payload to JSON string for stored procedure
    const jsonInput = JSON.stringify(tripPayload);

    // Connect to MSSQL
    const pool = await sql.connect(dbConfig);

    // Call Insert/Update stored procedure
    const result = await pool.request()
      .input('JSON', sql.NVarChar(sql.MAX), jsonInput)
      .execute('TR.USP_InsertUpdate_TripPlan_Full');

    // Return response
    res.json({
      success: true,
      message: 'Trip plan saved successfully',
      data: result.recordset[0]  // contains TripPlanID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.get('/trip-plan/:id', async (req, res) => {
  try {
    const tripPlanID = parseInt(req.params.id);
    if (!tripPlanID) {
      return res.status(400).json({ success: false, error: 'TripPlanID is required' });
    }

    const jsonInput = JSON.stringify({ TripPlanID: tripPlanID });

    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input('JSON', sql.NVarChar(sql.MAX), jsonInput)
      .execute('[TR].[USP_Get_TripPlan_Full]');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Trip plan not found' });
    }

    // Get the first row
    const row = result.recordset[0];

    // Find the first column dynamically
    const firstKey = Object.keys(row)[0];
    const tripPlanJson = row[firstKey];

    // Parse the JSON string returned by SQL
    const tripPlan = JSON.parse(tripPlanJson);

    res.json({
      success: true,
      data: tripPlan
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
 */

/* const bookingController = require('./TRIPJACK/controller/bookingController')

const calculateAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const genderMap = { Male: 1, Female: 2, Other: 3 };
const nationalityMap = { IN: 356, US: 840, UK: 826 }; // extend as needed

// 🔹 Main mapper
function mapFrontendToDB(payload) {
  const tripTypeMap = { oneway: 1, roundtrip: 2, multicity: 3 };

  // Generate or use given bookingId
  const bookingId = payload.bookingId ||

  // TripPlan
  const tripPlan = {
    TripPlanID: null,
    UserID: payload.userId || 101,
    TripTypeID: tripTypeMap[payload.tripType?.toLowerCase()] || null,
    TripFromID: payload.tripFromId || null,
    TripToID: payload.tripToId || null,
    TripDate: payload.tripDate || null,
    TotalPassengers:
      (payload.adults?.length || 0) +
      (payload.children?.length || 0) +
      (payload.infants?.length || 0),
    ClassTypeID: payload.classTypeId || null,
    AirlineID: payload.airlineId || null,
    Notes: payload.notes || null,
    OrgID: payload.orgId || null,
    GrpID: payload.grpId || null,
    LocID: payload.locId || null,
    IsActive: "Y",
    CreatedBy: payload.userId || 101,
  };

  // Flights
  const flights = (payload.flights || []).map((f) => ({
    FlightID: null,
    FlightNumber: f.flightNumber,
    AirlineID: f.airlineId,
    StopsID: f.stops || 0,
    Departure_DateTime: f.departure,
    Arrival_DateTime: f.arrival,
    Duration_Minutes: f.duration,
    Origin_AirportID: f.originAirportId,
    Destination_AirportID: f.destinationAirportId,
    FlightClassID: f.classId,
    IsActive: "Y",
    CreatedBy: payload.userId || 101,
  }));

  // Passengers
  const passengers = [
    ...(payload.adults || []).map((a, idx) => ({
      PassengerID: null,
      BookingID: bookingId, // ✅ never NULL
      UserID: payload.userId || 101,
      FullName: `${a.firstName} ${a.lastName}`.trim(),
      GenderID: genderMap[a.gender] || null,
      Age: calculateAge(a.dateOfBirth),
      DateOfBirth: a.dateOfBirth,
      IsChild: 0,
      NationalityID: nationalityMap[a.nationality] || null,
      PassportNumber: a.passportNumber || null,
      SeatID: a.seatId || null,
      MealID: a.mealId || null,
      Special_Needs: a.specialNeeds || null,
      IsPrimary: idx === 0 ? 1 : 0,
      IsActive: "Y",
      CreatedBy: payload.userId || 101,
    })),
    ...(payload.children || []).map((c) => ({
      PassengerID: null,
      BookingID: bookingId, // ✅ never NULL
      UserID: payload.userId || 101,
      FullName: `${c.firstName} ${c.lastName}`.trim(),
      GenderID: genderMap[c.gender] || null,
      Age: calculateAge(c.dateOfBirth),
      DateOfBirth: c.dateOfBirth,
      IsChild: 1,
      NationalityID: nationalityMap[c.nationality] || null,
      PassportNumber: c.passportNumber || null,
      SeatID: c.seatId || null,
      MealID: c.mealId || null,
      Special_Needs: c.specialNeeds || null,
      IsPrimary: 0,
      IsActive: "Y",
      CreatedBy: payload.userId || 101,
    })),
    ...(payload.infants || []).map((i) => ({
      PassengerID: null,
      BookingID: bookingId, // ✅ never NULL
      UserID: payload.userId || 101,
      FullName: `${i.firstName} ${i.lastName}`.trim(),
      GenderID: genderMap[i.gender] || null,
      Age: calculateAge(i.dateOfBirth),
      DateOfBirth: i.dateOfBirth,
      IsChild: 2,
      NationalityID: nationalityMap[i.nationality] || null,
      PassportNumber: i.passportNumber || null,
      SeatID: null,
      MealID: i.mealId || null,
      Special_Needs: i.specialNeeds || null,
      IsPrimary: 0,
      IsActive: "Y",
      CreatedBy: payload.userId || 101,
    })),
  ];

  // FlightPrize
  const flightPrize = (payload.flightPrize || []).map((p) => ({
    FlightPrizeID: null,
    BasePrice: p.basePrice,
    Tax: p.tax,
    IsActive: "Y",
    CreatedBy: payload.userId || 101,
    FlightNumber: p.flightNumber,
  }));

  return { TripPlan: tripPlan, Flights: flights, Passengers: passengers, FlightPrize: flightPrize };
}

*/


/* {
  "tripPlan": {  
    "TripPlanID": null,
    "UserID": 1001,
    "TripTypeID": 2,
    "TripFromID": 10,
    "TripToID": 20,
    "TripDate": "2025-09-15",
    "TotalPassengers": 2,
    "ClassTypeID": 1,
    "AirlineID": 200,
    "Notes": "Family vacation",
    "OrgID": 5,
    "GrpID": 6,
    "LocID": 7,
    "IsActive": "Y",
    "CreatedBy": 1,
    "IsInternational": true
  },
  "flights": [
    {
      "FlightID": null,
      "FlightNumber": "AI302",
      "AirlineID": 200,
      "StopsID": 0,
      "Departure_DateTime": "2025-09-15T08:30:00",
      "Arrival_DateTime": "2025-09-15T11:15:00",
      "Duration_Minutes": 165,
      "Origin_AirportID": 100,
      "Destination_AirportID": 200,
      "FlightClassID": 1,
      "IsActive": "Y",
      "CreatedBy": 1
    }
  ],
  "flightPrize": [
    {
      "FlightPrizeID": null,
      "BasePrice": 6000,
      "Tax": 800,
      "IsActive": "Y",
      "CreatedBy": 1,
      "FlightNumber": "AI302"
    }
  ],
  "formData": {
    "adults": [
      {
        "TitleID": "Ms",
        "firstName": "Alice",
        "lastName": "Johnson",
        "gender": 2,
        "age": 28,
        "dateOfBirth": "1997-06-15",
        "nationality": 356,
        "passportNumber": "P12345678",
        "passportIssueDate": "2020-01-01",
        "passportExpiryDate": "2030-01-01",
        "seatID": 5,
        "mealID": 2
      },
      {
        "TitleID": "Mr",
        "firstName": "Bob",
        "lastName": "Johnson",
        "gender": 1,
        "age": 30,
        "dateOfBirth": "1995-09-20",
        "nationality": 356,
        "passportNumber": "P87654321",
        "passportIssueDate": "2020-01-01",
        "passportExpiryDate": "2030-01-01",
        "seatID": 6,
        "mealID": 1
      }
    ],
    "children": [],
    "infants": []
  }
}
 */


const { reviewFlight } = require("./TRIPJACK/services/tripJack");

app.post("/trip-plan", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const { tripPlan, flights, flightPrize, formData, priceId } = req.body;

    // Validate required fields
    if (!tripPlan?.UserID) {
      return res.status(400).json({ success: false, error: "TripPlan.UserID is required" });
    }
    if (!priceId) {
      return res.status(400).json({ success: false, error: "priceId is required to get TripJack BookingID" });
    }

    // Step 1: Get TripJack BookingID via review API
    const reviewResponse = await reviewFlight([priceId]);
    if (!reviewResponse?.bookingId) {
      return res.status(400).json({
        success: false,
        message: "TripJack review failed, bookingId not generated",
        data: reviewResponse,
      });
    }
    const bookingID = reviewResponse.bookingId;

    // Step 2: Prepare TripPlan data
    const tripPlanData = {
      ...tripPlan,
      UserID: tripPlan.UserID,
      CreatedBy: tripPlan.CreatedBy || tripPlan.UserID || 1,
    };

    const international = tripPlan.IsInternational || false;

    // Step 3: Map passenger details
    const mapPassenger = (p, type) => ({
      TitleID: p.TitleID || null,
      FirstName: p.firstName || "",
      MiddleName: p.middleName || null,
      LastName: p.lastName || "",
      GenderID: p.gender ? Number(p.gender) : 1,
      Age: p.age || null,
      DateOfBirth: p.dateOfBirth || null,
      NationalityID: p.nationality ? Number(p.nationality) : 1,
      PassportNumber: international ? p.passportNumber || null : null,
      SeatID: p.seatID || null,
      MealID: p.mealID || null,
      Email: p.email || null,
      MobileNumber: p.mobileNumber || null,
      IsChild: type === "child" ? "1" : "0",
      IsPrimary: type === "adult" ? "1" : "0",
      CreatedBy: tripPlanData.CreatedBy,
    });

    // Step 4: Build passengers array
    const passengers = [
      {
        BookingID: bookingID, // ✅ Use TripJack bookingId
        UserID: tripPlanData.UserID,
        CreatedBy: tripPlanData.CreatedBy,
        PassengerDetails: [
          ...(formData.adults || []).map((p) => mapPassenger(p, "adult")),
          ...(formData.children || []).map((p) => mapPassenger(p, "child")),
          ...(formData.infants || []).map((p) => mapPassenger(p, "infant")),
        ],
      },
    ];

    // Step 5: Validate required passenger fields
    const invalidPassenger = passengers[0].PassengerDetails.find(
      (pd) => !pd.GenderID || !pd.NationalityID || (international && !pd.PassportNumber)
    );
    if (invalidPassenger) {
      return res.status(400).json({
        success: false,
        error: "All passengers must have required fields filled (gender, nationality, passport for international).",
      });
    }

    // Step 6: Build JSON payload for stored procedure
    const jsonPayload = JSON.stringify({
      TripPlan: tripPlanData,
      Flights: flights || [],
      FlightPrize: flightPrize || [],
      Passengers: passengers,
    });

    // Step 7: Execute stored procedure
    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), jsonPayload)
      .execute("TR.USP_InsertUpdate_TripPlan_Full");

    res.status(201).json({
      success: true,
      tripPlanID: result.recordset[0]?.TripPlanID,
      bookingID: bookingID, // return TripJack bookingId
      message: "Trip plan saved successfully",
    });

  } catch (err) {
    console.error("POST /trip-plan error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// GET /trip-plan/:id
app.get("/trip-plan/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("TripPlanID", sql.Int, parseInt(id, 10))
      .execute("TR.USP_Get_TripPlan_Full");

    const rawData =
      result.recordset[0]?.JSON_F52E2B61_18A1_11d1_B105_00805F49916B || "{}";

    const dbData = JSON.parse(rawData);

    // Transform passengers into frontend format
    const adults = [];
    const children = [];
    const infants = [];

    (dbData.Passengers || []).forEach((p) => {
      (p.PassengerDetails || []).forEach((pd, index) => {
        const type =
          pd.IsChild === "1" ? "child" : pd.Age < 2 ? "infant" : "adult";

        const mapped = {
          id: `${type}_${index}`,
          type,
          title: "",
          firstName: pd.FirstName || "",
          lastName: pd.LastName || "",
          dateOfBirth: pd.DateOfBirth || "",
          gender:
            pd.GenderID === 1 ? "male" : pd.GenderID === 2 ? "female" : "",
          email: "",
          phone: "",
          nationality: pd.NationalityID || "",
          passportNumber: "",
          passportIssueDate: "",
          passportExpiryDate: "",
          ...(type === "infant"
            ? { associatedAdult: adults[0]?.id || "" }
            : {}),
        };

        if (type === "adult") adults.push(mapped);
        else if (type === "child") children.push(mapped);
        else if (type === "infant") infants.push(mapped);
      });
    });

    const formattedData = {
      tripPlan: dbData.TripPlan || {},
      flights: dbData.Flights || [],
      flightPrize: dbData.FlightPrize || [],
      formData: {
        adults,
        children,
        infants,
      },
    };

    res.status(200).json({ success: true, data: formattedData });
  } catch (err) {
    console.error("GET /trip-plan/:id error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});



//USER CREATION
app.post("/NEW_USER_CREATION", async (req, res) => {
  try {
    // 1. Full JSON payload from client
    const loginPayload = req.body;
    console.log(loginPayload, "Received JSON");

    // 2. Connect to SQL Server
    const pool = await sql.connect(dbConfig);

    // 3. Pass JSON payload into procedure
    const result = await pool
      .request()
      .input("JSON", sql.NVarChar(sql.MAX), JSON.stringify(loginPayload))
      .execute("SE.USP_INSERTUPDATE_USER_JSON");

    // 4. Send success response
    res.status(200).json({
      message: "User creation/update successful",
      result: result.recordset,
    });
  } catch (err) {
    console.error("DB error:", err);

    // 5. Handle errors
    res.status(500).json({
      error: "Database query failed",
      details: err.message,
    });
  }
});


//get roles
app.get("/getroles", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("se.USP_GET_ROLES_JSON");
    res.json(result.recordset); // send response
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get Documents
app.get("/getdocs", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("se.USP_GET_DOCUMENTS_JSON");
    res.json(result.recordset); // send response
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get rolemappingdocs
app.get("/getrolemappingdocs/:roleId", async (req, res) => {
  try {
    const { roleId } = req.params; // get from URL param

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("RoleID", sql.Int, roleId)
      .execute("se.USP_GET_ROLE_DOCUMENTS_JSON");

    res.json(result.recordset); // ✅ send response
  } catch (err) {
    console.error("Error fetching role mapping docs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(serverPort, () =>
  console.log(`Server is running on 132.156.145.6:${serverPort}`)
);
