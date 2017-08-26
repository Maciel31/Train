// Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBRdi9Nyvv6CTyPX_qzDm09NvIjPKGfwgk",
    authDomain: "my-train-project-e563b.firebaseapp.com",
    databaseURL: "https://my-train-project-e563b.firebaseio.com",
    projectId: "my-train-project-e563b",
    storageBucket: "my-train-project-e563b.appspot.com",
    messagingSenderId: "855274993706"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  // Live Time of The Day 

  var updateTime = function(){
  	var now = moment().format('hh:mm');
  	$('#currentTime').html(now);
  }

  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
});

  /*******************************************/

$('#submit').on('click', function(){

	// Retrieve user inputs from form
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	// Create an object for new train to be added
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	
	database.ref().push(newTrain);

	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');



	return false;

});


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

	var name = childSnapshot.val().trainName;
	var dest = childSnapshot.val().destination;
	var starter = childSnapshot.val().firstTrain;
	var freq = childSnapshot.val().frequency;



	var pre = moment(starter, " HH:mm");
    console.log(pre + " returned value for var 'pre'");
  var current = moment().format("HH:mm");
    console.log("CURRENT TIME: " + current);
  //diff = currentTime - fisrt train:
    var diff = moment().diff(moment(pre), "minutes");
  console.log(diff + " this is the var 'diff'");

//remain = remainder of the time left:
  var remain = diff % freq;
  console.log(remain + " this is the var 'remainder'");
  //time until arrival:
  var arrivalTime = freq - remain;
  console.log(arrivalTime + " this is the var 'arrivalTime'");
  //next train to arrive:
  var nextTrain = moment().add(arrivalTime, "minutes").format("HH:mm");
  console.log(nextTrain + " this is the var 'nextTrain'");


	$('.table > tbody').append("<tr><td>" + name + "</td><td>" + dest + "</td><td>"
		+ freq + "</td><td>" + nextTrain + "</td><td>" + arrivalTime + "</td></tr>");

});

