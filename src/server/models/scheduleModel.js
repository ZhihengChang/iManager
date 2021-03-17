const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
    //set boundaries for week number from 1-52 (52 is max number of weeks in a year)
    weekNumber: {
        type: Number,
        min: 1,
        max: 52,
        default: 1,
        //required: [true, 'Must have a week number']
    },

    year: {
        type: Number,
        //required: [true, 'Must have a year']
    },
    //set boundaries for weekly hours from 0-168 (168 is max number of hours in one week)
    weeklyHours: {
        type: Number,
        min: 0,
        max: 168,
        default: 40,
        //required: [true, 'Must have number of weekly hours']
    },

    monday: {
        startTime: {
            type: Date,
            required: [false, 'Only required if working on Monday']
        },
        endTime: {
            type: Date,
            required: [false, 'Only required if working on Monday']
        }
    },

    tuesday: {
        startTime: {
            type: Date,
            required: [false, 'Only required if working on Tuesday']
        },
        endTime: {
            type: Date,
            required: [false, 'Only required if working on Tuesday']
        }
    },

    wednesday: {
        startTime: {
            type: Date,
            required: [false, 'Only required if working on Wednesday']
        },
        endTime: {
            type: Date,
            required: [false, 'Only required if working on Wednesday']
        }
    },

    thursday: {
        startTime: {
            type: Date,
            required: [false, 'Only required if working on Thursday']
        },
        endTime: {
            type: Date,
            required: [false, 'Only required if working on Thursday']
        }
    },

    friday: {
        startTime: {
            type: Date,
            required: [false, 'Only required if working on Friday']
        },
        endTime: {
            type: Date,
            required: [false, 'Only required if working on Friday']
        }
    }
});
const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;