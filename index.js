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

  //25 Minutes =
  //1,500,000 Milliseconds

  function timer() {
    sessionLength -= 1000;
    // iterates 1000 miliseconds every time timer() is called..

    if (toggleButton === "off") {
      return;
    }
    if (sessionLength <= 0 || toggleButton === "off") {
      clearInterval(counter);
      //counter ended, do something here..
      sessionLength = breakLength;

    } else if (toggleButton === "on") {
      //if timer greater than 0 seconds..

      if (countDown > 0) {
        countDown -= 1;
        minutes = Math.round((sessionLength / 60000) * 100).toString().slice(0, 2);

        if (sessionLength < 600000) {
          // converts integers less than two digits..
          minutes = Math.round((sessionLength / 60000) * 100).toString().slice(0, 1);
        }
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
    console.log(toggleButton);
    if (toggleButton === "on") {
      return;
    }
    clearSeconds(); // MUST reset seconds timer after new time is selected..
    let value = $(this).attr("value");
    if (sessionLength > 1 || value !== "-60000") {

      sessionLength += parseInt(value);
      minutes = Math.round((sessionLength / 60000) * 100).toString().slice(0, 2);
      //console.log(sessionLength, value);

      $("#session").html(minutes);
      $(".timerDisplay").html(minutes + " : 00");
    }
  })

  $(".break").click(function() {

    if (toggleButton === "on") { // locks button when timer is running..
      return;
    }

    let value = $(this).attr("value");

    if (breakLength > 1 || value !== "-60000") {
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