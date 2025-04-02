function comparePrices() {
    document.getElementById("loading").style.display = "flex";

    setTimeout(() => {
        let pickup = document.getElementById("pickup").value.trim().toLowerCase();
        let destination = document.getElementById("destination").value.trim().toLowerCase();
        let rideType = document.getElementById("rideType").value;

        if (pickup === "" || destination === "") {
            document.getElementById("result").innerHTML = "Please enter both pickup and destination locations.";
            document.getElementById("loading").style.display = "none";
            return;
        }

        let locations = {
            "sgsits college": 0,
            "railway station": 5,
            "bus stand": 7,
            "khajrana temple": 12,
            "patalpani waterfall": 35,
            "rajwada": 10,
            "bhawarkua": 6,
            "vijay nagar": 8,
            "palasia": 9,
            "it park": 1,
            "rani sati": 15,
            "lig": 7.5,
        };

        if (!(pickup in locations) || !(destination in locations)) {
            document.getElementById("result").innerHTML = "Location not found in our database.";
            document.getElementById("loading").style.display = "none";
            return;
        }

        let distance = Math.abs(locations[pickup] - locations[destination]);

        let basePrices = {
            bike: 0,
            auto: 5,
            car: 15,
        };

        let rideTypeExtra = basePrices[rideType];

        // **Fix: Convert randomFactor() output to number properly**
        function randomFactor() {
            return parseFloat((Math.random() * 2 - 1).toFixed(2)); // Ensures a numeric value
        }

        let fares = [
            { company: "Uber", price: (distance * (5.5 + rideTypeExtra + randomFactor())).toFixed(2), link: "https://www.uber.com/in/en/ride/" },
            { company: "Ola", price: (distance * (5 + rideTypeExtra + randomFactor())).toFixed(2), link: "https://www.olacabs.com/" },
            { company: "Rapido", price: (distance * (4.5 + rideTypeExtra + randomFactor())).toFixed(2), link: "https://www.rapido.bike/" },
        ];

        // **Fix: Ensure all fares are valid numbers**
        fares = fares.map(cab => ({
            ...cab,
            price: isNaN(cab.price) ? "N/A" : cab.price  // If NaN, show "N/A" instead
        }));

        // Find the cheapest ride dynamically (ignoring N/A values)
        let cheapest = fares
            .filter(cab => cab.price !== "N/A")  // Ignore invalid fares
            .reduce((min, cab) => (parseFloat(cab.price) < parseFloat(min.price) ? cab : min), fares[0]);

        let resultHTML = `<h3>Estimated Prices (for ${distance} km, ${rideType} ride):</h3><ul>`;
        fares.forEach(cab => {
            resultHTML += `<li>${cab.company}: ₹${cab.price}</li>`;
        });
        resultHTML += "</ul>";

        // "Book Now" button for the cheapest ride (if valid price)
        if (cheapest.price !== "N/A") {
            resultHTML += `<h3>Cheapest Option: ${cheapest.company} - ₹${cheapest.price}</h3>`;
            resultHTML += `<a href="${cheapest.link}" target="_blank">
                            <button style="margin-top: 10px; padding: 8px 15px; cursor: pointer; font-size: 16px;">Book Now</button>
                          </a>`;
        } else {
            resultHTML += `<h3>Sorry, no valid fares available.</h3>`;
        }

        document.getElementById("result").innerHTML = resultHTML;
        document.getElementById("loading").style.display = "none";
    }, 1000);
}
