function signUp() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.find(user => user.username === username)) {
        alert("Username already exists! Please choose another.");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Redirecting to login.");
    window.location.href = "login.html";
}

function logIn() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.username === username && user.password === password);

    if (!validUser) {
        alert("Invalid credentials! Try again.");
        return;
    }

    localStorage.setItem("loggedInUser", username);
    alert("Login successful! Redirecting...");
    window.location.href = "compare.html";
}

function checkLogin() {
    let user = localStorage.getItem("loggedInUser");
    if (!user) {
        alert("You must be logged in to access this page.");
        window.location.href = "login.html";
    }
}

function logOut() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.href = "login.html";
}
