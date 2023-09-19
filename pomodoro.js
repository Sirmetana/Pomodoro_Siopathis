let dureeTrav = document.getElementById('timerDureeTrav').value;
//let dureePause = document.getElementById('timerDureePause').value;

let timeLimitInMinutes = document.getElementById('timerDureeTrav').value;
let timeLimitInSeconds = timeLimitInMinutes * 60;
let timerElement = document.getElementById('timer');

document.getElementById("timerDureeTrav").addEventListener("change", arrondir);
document.getElementById("timerDureePause").addEventListener("change", arrondir);

document.getElementById("timerDureeTrav").addEventListener("change", arrondir);
document.getElementById("timerDureePause").addEventListener("change", arrondir);

if(parseInt(dureeTrav) <10) //Formate le chrono en 'mm:ss'
{
  dureeTrav = '0' + dureeTrav;
  if(dureeTrav==0)
    dureeTrav = '0' + dureeTrav;
}
timerElement.textContent = dureeTrav + ':00';

let enCours = 0;  //Si timer tourne ou non
let activite = 1; //Pause : 0, Travail : 1
let premierLancer = 0; //Empêche le timer de se décompter plusieurs fois

function arrondir() //Arrondis les valeurs entrées dans les champs et leur donne une valeur par défaut si négatifs
{
  dureeTrav = document.getElementById("timerDureeTrav").value;
  dureePause = document.getElementById("timerDureePause").value;
  console.log(dureeTrav + " " + dureePause);
  if(dureeTrav<0)
  {
    document.getElementById("timerDureeTrav").value = 5;
  }
  if(dureePause<0) 
  {
    document.getElementById("timerDureePause").value = 4;
  }
  
  if(dureeTrav>120) 
  {
    //console.log("dureeTrav trop longue");
    document.getElementById("timerDureeTrav").value = 120;  //ALERTE BUG !! Ne met pas à jour la valeur pour une raison obscure
  }
  if(dureePause>120) 
  {
    document.getElementById("timerDureePause").value = 120; //ALERTE BUG !! Ne met pas à jour la valeur pour une raison obscure
  }
  document.getElementById("timerDureeTrav").value = Math.floor(dureeTrav);  //Arrondi des valeurs
  document.getElementById("timerDureePause").value = Math.floor(dureePause);
}

function startTimer() {
  if(enCours ==1)   //Fait tourner le chrono lorsqu'il n'y a pas de pause
  {
    timeLimitInSeconds--;

    if (timeLimitInSeconds < 0) { //A la fin du chrono, passe d'une activité à l'autre

      if(activite ==1)
      {
        activite =0;
        let dureePause = document.getElementById('timerDureePause').value;
        timeLimitInMinutes = dureePause;
        timeLimitInSeconds = timeLimitInMinutes * 60;
        timerElement.textContent = dureePause+ ':00';
        document.getElementById('activite').textContent = "Pause";
      }
      else
      {
        activite =1;
        dureeTrav = document.getElementById('timerDureeTrav').value;
        timeLimitInMinutes = dureeTrav;
        timeLimitInSeconds = timeLimitInMinutes * 60;
        timerElement.textContent = dureeTrav+ ':00';
        document.getElementById('activite').textContent = "Travail";
        }
      let enCours = 0;
    }

    //Formatage
    let minutes = Math.floor(timeLimitInSeconds / 60);
    let seconds = timeLimitInSeconds % 60;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    timerElement.textContent = minutes + ':' + seconds;
  }
  
}

function lancer() //Lance le chrono et change le Bouton Lancer/Pause
{
  arrondir();
  if(enCours == 0)  //Vérifie si le chrono tourne
  {  
    if(premierLancer==0)  //Lance le chrono pour la première fois
    {
      let timerInterval = setInterval(startTimer, 1000);
      premierLancer =1;
    }
    enCours =1;
    document.getElementById("timerDureeTrav").disabled = true;
    document.getElementById("timerDureePause").disabled = true;

    dureeTrav = document.getElementById('timerDureeTrav').value;
    timeLimitInMinutes = dureeTrav;
    timeLimitInSeconds = timeLimitInMinutes * 60;
    document.getElementById("timerBouton").value = "Réinitialiser";
  }
  else              //Reset le chrono si il tourne
  {
    document.getElementById("timerBouton").value = "Lancer";
    enCours =0;
    setReset();
    document.getElementById("timerDureeTrav").disabled = false;
    document.getElementById("timerDureePause").disabled = false;
  }

}

function setReset() //Réinitialise le chrono à la durée de travail
{
  //console.log("setReset() " + enCours);
  arrondir();
  timeLimitInMinutes = document.getElementById('timerDureeTrav').value;
  timeLimitInSeconds = timeLimitInMinutes * 60;
  if(timeLimitInMinutes<10)
  {
    timerElement.textContent =  "0" + Math.floor(timeLimitInSeconds / 60) + ":0" + timeLimitInSeconds % 60;
  }
  else
  {
    timerElement.textContent =  Math.floor(timeLimitInSeconds / 60) + ":0" + timeLimitInSeconds % 60;
  }
  //enCours = 0;
  document.getElementById("timerBouton").value = "Lancer";
}
