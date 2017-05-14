spedtracker.factory("StudentCrud", ["$cookies",
  function($cookies) {

// Public variables below
    // holds data as array of objects.  Each object is one item.

    // Begin Student array

    var students = [];

    var now = new Date();
    var nowNum = now.getTime();
    var week = 604800000;

    var addHoursAndMinutes = function(hours, minutes) {
      var timeInMillisecs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
      return timeInMillisecs;
    };

// Public functions below.

// -- FUNCTIONS CALLED BY CONTROLLER --
    return {
      // handing ref over to AuthCtrl.js for User creation and authentication.
      getAllStudents: function() {
        return $cookies.students;
      },

      // The function below and the one underneath, 'parseTime' are both called by '$scope.parseTime' in StudentCtrl to display detailed estimated time to completion info for item in DOM

      parseTime: function(timeInMillisecs) {
        // 'time' has to be in milliseconds
        // var millisecsInYear = 12 * 30.4166 * 24 * 60 * 60 * 1000;
        var millisecsInYear = 31535930880;
        // var millisecsInMonth = 30.4166 * 24 * 60 * 60 * 1000;
        var millisecsInMonth = 2627994239.9999995;
        // var millisecsInDay = 24 * 60 * 60 * 1000;
        var millisecsInDay = 86400000;
        // var millisecsInHour = 60 * 60 * 1000;
        var millisecsInHour = 3600000;
        // var millisecsInMinute = 60 * 1000;
        var millisecsInMinute = 60000;
        var millisecsInSecs = 1000;

        if (timeInMillisecs < 0) {
          var years = Math.abs(timeInMillisecs / millisecsInYear);
          var lessThanYear = Math.abs(timeInMillisecs % millisecsInYear);
          var months = Math.abs(lessThanYear / millisecsInMonth);
          var lessThanMonth = Math.abs(lessThanYear % millisecsInMonth);
          var days = Math.abs(lessThanMonth / millisecsInDay);
          var lessThanDay = Math.abs(lessThanMonth % millisecsInDay);
          var hours = Math.abs(lessThanDay / millisecsInHour);
          var lessThanHour = Math.abs(lessThanDay % millisecsInHour);
          var minutes = Math.abs(lessThanHour / millisecsInMinute);
          var lessThanMinute = Math.abs(lessThanHour % millisecsInMinute);
          var seconds = Math.abs(Math.round(lessThanMinute / millisecsInSecs));
        } else {
          var years = Math.floor(timeInMillisecs / millisecsInYear);
          var lessThanYear = timeInMillisecs % millisecsInYear;
          var months = Math.floor(lessThanYear / millisecsInMonth);
          var lessThanMonth = lessThanYear % millisecsInMonth;
          var days = Math.floor(lessThanMonth / millisecsInDay);
          var lessThanDay = lessThanMonth % millisecsInDay;
          var hours = Math.floor(lessThanDay / millisecsInHour);
          var lessThanHour = lessThanDay % millisecsInHour;
          var minutes = Math.floor(lessThanHour / millisecsInMinute);
          var lessThanMinute = lessThanHour % millisecsInMinute;
          var seconds = Math.round(lessThanMinute / millisecsInSecs);

          var addZero = function(timeUnit) {
            if (timeUnit == 0 || timeUnit == 1 || timeUnit == 2 || timeUnit == 3 || timeUnit == 4 || timeUnit == 5 || timeUnit == 6 || timeUnit == 7 || timeUnit == 8 || timeUnit == 9) {
              return "0" + timeUnit;
            // } else if (timeUnit == 60) {
            //   return "00";
            } else {
              return timeUnit;
            }
          };

        }

        return {
          total: timeInMillisecs,
          year: years,
          month: months,
          day: days,
          hour: hours,
          minute: addZero(minutes),
          second: addZero(seconds)
        };
      },
// This function is called by the submit button in testTracker.html when user creates an item in the form
      // addStudent: function(studentName, extendTime, test1Name, test1TimeObj, test2Name, test2TimeObj) {
      //
      //   test1TimeNum = addHoursAndMinutes(test1TimeObj.getHours(), test1TimeObj.getMinutes());
      //   test2TimeNum = addHoursAndMinutes(test2TimeObj.getHours(), test2TimeObj.getMinutes());
      //
      //   totalTime1 = test1TimeNum * extendTime;
      //   totalTime2 = test2TimeNum * extendTime;
      //
      //
      //   student.push(studentName, extendTime, test1Name, test1TimeNum, totalTime1, 0, 0, false, false, 0, 0, false, test2Name, test2TimeNum, totalTime2, 0, 0, false, false, 0, 0, false, false);
      //   $cookies.students.push(student);
      //   $cookies.put('students').then(function() {
      //     console.log(studentName + ": end");
      //
      //   });
      // },

      addStudent: function(studentName) {

        students.push(studentName);
        $cookies.students.push(student);
        $cookies.put('students', students);
        return $cookies.get('students');

      },

      // name: studentName,
      // extendTime: extendTime,
      // test1Name: test1Name,
      // test1Time: test1TimeNum,
      // totalTime1: test1TimeNum * extendTime,
      // test1StartRecord: 0,
      // test1StartTime: 0,
      // isTimer1Start: false,
      // isTimer1Paused: false,
      // pausedTime1: 0,
      // pausedTotal1: 0,
      // isTest1Over: false,
      // test2Name: test2Name,
      // test2Time: test2TimeNum,
      // totalTime2: test2TimeNum * extendTime,
      // test2StartRecord: 0,
      // test2StartTime: 0,
      // isTimer2Start: false,
      // isTimer2Paused: false,
      // pausedTime2: 0,
      // pausedTotal2: 0,
      // isTest2Over: false,
      // isSafeToDelete: false,

      toggleSelectForDelete: function(students) {
        for (var i = 0; i < students.length; i++) {
          if (!students[i].isSafeToDelete) {
            students[i].isSafeToDelete = true;
          } else if (students[i].isSafeToDelete) {
            students[i].isSafeToDelete = false;
          }
          students.$save(students[i]);
        }
      },

      delete: function (student) {
        var student = students.$getRecord(student.$id);

        students.$remove(student).then(function() {
          console.log("student, which is now " + student + ", has been removed");
          });
        }

    }; // end of Return

  } // end of StudentCrud function
]); // end of factory initialization
