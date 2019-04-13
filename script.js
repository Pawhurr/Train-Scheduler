//dont forget document on ready if necessary

var config = {
    apiKey: "AIzaSyB0udDietZwQJV10aJiFlA0plwBijmV4Y4",
    authDomain: "train-scheduler-42a0c.firebaseapp.com",
    databaseURL: "https://train-scheduler-42a0c.firebaseio.com",
    projectId: "train-scheduler-42a0c",
    storageBucket: "train-scheduler-42a0c.appspot.com",
    messagingSenderId: "354350699528"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function(event) {
    event.preventDefault();
    
    var trainName = $("#trainNameForm").val().trim();
    var destination = $("#destinationForm").val().trim();
    var firstTime = $("#firstTimeForm").val().trim();
    var frequency = $("#frequencyForm").val().trim();
    
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
    
    database.ref().push ({
        fbTrainName: trainName,
        fbDestination: destination,
        fbFirstTime: firstTime,
        fbFrequency: frequency
    });

    $("#trainNameForm").val("");
    $("#destinationForm").val("");
    $("#firstTimeForm").val("");
    $("#frequencyForm").val("");

    
});

database.ref().on("child_added", function(snapshot){
    var snap = snapshot.val();
    console.log(snap.fbTrainName);
    console.log(snap.fbDestination);
    console.log(snap.fbFirstTime);
    console.log(snap.fbFrequency);

    var firstTimeConverted = moment(snap.fbFirstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var remaining = diffTime % snap.fbFrequency;
    var minsTilTrain = snap.fbFrequency - remaining;
    var nextTrain = moment().add(minsTilTrain, "minutes");
    
    var trainRow = $("<tr>");
    trainRow.append("<th scope='row'>" + snap.fbTrainName + "</th>");
    trainRow.append("<td>" + snap.fbDestination + "</td>");
    trainRow.append("<td>" + snap.fbFrequency + "</td>");
    trainRow.append("<td>" + moment(nextTrain).format("HH:mm") + "</td>");
    trainRow.append("<td>" + minsTilTrain + "</td>");
    $("#traintable").append(trainRow);
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});


// setInterval(clock, 1000);

// function clock(){
    
//     var today = new Date();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     console.log(time);

// }

