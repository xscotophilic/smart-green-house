const express = require("express");
const router = express.Router();

const Temp = require("../models/Temp");

// get request will be generated by Client(Frontend) program
router.get("/gettemp", async (req, res) => {
  try {
    const temp = await Temp.find();
    if (!temp) {
      return res.status(400).json({ msg: "There is no temperatures in DB." });
    }
    res.json(temp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error.");
  }
});

// post request will be generated by Python program
// to set temp
router.post("/settemp", async (req, res) => {
  try {
    const { temp, sensor_id, user_id } = req.body;
    const settemp = new Temp({
      temp,
      sensor_id,
      user_id,
      entrytime: Date.now(),
    });
    await settemp.save();
    res.json(settemp);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error.");
  }
});

// get request will be generated by Client(Frontend) program
// get all temp by user id of all sensors.
router.get("/getmytemp", async (req, res) => {
  try {
    const tempdata = await Temp.find({ user_id: req.body.user_id });
    if (!tempdata) {
      return res.status(400).json({ msg: "There are no data for this user." });
    }
    res.json(tempdata);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error.");
  }
});

// get all id of sensors by user id
router.post("/getdisidofsensors", async (req, res) => {
  try {
    const tempdata = await Temp.find({ user_id: req.body.user_id }).distinct(
      "sensor_id"
    );
    if (!tempdata) {
      return res.status(400).json({ msg: "There are no data for this user." });
    }
    res.json(tempdata);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error.");
  }
});

// get recent temp of user id and sensor id
router.post("/getmytemp/:id", async (req, res) => {
  try {
    const tempdata = await Temp.find({
      user_id: req.body.user_id,
      sensor_id: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1);
    if (!tempdata) {
      return res.status(400).json({ msg: "There are no data for this user." });
    }
    res.json(tempdata);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error.");
  }
});

// get all temp by sensor id
router.post("/getmytempbysid/:id", async (req, res) => {
  try {
    const tempdata = await Temp.find({
      user_id: req.body.user_id,
      sensor_id: req.params.id,
    }).sort({ _id: -1 });
    if (!tempdata) {
      return res.status(400).json({ msg: "There are no data for this user." });
    }
    res.json(tempdata);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error.");
  }
});

router.post("/getchartdata/:id", async (req, res) => {
  try {
    const tempdata = await Temp.find({
      user_id: req.body.user_id,
      sensor_id: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(300);

    if (!tempdata) {
      return res.status(400).json({ msg: "There are no data for this user." });
    }
    res.json(tempdata);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error.");
  }
});
// router.get(
//     '/getmoisture',
//     (req, res) => {
//         return res.send("moisture is ");
//     }
// );

// router.get(
//     '/setmoisture',
//     (req, res) => {
//         return res.send("moisture is set to");
//     }
// );

// router.get(
//     '/warning',
//     (req, res) => {
//         return res.send("warning is generated.");
//     }
// );

module.exports = router;
// Senddata receivedata warning and on the hardware/hardware status
