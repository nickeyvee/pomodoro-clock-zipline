$(document).ready(function() {

  var value = $(this).attr("value"),
    sessionLength = 1500000,
    breakLength = 300000,
    countDown = 60,
    toggleButton = "off",
    minutes;
  
  function clearSeconds() {
    sessionLength = 60000 * (Math.round(sessionLength / 60000));
    countDown = 60;
  }

  // key:
  
  // 25 Minutes =
  // 1,500,000 Milliseconds
  // 25 minutes = 1,500,000 / 60,000 miliseconds
  // 1000 miliseconds = 1 second
  
  // 1)  find a way to detect and reset sesssionLength and breakLength in order to keep
  // looping the timer indefinitely.
  
  // 2) add animations and visuals.

  function timer() {   
    var breakOrSession;
    
    function lessThanOne() {
    if(breakOrSession < 60000){
      minutes = "0";
    }
  }
    if(sessionLength === 0){  
      breakLength -= 1000;
      breakOrSession = breakLength;
      //$(".timerDisplay").css("color", "red");
      //console.log("break");
    }
    
    if(breakLength !== 0) {
      sessionLength -=1000
      breakOrSession = sessionLength;
      $(".timerDisplay").css("color", "white");
      //console.log("session")
    }
  
    if (toggleButton === "off") {
      return;
    }
    // iterates 1000 miliseconds every time timer() is called..
      if (toggleButton === "on") {
      //if timer greater than 0 seconds..

      if (countDown > 0) {
        // where seconds are iterated through, represented by countdown..
        countDown -= 1;
        minutes = Math.round((breakOrSession / 60000) * 100).toString().slice(0, 2);

        if (breakOrSession < 600000) {
          // converts integers less than two digits..
          minutes = Math.round((breakOrSession / 60000) * 100).toString().slice(0, 1);
          $(".timerDisplay").html(minutes + " : 0" + countDown);
        }
        lessThanOne(); //minutes is equal to 0 when less than 1 minute is left.
        if(breakOrSession < 60000){}
        
        console.log(breakOrSession, minutes);
        if (countDown < 10) {
          $(".timerDisplay").html(minutes + " : 0" + countDown);
        } else {
          $(".timerDisplay").html(minutes + " : " + countDown);
        }
        // resets to 60 seconds after each minute completes
        if (countDown === 0) {
          countDown = 60;
        }
      }
    }
  }

  $(".session").click(function() {
    console.log(sessionLength);

    let value = $(this).attr("value");
    if (toggleButton === "on" || sessionLength < 60000) {
      return;
    }
    clearSeconds(); // MUST reset seconds timer after new time is selected..

    if (sessionLength > 60000 || value !== "-60000") {
      sessionLength += parseInt(value);
      console.log(sessionLength);
      minutes = Math.round((sessionLength / 60000) * 100).toString().slice(0, 2);
      
      if(sessionLength < 600000) {    
      minutes = Math.round((sessionLength / 60000) * 100).toString().slice(0, 1);
        
      $("#session").html(minutes);
      $(".timerDisplay").html(minutes + " : 00");  
      } else {
      
      $("#session").html(minutes);
      $(".timerDisplay").html(minutes + " : 00");
      }
    }
  })

  $(".break").click(function() {
  console.log(breakLength);
    if (toggleButton === "on" || breakLength < 60000) { // locks button when timer is running..
      return;
    }

    let value = $(this).attr("value");

    if (breakLength > 60000 || value !== "-60000") {
      breakLength += parseInt(value);
      minutes = Math.round((breakLength / 60000) * 100);

      if (breakLength < 600000) {
        minutes = minutes.toString().slice(0, 1);

      } else {
        minutes = minutes.toString().slice(0, 2);
      }
      $("#break").html(minutes);
    }
  })

  $(".toggle").click(function() {
    if (toggleButton === "off") {
      toggleButton = "on";
    } else {
      toggleButton = "off";
    }
    var counter = setInterval(function() {
      if (toggleButton === "on") {
        timer();
      } else if (toggleButton === "off") {
        clearInterval(counter);
      }
    }, 1000);
  })

});