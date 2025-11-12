const {getAirlinesFromDB} = require("../models/airlinesModel");

const getAirlines = async (req, res) => {
  try {
    const { search } = req.query;
    const recordset = await getAirlinesFromDB(search);

    const jsonColumnName = Object.keys(recordset[0] || {})[0];
    let parsedData = [];

    if (jsonColumnName) {
      const jsonValue = recordset[0][jsonColumnName];

      if (jsonValue && typeof jsonValue === "string" && jsonValue.trim() !== "") {
        try {
          parsedData = JSON.parse(jsonValue);
        } catch (err) {
          console.error("Invalid JSON from DB:", jsonValue);
          parsedData = [];
        }
      }
    }

    parsedData = parsedData.map((item) => {
      item.ImageURL = item.IMAGEURL || null;
      item.ThumbnailURL = item.THUMBNAILURL || null;

      if (item.Photo) {
        try {
          item.PhotoBase64 = Buffer.from(item.Photo).toString("base64");
        } catch (e) {
          console.error("Error converting Photo to base64:", e);
          item.PhotoBase64 = null;
        }
        delete item.Photo;
      }

      return item;
    });

    res.status(200).json(parsedData);
  } catch (err) {
    console.error("Error in getAirlines Controller:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getAirlines };