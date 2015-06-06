
var knwl = require('../knwl');

/* Time Parser */
var Times = exports = module.exports;

Times.calls = function( args, lang ) {

    var terms = {
        "en" : {
            "pm"     : "PM",
            "am"     : "AM",
            "uknown" : "Uknown"
        },

        "gr" : {
            "pm"     : "μμ",
            "am"     : "πμ",
            "uknown" : "Άγνωστη"
        }
    };

    lang = lang || "en";

    var rawWords = knwl.words.words;

    var times = [];

    var words = []; //make a copy of the rawWords array (otherwise, changes will be mirrored to knwl.words prop)
    for (var i = 0; i < rawWords.length; i++) {
        words[i] = rawWords[i];
    }

    for (var i = 0; i < words.length; i++) {
        var timeObj = {};
        var testTime = words[i].split(":");
        if (testTime.length === 2) {
            var daynight = false;
            if (testTime[1].search(terms[lang]['am']) !== -1) {
                testTime[1] = testTime[1].slice(0, testTime[1].length - 2);
                daynight = terms[lang]['am'].toUpperCase();
            } else if (testTime[1].search(terms[lang]['pm']) !== -1) {
                testTime[1] = testTime[1].slice(0, testTime[1].length - 2);
                daynight = terms[lang]['pm'].toUpperCase();
            }
            if (!isNaN(testTime[0]) && !isNaN(testTime[1])) {
                if (testTime[0] > 0 && testTime[0] < 13) {
                    if (testTime[1] >= 0 && testTime[1] < 61) {
                        if (words[i + 1] === terms[lang]["pm"]) {
                            timeObj.hour = testTime[0];
                            timeObj.minute = testTime[1];
                            timeObj.daynight = terms[lang]["pm"].toUpperCase(),
                            timeObj.preview = knwl.tasks.preview(i);
                            timeObj.found = i;
                            times.push(timeObj);
                        } else if (words[i + 1] === terms[lang]["am"]) {
                            timeObj.hour = testTime[0];
                            timeObj.minute = testTime[1];
                            timeObj.daynight = terms[lang]["am"].toUpperCase(),
                            timeObj.preview = knwl.tasks.preview(i);
                            timeObj.found = i;
                            times.push(timeObj);
                        } else {
                            if (daynight !== false) {
                                timeObj.hour = testTime[0];
                                timeObj.minute = testTime[1];
                                timeObj.daynight = terms[lang]["unknown"],
                                timeObj.preview = knwl.tasks.preview(i);
                                timeObj.found = i;
                                times.push(timeObj);
                            }
                        }
                    }
                }
            }
        }

    }
    var timeObj = {};
    for (var i = 0; i < words.length; i++) {
        if (words[i].split(":").length === 1) {
            if (isNaN(words[i]) !== true) { //is a number
                var temp = parseInt(words[i]);
                if (temp > 0 && temp < 13) {
                    if (words[i + 1] === terms[lang]["am"] || words[i + 1] === terms[lang]["pm"]) {
                        timeObj.hour = temp;
                        timeObj.minute = '00';
                        timeObj.daynight = words[i + 1].toUpperCase(),
                        timeObj.preview = knwl.tasks.preview(i);
                        timeObj.found = i;
                        times.push(timeObj);
                    }
                }
            } else if (words[i].search(terms[lang]['am']) !== -1) {
                var temp = words[i];
                temp = temp.slice(0, temp.length - 2);
                temp = parseInt(temp);
                if (isNaN(temp) !== true) {
                    if (temp > 0 && temp < 13) {
                        timeObj.hour = temp;
                        timeObj.minute = '00';
                        timeObj.daynight = terms[lang]['am'].toUpperCase(),
                        timeObj.preview = knwl.tasks.preview(i);
                        timeObj.found = i;
                        times.push(timeObj);
                    }
                }
            } else if (words[i].search(terms[lang]['pm']) !== -1) {
                var temp = words[i];
                temp = temp.slice(0, temp.length - 2);
                temp = parseInt(temp);
                if (isNaN(temp) !== true) {
                    if (temp > 0 && temp < 13) {
                        timeObj.hour = temp;
                        timeObj.minute = '00';
                        timeObj.daynight = terms[lang]['pm'].toUpperCase(),
                        timeObj.preview = knwl.tasks.preview(i);
                        timeObj.found = i;
                        times.push(timeObj);
                    }
                }
            }
        }
    }
    return times;
};
