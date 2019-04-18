// Initialize Firebase
//The project has been deleted in firebase
//fill in your own config info 
let email;
let senha;
let valor = 0;

var config = {
  apiKey: "AIzaSyCf7EOFoPo9CGaXNKWB3Q44YLuYq8KDNNw",
  authDomain: "fechadura-teste.firebaseapp.com",
  databaseURL: "https://fechadura-teste.firebaseio.com",
  projectId: "fechadura-teste",
  storageBucket: "fechadura-teste.appspot.com",
  messagingSenderId: "1021402934114"
};
firebase.initializeApp(config);
$(document).ready(function(){
  var database = firebase.database();
  var ledStatus;
  
  database.ref().on("value", function(snap){
    ledStatus = snap.val().ledStatus;
    if(ledStatus == 1){
      $(".lightStatus").text("The light is on");
    } else {
      $(".lightStatus").text("The light is off");
    }
  });

  $(".lightButton").click(function(){
    var firebaseRef = firebase.database().ref().child("ledStatus");

    if(ledStatus == 1){
      firebaseRef.set(0);
      ledStatus = 0;
    } else {
      firebaseRef.set(1);
      ledStatus = 1;
    }
  });

  $("#login").click(function(e){
    e.preventDefault();
    email = $("#email").val();
    senha = $("#senha").val();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(function (result) {
          console.log(result);
          //displayName.innerText = 'Bem vindo, ' + email;
          alert('Autenticado ' + email);
          console.log("era p sumir");
          console.log(email,senha);
          $("#cadastro").fadeOut();
          $("#botao-fechadura").fadeIn();
      })
      .catch(function (error) {
          console.error(error.code);
          console.error(error.message);
          alert('Falha ao autenticar, verifique o erro no console.')
      });
  });
});

  