document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskDateInput = document.getElementById("taskDate");
    const taskBeginTimeInput = document.getElementById("taskBeginTime");
    const taskCompleteTimeInput = document.getElementById("taskCompleteTime");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const quoteInput = document.getElementById("quoteInput");
    const addQuoteButton = document.getElementById("addQuote");
    const quoteContainer = document.getElementById("quoteContainer");

    // Function to add a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.value;
        const taskBeginTime = taskBeginTimeInput.value;
        const taskCompleteTime = taskCompleteTimeInput.value;

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <span>Date: ${taskDate}</span>
            <span>Begin Time: ${taskBeginTime}</span>
            <span>Complete Time: ${taskCompleteTime}</span>
            <button class="delete-button">Delete</button>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = "";
        taskDateInput.value = "";
        taskBeginTimeInput.value = "";
        taskCompleteTimeInput.value = "";

        // Delete task when the "Delete" button is clicked
        const deleteButton = taskItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
        });
    }

    // Function to add a new quote to the list
    function addQuote() {
        const quoteText = quoteInput.value.trim();

        if (quoteText === "") {
            alert("Please enter a quote.");
            return;
        }

        const quoteItem = document.createElement("div");
        quoteItem.classList.add("quote");
        quoteItem.innerText = quoteText;

        quoteContainer.appendChild(quoteItem);
        quoteInput.value = "";
    }

    // Add a task when the "Add Task" button is clicked or Enter key is pressed
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Add a quote when the "Add Quote" button is clicked or Enter key is pressed
    addQuoteButton.addEventListener("click", addQuote);
    quoteInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addQuote();
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in (you would typically do this with a session or token)
    const user = checkLoggedInUser(); // Implement this function

    // Function to display the user's name
    function displayUserName(user) {
        const userGreeting = document.getElementById("userGreeting");
        if (user) {
            userGreeting.textContent = `Hello, ${user.username}!`;
        } else {
            userGreeting.textContent = "";
        }
    }

    // Call the function to display the user's name
    displayUserName(user);

    // Rest of your to-do list functionality
});
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});
const session = require('express-session');
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        // Access the user's profile data (e.g., req.user)
        const { displayName } = req.user;
        res.render('dashboard', { displayName });
    } else {
        res.redirect('/login');
    }
});
const express = require('express');
const router = express.Router();

// Google Sign-In
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect or respond as needed
        res.redirect('/dashboard');
    }
);

// LinkedIn Sign-In (similar route setup)
// ...

module.exports = router;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback' // Update with your callback URL
}, (accessToken, refreshToken, profile, done) => {
    // Handle user authentication and store profile information
    // You can save the profile data to your database or use it to identify the user
    return done(null, profile);
}));
