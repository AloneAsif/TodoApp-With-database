
var firebaseConfig = {
  apiKey: "AIzaSyABY4sarEu4kiqx8lGG6adsnG334jcCm1Q",
  authDomain: "todoapp-ecda3.firebaseapp.com",
  databaseURL: "https://todoapp-ecda3-default-rtdb.firebaseio.com",
  projectId: "todoapp-ecda3",
  storageBucket: "todoapp-ecda3.appspot.com",
  messagingSenderId: "1041077386340",
  appId: "1:1041077386340:web:b0f2d9f8d900751042f371"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function addTodo() {
    var input = document.getElementById('inputField');
    var liElement = document.createElement('li');
    var liText = document.createTextNode(input.value);
    liElement.appendChild(liText);

    var list = document.getElementById('list');
    list.appendChild(liElement);

    input.value = "";

    // Edit button
    var editBtn = document.createElement("button");
    var editbtnText = document.createTextNode("Edit");
    editBtn.appendChild(editbtnText);
    liElement.appendChild(editBtn);
    editBtn.setAttribute("onclick", "editItem(this)");
// database add
    database.ref('todos').push({
      text: liText.textContent
    });

    // Delete Button
    var delBtn = document.createElement("button");
    var delBtnText = document.createTextNode("Delete");
    delBtn.appendChild(delBtnText);
    delBtn.setAttribute("onclick", "deleteItem(this)");
    liElement.appendChild(delBtn);
  }

  function deleteAll() {
    var list = document.getElementById('list');
    list.innerHTML = "";

    database.ref('todos').remove();
  }

  function editItem(x) {
    var input = prompt("Enter updated value:");
    if (input !== null) {
      x.parentNode.firstChild.nodeValue = input;
    }

    database.ref('todos/' + x.parentNode.key).set({
      text: input
    });
  }

  function deleteItem(y) {
    y.parentNode.remove();

    database.ref('todos/' + y.parentNode.key).remove();
  }