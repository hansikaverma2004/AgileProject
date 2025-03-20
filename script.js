function comparePrices() {
    document.getElementById("loading").style.display = "flex";
    setTimeout(() => {
        // Your existing logic here
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
            "rani sarai": 15,
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
            auto: 0.5,
            car: 1
        };

        let rideTypeExtra = basePrices[rideType];

        let fares = [
            { company: "Uber", price: (distance * (5.5 + rideTypeExtra)).toFixed(2) },
            { company: "Ola", price: (distance * (5 + rideTypeExtra)).toFixed(2) },
            { company: "Rapido", price: (distance * (4.5 + rideTypeExtra)).toFixed(2) },
        ];

        let emergencyContacts = {
            "sgsits college": "Police: 100, Ambulance: 102",
            "railway station": "Police: 100, Railway Helpline: 139",
            "bus stand": "Police: 100, Ambulance: 102",
            "khajrana temple": "Police: 100, Temple Security: 123456789",
            "patalpani waterfall": "Police: 100, Forest Department: 987654321",
            "rajwada": "Police: 100, Tourist Helpline: 1800111363",
            "bhawarkua": "Police: 100, Ambulance: 102",
            "vijay nagar": "Police: 100, Ambulance: 102",
            "palasia": "Police: 100, Ambulance: 102",
            "rani sarai": "Police: 100, Ambulance: 102"
        };

        let resultHTML = `<h3>Estimated Prices (for ${distance} km, ${rideType} ride):</h3><ul>`;
        fares.forEach(cab => {
            resultHTML += `<li>${cab.company}: ₹${cab.price}</li>`;
        });
        resultHTML += "</ul>";

        resultHTML += `<h3>Emergency Contacts:</h3>`;
        resultHTML += `<p>${emergencyContacts[pickup]}</p>`;

        document.getElementById("result").innerHTML = resultHTML;
        document.getElementById("loading").style.display = "none";
    }, 1000); // Simulate a 1-second delay
}
