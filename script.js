import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
  getDatabase, set, ref, push, onValue, update, remove 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCPb3TnJqozGkZs0TuA_6tzkE3VioDYZ78",
  authDomain: "omprakash-9b36e.firebaseapp.com",
  projectId: "omprakash-9b36e",
  storageBucket: "omprakash-9b36e.firebasestorage.app",
  messagingSenderId: "783138459496",
  appId: "1:783138459496:web:16aa917e2643dfeaaf50dd",
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// --------------------------------------------
// SAVE CONTACT FORM
// --------------------------------------------
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const newRef = push(ref(db, "contacts/"));

  set(newRef, {
    id: newRef.key,
    name,
    email,
    message
  }).then(() => {
    console.log("Saved:", name, email, message);
    document.getElementById("contactForm").reset();
  });
});


// --------------------------------------------
// READ & DISPLAY CONTACTS
// --------------------------------------------
const messagesDiv = document.getElementById("messages");

onValue(ref(db, "contacts/"), (snapshot) => {
  messagesDiv.innerHTML = "";

  if (!snapshot.exists()) {
    messagesDiv.innerHTML = "<p>No Messages Found</p>";
    return;
  }

  const data = snapshot.val();
  Object.values(data).forEach(item => {
    console.log("Contact:", item);

    messagesDiv.innerHTML += `
      <div style="border:1px solid #333; padding:10px; margin:10px;">
        <p><b>Name:</b> ${item.name}</p>
        <p><b>Email:</b> ${item.email}</p>
        <p><b>Message:</b> ${item.message}</p>

        <button onclick="editMsg('${item.id}', '${item.name}', '${item.email}', '${item.message}')">Edit</button>
        <button onclick="delMsg('${item.id}')">Delete</button>
      </div>
    `;
  });
});


// --------------------------------------------
// DELETE CONTACT
// --------------------------------------------
window.delMsg = function(id) {
  remove(ref(db, "contacts/" + id))
    .then(() => console.log("Deleted:", id));
};


// --------------------------------------------
// EDIT CONTACT
// --------------------------------------------
window.editMsg = function(id, oldName, oldEmail, oldMessage) {
  const name = prompt("Edit Name:", oldName);
  const email = prompt("Edit Email:", oldEmail);
  const message = prompt("Edit Message:", oldMessage);

  update(ref(db, "contacts/" + id), { name, email, message })
    .then(() => console.log("Updated:", id));
};
