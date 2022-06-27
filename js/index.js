const bookedSeats = JSON.parse(localStorage.getItem("bookedSeats"));
const localStorageSeats = JSON.parse(localStorage.getItem("seats"));
const user = JSON.parse(sessionStorage.getItem("user"));
if (!user) {
    const notification = document.getElementById("notification");
    notification.innerText =
        "Please login before coming this page as route protection isn't implemented yet";
    notification.style.color = "red";
}
const initialSeat = [
    { id: 1, value: "A1", status: 1, booked: false, user: null },
    { id: 2, value: "A2", status: 1, booked: false, user: null },
    { id: 3, value: "A3", status: 1, booked: false, user: null },
    { id: 4, value: "B1", status: 1, booked: false, user: null },
    { id: 5, value: "B2", status: 1, booked: false, user: null },
    { id: 6, value: "B3", status: 1, booked: false, user: null },
    { id: 7, value: "C1", status: 1, booked: false, user: null },
    { id: 8, value: "C2", status: 1, booked: false, user: null },
    { id: 9, value: "C3", status: 1, booked: false, user: null },
    { id: 10, value: "D1", status: 1, booked: false, user: null },
    { id: 11, value: "D2", status: 1, booked: false, user: null },
    { id: 12, value: "D3", status: 1, booked: false, user: null },
    { id: 13, value: "E1", status: 1, booked: false, user: null },
    { id: 14, value: "E2", status: 1, booked: false, user: null },
    { id: 15, value: "E3", status: 1, booked: false, user: null },
];

//display seats
const seatContainer = document.getElementById("seatContainer");

(localStorageSeats || initialSeat).forEach(
    (seat) =>
        (seatContainer.innerHTML += `
         <div 
            id="${seat.id}" 
            class="${seat.status === 1 ? "availableColor" : "occupiedColor"}  ${
            seat.booked && seat.status ? "border-4 border border-warning" : ""
        } p-2 me-2 mb-2" style="width:calc(100% * (1/3) - 10px - 1px) "
            onclick="addSeat(${seat.id})"
        >
            ${seat.value}
        </div>           
    `)
);

//click event on onclick seat
function addSeat(seatId) {
    //if local storage has data only update its booked status with local storage data
    if (localStorageSeats) {
        const selectedSeat = localStorageSeats.find(
            (seat) => seat.id === seatId
        );
        selectedSeat.booked = true;
        selectedSeat.user = user.username;
        const newSeat = [...localStorageSeats];
        localStorage.setItem("seats", JSON.stringify(newSeat));
        location.reload();
    } else {
        //if local storage has no data, update local storage with initial data and booked status
        const selectedSeat = initialSeat.find((seat) => seat.id === seatId);
        selectedSeat.booked = true;
        selectedSeat.user = user.username;
        const newSeat = [...initialSeat];
        localStorage.setItem("seats", JSON.stringify(newSeat));
        location.reload();
    }
    alert("you have selected the ticket");
}

function bookSeat() {
    if (!localStorageSeats) {
        alert("First select a seat");
        return;
    }
    const selectedSeats = localStorageSeats.filter((item) => item.booked);
    if (selectedSeats.length === 0) {
        alert("No seat is selected");
        return;
    }
    selectedSeats.forEach((seat) => (seat.status = 0));
    const newSeat = [...localStorageSeats];
    localStorage.setItem("seats", JSON.stringify(newSeat));
    location.reload();
}
function cancelSeat() {
    const confirm = window.confirm(
        "Clicking this, All tickets will be restored to available."
    );
    if (confirm) {
        if (!localStorageSeats) {
            alert("No seat is selected");
            return;
        }
        const occupied = localStorageSeats.filter((item) => item.status === 0);
        const booked = localStorageSeats.filter((item) => item.booked);
        if (booked.length === 0) {
            alert("No seat is selected");
            return;
        }
        if (occupied.length === 0) {
            alert("No seat is booked");
            return;
        }

        const selectedSeats = localStorageSeats.forEach((item) => {
            item.booked = false;
            item.status = 1;
            item.user = null;
        });

        const newSeat = [...localStorageSeats];
        localStorage.setItem("seats", JSON.stringify(newSeat));
        location.reload();
    }
}

//logout
function handleLogout() {
    sessionStorage.clear();
    window.location = "/bus-ticketing-website/login.html";
}

//get logged in users
function loggedInUser() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const loggedInUser = document.getElementById("loggedInUser");
    loggedInUser.innerText = user.username;
}
loggedInUser();
function displayBookedSeats(user) {
    const userSeats = (localStorageSeats || []).filter(
        (seat) => seat.user === user && !seat.status
    );
    const bookedSeats = document.getElementById("bookedSeats");
    if (!userSeats.length || !localStorageSeats.length) {
        bookedSeats.innerHTML += "<p class='p-2'>No ticket found</p>";
        return;
    }
    userSeats.map(
        (seat) =>
            (bookedSeats.innerHTML += `
            <div class="p-2" style="width:calc(100% * (1/3) - 10px - 1px)"> ${seat.value}</div>

    `)
    );
}
displayBookedSeats(user.username);
