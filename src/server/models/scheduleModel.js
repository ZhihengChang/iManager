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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
        }
    }
});
const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;