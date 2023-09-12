let timeLimitInMinutes = 10;
let timeLimitInSeconds = timeLimitInMinutes * 60;
let timerElement = document.getElementById('timer');
let compteurCycles = 0;
let enCours = 0;

function setReset()
{
  console.log("Entrée Fonction setRest. enCours = " + enCours);
  if(enCours ==1)
  {
    duree = document.getElementById("timerDuree").textContent;
    //duree = duree.substring(0,1) + ':' + duree.substring(2,3);
    document.getElementById("timerButton").value = "Lancer";
    timeLimitInMinutes = duree.substring(0,1);
    timeLimitInSeconds = duree.substring(2,3);
    console.log("Timer reset");
  }
  else
  {
    document.getElementById("timerButton").value = "Relancer";
    console.log("Timer lancé");
    lancer();
  }
}

function lancer()
{
  timeLimitInSeconds--;
  let minutes = Math.floor(timeLimitInSeconds / 60);
  let seconds = timeLimitInSeconds % 60;

  if (timeLimitInSeconds < 0) {
    timerElement.textContent = '00:00';
    clearInterval(timerInterval);
    enCours = 0;
    return;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  timerElement.textContent = minutes + ':' + seconds;
}

let timerInterval = setInterval(lancer, 1000);