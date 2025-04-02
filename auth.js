function signUp() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let contact = document.getElementById("contact").value;

    if (username === "" || password === "" || contact === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!/^\d{10}$/.test(contact)) {
        alert("Please enter a valid 10-digit contact number.");
        return;
    }

    let users = getUsers();
    
    if (users.find(user => user.username === username)) {
        alert("Username already exists! Please choose another.");
        return;
    }

    const hashedPassword = btoa(encodeURIComponent(password));
    
    users.push({ username, password: hashedPassword, contact });
    setUsers(users);

    alert("Signup successful! Redirecting to login.");
    window.location.href = "login.html";
}

function logIn() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let users = getUsers();
    const hashedInput = btoa(encodeURIComponent(password));
    
    let validUser = users.find(user => user.username === username && user.password === hashedInput);

    if (!validUser) {
        alert("Invalid credentials! Try again.");
        return;
    }

    localStorage.setItem("loggedInUser", username);
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

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("users")) || [];
    } catch (e) {
        console.error("Error reading users:", e);
        return [];
    }
}

function setUsers(users) {
    try {
        localStorage.setItem("users", JSON.stringify(users));
    } catch (e) {
        console.error("Error saving users:", e);
    }
}
