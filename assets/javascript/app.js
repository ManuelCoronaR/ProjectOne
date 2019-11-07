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
                    // Creating a div for the gif
                    var gifDiv = $("<div>");


                    try {
                        sec = results[i].doctors[0].specialties[0].actor;
                    } catch (error) {
                        sec = "N/A"; /* any default can be used */
                    };
                    bar1 = $('#op1').val().trim();
                    if (sec === bar1) {
                        var name = results[i].name;
                        var street = results[i].visit_address.street;
                        var city = results[i].visit_address.city;
                        var state = results[i].visit_address.state;
                        var zip = results[i].visit_address.zip;
                        var phone = results[i].phones[0].number;
                        var name = results[i].name;

                        var p = $("<p>");
                        var p1 = $("<h3>").text(name);
                        var p2 = $("<h4>").text(sec);
                        var p3 = $("<p>").text(street);
                        var p4 = $("<p>").text(city + "," + state + "," + zip);
                        var p5 = $("<p>").text("phone No:" + "" + phone);

                        p = p.prepend(p1, p2, p3, p4, p5);

                        gifDiv.append(p);

                        $("#doctors-appear-here").prepend(gifDiv);
                    }
                }
            });
    };
});

