var code;
var numCorrect = 0;
var numCreated = 0;
var numRequired = 25;

function createCaptchaText(charSet) {
  numCreated++;
  var MIN_LENGTH = 5;
  var MAX_LENGTH = 10;
  var captchaLength = Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH)) + MIN_LENGTH;
  var captcha = [];

  // Create a captcha of a random length
  while (captcha.length < captchaLength) {
    //below code will not allow Repetition of Characters
    var charIndex = Math.floor(Math.random() * charSet.length); //get the next character from the array
    var selectedChar = charSet[charIndex];

    // If the character has already been used, keep looping 
    if (captcha.indexOf(selectedChar) != -1) {
      while (captcha.indexOf(selectedChar) == -1) {
        // Increment + wrap around
        charIndex++;
        charIndex %= charSet.length;
        // Get a new selectd character
        selectedChar = charSet[charIndex];
      }
    }

    captcha.push(selectedChar);
  }

  return captcha;
}


function createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha').innerHTML = "";

  // Define some cool character sets
  var roman = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var russian = "яазшсхедцрфвтгбычнуймикиколпь";
  var japanese = "たていすかんなにらせむへけれりのまくきはしとちつさそひこみもねるめぬふあうえおやゆよわほ";

  var charSets = [
    roman, russian, japanese
  ];

  var fonts = [
    "Chalkduster",
    "Helvetica",
    "Monospace",
    "Wingdings",
    "Arial",
    "Papyrus",
    "Curlz MT",
    "Mistral",
  ];

  var charSet = roman;
  var font = "Arial";
  // The ol' Jebait
  if (numCorrect > 0 || numCreated > 2) {
    charSet = charSets[Math.floor(Math.random() * charSets.length)];
    font = fonts[Math.floor(Math.random() * fonts.length)];
  }

  var captcha = createCaptchaText(charSet);

  var charWidth = 15;

  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = (captcha.length + 1) * charWidth;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "25px " + font;

  // Build the dang thing
  for (var i = 0; i < captcha.length; i++) {
    ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeText("" + captcha[i], 15 * i, Math.floor(Math.random() * 20) + 25);
  }

  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  code = captcha.join("");
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
  event.preventDefault();
  if (document.getElementById("cpatchaTextBox").value == code) {
    numCorrect++;
    // Only show the goods if they get lucky enough
    var successProbability = .20;

    if (numCorrect > 1 && Math.random() < successProbability) {
      alert("You did it!");
      window.location = "https://challonge.com/ii2qhgcb";
    } else {
      alert("Correct! Completed Captcha " + numCorrect + "/" + numRequired);
      createCaptcha();
    }
    
  }else{
    alert("Invalid Captcha. try Again");
    createCaptcha();
  }
}
