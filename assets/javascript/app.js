// Global variables

var laT1 = 0;
var lnG1 = 0;

// Event listener for all button elements

$('#add-to-do').on("click", function (event) {

    // prevent form from trying to submit/refresh the page

    event.preventDefault();


    //zip code typed by the user

    var zipcode = $('#to-do').val().trim();

    // checking if the zip code given has 5 digits, if the zip code given has less or more than 5 digits 
    // there will not be any URL's construction to zipcodeapi, i.e., any AJAX call etc, otherwise
    // the rest of code is executed, etc.

    if (zipcode.toString().length != 5) {
        var p = $("<p>");
        var p1 = $("<p>").text("PLEASE TYPE A VALID FIVE-DIGITS  ZIP  CODE!!!");
        p = p.append(p1);
        $("#doctorsList").append(p);
        console.log(zipcode, zipcode.toString().length);
    }

    else {

        // Constructing a URL to search zipcodeapi to covert zip code into location (latitude and longitude)
        var queryURL = 'https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/c1wr56zxJrT9VdP63xSMddq1jzu3difJ6qcIpH87Ak8MWbBRQsfzPP3r5ISW15ET/info.json/' + zipcode + '/degrees';


        // Using ajaxStart to show the loader image

        $(document).ajaxStart(function () {
            // Show image container
            $("#loader").show();
        });

        // Performing our AJAX GET request to convert zip code into location (latitude and longitude)

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API

            .then(function (response) {

                // // store the response ((latitude, longitude) from the first AJAX call  

                laT1 = response.lat;
                lnG1 = response.lng;
                console.log(laT1, lnG1);
                sample2(laT1, lnG1);
            });
        //};

        function sample2() {

            // radius of search around the location (latitude and longitude) estimated above

            a = 10;

            // Constructing a URL to search betterdoctor for doctor's directory based on location

            var queryURL = 'https://api.betterdoctor.com/2016-03-01/practices?location=' + laT1 + "," + lnG1 + "," + a + '&limit=5000&user_key=56c714e5e2cf01c81e612abf0649cc8b';


            // Performing our AJAX GET request for doctors's directory based on location

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // After the data comes back from the API

                .then(function (response) {

                    // Storing a response into the results variable

                    var results = response.data;

                    // Using ajaxComplete for hiding

                    $(document).ajaxComplete(function () {
                        // Hide image container
                        $("#loader").hide();
                    });

                    // Looping over every result item

                    for (var i = 0; i < results.length; i++) {

                        // Creating a couple of div's with their classes associated with Materialize that will eventually 

                        var gifDiv1 = $("<div>");
                        var gifDiv2 = $("<div>");
                        gifDiv1.addClass("card blue-grey darken-1");
                        gifDiv2.addClass("card-content white-text");


                        // to avoid those dang cannot read property of undefined errors

                        try {
                            sec = results[i].doctors[0].specialties[0].actor;
                        } catch (error) {
                            sec = "N/A"; /* any default can be used */
                        };

                        //doctor's specialty selected by the user

                        bar1 = $('#op1').val().trim();


                        // store the data from the second AJAX call 

                        if (sec === bar1) {
                            var name = results[i].name;
                            var street = results[i].visit_address.street;
                            var city = results[i].visit_address.city;
                            var state = results[i].visit_address.state;
                            var zip = results[i].visit_address.zip;
                            var phone = results[i].phones[0].number;

                            // Creating a paragraph (<p>), span (<span>), and </br>tag with the results

                            var p = $("<p>");
                            var p1 = $("<span>").text(name);
                            var p1a = $("</br>");
                            var p2 = $("<span>").text(sec);
                            var p2a = $("</br>");
                            var p3 = $("<span>").text(street);
                            var p3a = $("</br>");
                            var p4 = $("<span>").text(city + "," + state + "," + zip);
                            var p4a = $("</br>");
                            var p5 = $("<span>").text("phone No:" + "" + phone);

                            // Preappending the paragraph , span, and break lines into the main paragraph

                            p = p.prepend(p1, p1a, p2, p2a, p3, p3a, p4, p4a, p5);

                            // Appending the paragraph  into the gifDiv2

                            gifDiv2.append(p);

                            // Preappending the gifDiv2 into the gifDiv1

                            gifDiv1.prepend(gifDiv2);

                            // Prepending the gifDiv1 into the "#doctorsList" div in the HTML

                            $("#doctorsList").prepend(gifDiv1);
                        }
                    }
                });
        };
    }
});

//Function  to re-start the app.

$('#rP1').on('click', function rStart() {
    window.location.href = "index.html";
});



