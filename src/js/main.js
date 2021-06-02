$(document).ready(function(){

  const DAY_IN_MS = 86400000;
  const HOUR_IN_MS = 3600000;
  const MIN_IN_MS = 60000;
  const SEC_IN_MS = 1000;

  const finishTime = new Date('12/13/2021').getTime();

  function convertMsToTime(ms) {
    const days = (ms / DAY_IN_MS).toFixed();
    const hours = ((ms % DAY_IN_MS) / HOUR_IN_MS).toFixed();
    const minutes = ((ms % DAY_IN_MS % HOUR_IN_MS) / MIN_IN_MS).toFixed();
    const seconds = ((ms % DAY_IN_MS % HOUR_IN_MS % MIN_IN_MS) / SEC_IN_MS).toFixed();

    return {
      seconds,
      minutes,
      hours,
      days,
    }
  }

  // const convertedTime = convertMsToTime(timeInMS);
  let timerId = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeInMS = finishTime - currentTime;
    const convertedTime = convertMsToTime(timeInMS);

    document.getElementById('timer-days').innerHTML = convertedTime.days;
    document.getElementById('timer-hours').innerHTML = convertedTime.hours;
    document.getElementById('timer-minutes').innerHTML = convertedTime.minutes;
    document.getElementById('timer-seconds').innerHTML = convertedTime.seconds;
    console.log(timeInMS);

    if(timeInMS <= 0){
      setTimeout(() => { clearInterval(timerId) });
    }
  }, 1000);


});