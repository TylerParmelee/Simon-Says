var Simon = {};

Simon.init = function() {
  Simon.setBaseValues();
  Simon.fadeStuff([".introGame","#startGame"], "in");
  $(".action").click(function() {
    Simon.setBaseValues();
    Simon.createRandomSquare();
    if ($(this).attr("id") === "startGame") {
      Simon.fadeStuff([".introGame","#startGame"], "out");
    } else if ($(this).attr("id") === "restart") {
      Simon.fadeStuff([".fadeOver","#restart",".scoreboard"], "out", 100);
    }
  });
}

Simon.changeSpeed = function() {
  if(Simon.speed === 200){ return }
  if(Simon.rounds % 2 === 0){
    Simon.speed = Simon.speed - Simon.negative;
    Simon.negative = Simon.negative - 10;
  }
};

Simon.createRandomSquare = function() {
  var randNumb = Math.floor(Math.random() * 8) + 0;
  var randSquare = Simon.squares[randNumb];
  Simon.storeRandSquare.push(randSquare);
  Simon.playBack(0);
  Simon.rounds = Simon.storeRandSquare.length;
  $(".rounds").empty().append(Simon.rounds++);
}

Simon.playBack = function(i, start) {
  Simon.clicksCounter = 0;
  var name = "#" + Simon.storeRandSquare[i]
  $(name).addClass("highlight");
  setTimeout(function() {
    $(name).removeClass("highlight");
    if (i !== Simon.storeRandSquare.length) {
      setTimeout(function() {
        i++;
        Simon.playBack(i);
      }, 250);
    }
  }, Simon.speed);
}

Simon.checkSquare = function(square) {
  if (Simon.storeRandSquare[Simon.clicksCounter - 1] === square) { return true } 
  return false;
}

Simon.setBaseValues = function(val) { 
  if(!val) {val = 0 }
  Simon.storeRandSquare = [];
  Simon.clicksCounter = 0;
  Simon.rounds = val;
  Simon.speed = 600;
  Simon.negative = 100;
  Simon.squares = ["red", "green", "blue", "yellow", "red2", "green2", "blue2", "yellow2"];
}

Simon.roundEnded = function() {
  Simon.changeSpeed();
  $(".fade").fadeIn(500).fadeOut(500);
  setTimeout(function() {
    Simon.createRandomSquare();
  }, 1000)
}

Simon.blinkBox = function(color) {
  $("#" + color).css({opacity: 1});
  setTimeout(function() {
    $("#" + color).css({opacity: .3});
  }, 80);
}

Simon.fadeStuff = function(stuff, direction, duration) {
  if(!duration){duration = 500}
  for(i = 0; i < stuff.length; i++) {
    if(direction === 'in'){ 
      $(stuff[i]).fadeIn(duration) 
    } else {
      $(stuff[i]).fadeOut(duration);
    }
  }
}

$('.blocks').click(function() {
  var color = $(this).attr("id")
  Simon.clicksCounter++;
  if (Simon.checkSquare(color) && Simon.clicksCounter === Simon.storeRandSquare.length) {
    Simon.blinkBox(color);
    Simon.roundEnded();
  } else if (Simon.storeRandSquare[Simon.clicksCounter - 1] === color) {
      Simon.blinkBox(color);
  } else {
    Simon.setBaseValues(1);
    Simon.fadeStuff([".fadeOver", "#restart", ".scoreboard"], 'in');
    $(".rounds").empty().append(Simon.rounds);
  }
});

$(document).ready(function() {
  Simon.init();
});