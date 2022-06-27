const users = JSON.parse(localStorage.getItem("users"));

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username);
    console.log(password);

    if (username && password) {
        if (!users) {
            alert("You are not registered. Please sign up");
            return;
        } else {
            const user = users.find(
                (user) =>
                    user.username === username && user.password === password
            );
            if (!user) {
                alert("You are not registered. Please sign up");
                return;
            } else {
                window.location = "/bus-ticketing-website";
                sessionStorage.setItem(
                    "user",
                    JSON.stringify({ username, password })
                );
            }
        }
    } else {
        loginErrorMsg.style.opacity = 1;
    }
});
