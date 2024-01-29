const mongoose = require('mongoose');

/**
 * Schema for Activity.
 * @typedef {Object} ActivitySchema
 * @property {string} name - Name of the activity.
 * @property {number} duration - Duration of the activity in minutes.
 * @property {number} [caloriesBurned] - Number of calories burned during the activity.
 * @property {Date} [date] - Date when the activity was performed.
 */
const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: Number,
  date: { type: Date, default: Date.now }
});

/**
 * Middleware that logs the ID of the Activity after saving.
 * @param {Document} doc - The mongoose document being saved.
 */
activitySchema.post('save', function(doc) {
  console.log('Activity saved with ID:', doc._id);
});

/**
 * Activity model based on ActivitySchema.
 * @type {mongoose.Model}
 */
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
