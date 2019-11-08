var laT1 = 0;
var lnG1 = 0;

$('#add-to-do').on("click", function (event) {

    event.preventDefault();

    //function test() {

    var zipcode = $('#to-do').val().trim();
    console.log(zipcode);

    var queryURL = 'https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/c1wr56zxJrT9VdP63xSMddq1jzu3difJ6qcIpH87Ak8MWbBRQsfzPP3r5ISW15ET/info.json/' + zipcode + '/degrees';


    // Performing our AJAX GET request

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {

            // assigning values to the variables lat1 (latitude), and lng1 (longitude)

            laT1 = response.lat;
            lnG1 = response.lng;
            console.log(laT1, lnG1);
            sample2(laT1, lnG1);
        });
    //};

    function sample2() {

        a = 10;


        var queryURL = 'https://api.betterdoctor.com/2016-03-01/practices?location=' + laT1 + "," + lnG1 + "," + a + '&limit=5000&user_key=56c714e5e2cf01c81e612abf0649cc8b';

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable

                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Creating a couple of div's with their classes associated with Materialize that will eventually 
                    // store the data from the second AJAX call 

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

                    bar1 = $('#op1').val().trim();

                    // to make sure that data stored is associated with the doctor's specialty chosen by the user 

                    if (sec === bar1) {
                        var name = results[i].name;
                        var street = results[i].visit_address.street;
                        var city = results[i].visit_address.city;
                        var state = results[i].visit_address.state;
                        var zip = results[i].visit_address.zip;
                        var phone = results[i].phones[0].number;

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

                        p = p.prepend(p1, p1a, p2, p2a, p3, p3a, p4, p4a, p5);

                        gifDiv2.append(p);

                        gifDiv1.append(gifDiv2);


                        $("#doctorsList").append(gifDiv1);
                    }
                }
            });
    };
});

$("#to-do").empty();

//Function  to re-start the app.

$('#rP1').on('click', function rStart() {
    window.location.reload(false);
});


