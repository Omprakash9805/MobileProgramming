
function toggleSeats(id) {
    const box = document.getElementById(id);
    box.style.display = box.style.display === "none" ? "flex" : "none";
}

document.querySelectorAll(".item").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("selected"));
});


document.querySelector(".bus").onclick = () => showSection("busSection");
document.querySelector(".flights").onclick = () => showSection("flightsSection");
document.querySelector(".hotels").onclick = () => showSection("hotelsSection");
document.querySelector(".hostel").onclick = () => showSection("hostelSection");

function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
}
