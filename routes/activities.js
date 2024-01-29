const express = require("express");
const router = express.Router();
const Activity = require("../models/activity");

/**
 * Route serving a list of all activities.
 * @name get/
 * @function
 * @memberof module:routers/activities
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Route for adding a new activity.
 * @name post/
 * @function
 * @memberof module:routers/activities
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/", async (req, res) => {
  const activity = new Activity({
    name: req.body.name,
    duration: req.body.duration,
    caloriesBurned: req.body.caloriesBurned,
  });

  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * Route for updating an activity.
 * @name put/:id
 * @function
 * @memberof module:routers/activities
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put("/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).send("Activity not found.");
    res.send(activity);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/**
 * Route for deleting an activity.
 * @name delete/:id
 * @function
 * @memberof module:routers/activities
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete("/:id", async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({ _id: req.params.id });
    if (!activity) return res.status(404).send("Activity not found.");
    res.send(activity);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
