var moment = require('moment');
// var date = new Date();
// // var month = ['Jan', 'Feb']
//
// console.log(date.getMonth());

// var date = moment();
// date.add(10,'y').subtract(10,'months');
// console.log(date.format('MMM Do YYYY'));


//10:35 am
//6:01 am

new Date().getTime();
var someTimestamp = moment().valueOf();

console.log(someTimestamp);

var createAt = 1234;
var date = moment(createAt);
console.log(date.format('h:mm a'));
