let dureeTrav = document.getElementById('timerDureeTrav').value;
let dureePause = document.getElementById('timerDureePause').value;
let timeLimitInMinutes = dureeTrav;
let timeLimitInSeconds = timeLimitInMinutes * 60;
let timerElement = document.getElementById('timer');
if(parseInt(dureeTrav) <10)
{
  dureeTrav = '0' + dureeTrav;
  if(dureeTrav==0)
    dureeTrav = '0' + dureeTrav;
}
timerElement.textContent = dureeTrav + ':00';
let enCours = 0;  //Si timer tourne ou non
let activite = 1; //Pause : 0, Travail : 1
let premierLancer = 0; //Empêche le timer de se décompter plusieurs fois

function startTimer() {
  //console.log("startTimer() " + enCours);

  if(enCours ==1)
  {
    timeLimitInSeconds--;

    if (timeLimitInSeconds < 0) {
      console.log("timer à 0. Activité : " + activite);
      if(activite ==1)
      {
        //console.log("Travail => Pause : "+ dureePause);
        activite =0;
        timeLimitInMinutes = dureePause;
        timeLimitInSeconds = timeLimitInMinutes * 60;
        timerElement.textContent = dureePause+ ':00';
        document.getElementById('activite').textContent = "Pause";
      }
      else
      {
        //console.log("Pause => Travail : "+ dureeTrav);
        activite =1;
        timeLimitInMinutes = dureeTrav;
        timeLimitInSeconds = timeLimitInMinutes * 60;
        timerElement.textContent = dureeTrav+ ':00';
        document.getElementById('activite').textContent = "Travail";
        }
      let enCours = 0;
      //return;
    }
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

function lancer()
{
  if(enCours == 0)
  {  
    if(premierLancer==0)
    {
      let timerInterval = setInterval(startTimer, 1000);
      premierLancer =1;
    }
    enCours =1;
    document.getElementById('timerDureeTrav').value;
    document.getElementById("timerButton").value = "Pause";
  }
  else              //Reset le chrono si il tourne
  {
    document.getElementById("timerButton").value = "Lancer";
    enCours =0;
  }

}

function setReset()
{
  //console.log("setReset() " + enCours);
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
  enCours = 0;
}
