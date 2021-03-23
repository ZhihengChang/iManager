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
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Monday']
        },
        endTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Monday']
        }
    },

    tuesday: {
        startTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Tuesday']
        },
        endTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Tuesday']
        }
    },

    wednesday: {
        startTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Wednesday']
        },
        endTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Wednesday']
        }
    },

    thursday: {
        startTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Thursday']
        },
        endTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Thursday']
        }
    },

    friday: {
        startTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Friday']
        },
        endTime: {
            hours: {
                type: Number,
                min: 00,
                max: 23
            },
            minutes: {
                type: Number,
                min: 00,
                max: 59
            },
            required: [false, 'Only required if working on Friday']
        }
    }
});
const User = mongoose.model('Schedule', scheduleSchema);
module.exports = User;