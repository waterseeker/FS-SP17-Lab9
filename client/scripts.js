$(document).ready(function () {
    getData();
    
    $('button').prop('disabled', true); //disables the chirp button on page load
    $("#inputChirp").keypress(function () { //when user presses a key inside the chirp field
        $('button').prop('disabled', false); // enable the button
    });
    //on  button click, empty the input field and disable the button
    $("#btn").click(function () { //when the button is clicked
        postData(); //call the postData function
        $('input[type="text"]').val(''); //clear the input field
        $('button').prop('disabled', true); //disable the chirp button
    })
    

    function postData() {
        // console.log($('#inputChirp').val());
        var newChirp = { //creates a newChirp object with the fields...
            message: $('#inputChirp').val(), //message, that gets the content of the chirp field
            user: "userName", //userName that gets a default right now
            timestamp: new Date().toISOString() //and a timestamp for when it was creaeted.
        }

        // console.log('hello');

        $.ajax({
            method: "POST", 
            url: 'http://localhost:3000/api/chirps',
            contentType: 'application/json',
            data: JSON.stringify(newChirp)
        })
            .then(function (success) {
                console.log("APPENDING");
                $('<div class="chirp"></div>').text((newChirp.message) + "   -" + (newChirp.user) + "-").appendTo(
                    $("#posts")
                ), function (err) {
                    console.log(err);
                };
            })
            .fail(function (xhr, status, error) {
                console.log(error);
            });
    }

    function getData() {
        console.log("Front end is GETTING data from the server");
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/api/chirps',
            contentType: 'application/json'
        }).then(function (success) {
            // console.log(success); test to see the new chirps object
            $('#posts').empty();
            for (i = 0; i < success.length; i++) {
                $('<div class="chirp"></div>').text((success[i].message) + "   -" + (success[i].user) + "-").appendTo($('#posts'));
            }
        })
    }



});