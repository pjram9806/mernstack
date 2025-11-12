const masterController = require("../controllers/masterDataController");
const express = require('express');
const router = express.Router();

// Countries
router.get("/getcountries", masterController.getCountries);
router.post("/countries", masterController.insertUpdateCountry);

// States
router.get("/getstates", masterController.getStates);
router.post("/states", masterController.insertUpdateState);

// Cities
router.get("/getcities", masterController.getCities);
router.post("/cities", masterController.insertUpdateCity);

// Districts
router.get("/getdistricts", masterController.getDistricts);
router.post("/districts", masterController.insertUpdateDistrict);

// Areas
router.get("/getareas", masterController.getAreas);
router.post("/areas", masterController.insertUpdateArea);

// Genders
router.get("/getgenders", masterController.getGenders);
router.post("/genders", masterController.getGenders); // Optional POST if needed

// Nationalities
router.get("/getnationalities", masterController.getNationalities);
router.post("/nationalities", masterController.insertUpdateNationality);

module.exports = router;