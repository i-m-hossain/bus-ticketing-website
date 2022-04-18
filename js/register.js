const dbUsers = JSON.parse(localStorage.getItem("users"));

const registerForm = document.getElementById("register-form");
const registerButton = document.getElementById("register-form-submit");
const registerErrorMsg = document.getElementById("register-error-msg");

registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = registerForm.username.value;
    const password = registerForm.password.value;

    if (username && password) {
        if (dbUsers) {
            const allUsers = [...dbUsers, { username, password }];
            console.log(allUsers);
            localStorage.setItem("users", JSON.stringify(allUsers));
            sessionStorage.setItem(
                "user",
                JSON.stringify({ username, password })
            );
        } else {
            localStorage.setItem(
                "users",
                JSON.stringify([{ username, password }])
            );
            sessionStorage.setItem(
                "user",
                JSON.stringify({ username, password })
            );
        }

        window.location = "/";
    } else {
        registerErrorMsg.style.opacity = 1;
    }
});
