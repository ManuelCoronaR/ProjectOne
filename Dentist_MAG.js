$('#add-to-do').on("click", function (event) {

    event.preventDefault();

    // Constructing a URL to search for the name of the doctor

    var queryURL = 'https://api.betterdoctor.com/2016-03-01/practices?location=25.702314,-80.357333,10&limit=5000&user_key=56c714e5e2cf01c81e612abf0649cc8b';


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
                bar1 = $('#op2').val().trim();
                if (sec === bar1) {
                    var name = results[i].name;
                    var street = results[i].visit_address.street;
                    var city = results[i].visit_address.city;
                    var state = results[i].visit_address.state;
                    var zip = results[i].visit_address.zip;
                    var phone = results[i].phones[0].number;
                    var name = results[i].name;

                    var p = $("<p>");
                    var p1 = $("<h5>").text(name);
                    var p2 = $("<h6>").text(sec);
                    var p3 = $("<p>").text(street);
                    var p4 = $("<p>").text(city + "," + state + "," + zip);
                    var p5 = $("<p>").text("phone No:" + "" + phone);

                    p = p.prepend(p1, p2, p3, p4, p5);

                    gifDiv.append(p);

                    $("#doctors-appear-here").prepend(gifDiv);
                }
            }
        });
});