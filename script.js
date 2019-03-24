var code;
function createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha').innerHTML = "";
  var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var charsArray = "яазшсхедцрфвтгбычнуймикиколпь";
  var charsArray = "たていすかんなにらせむへけれりのまくきはしとちつさそひこみもねるめぬふあうえおやゆよわほ";
  var fonts = [
    "Chalkduster",
    "Helvetica",
    "Monospace",
    "Wingindgs",
    "Arial",
    "Papyrus",
    "Curlz MT",
    "Mistral",

  ];
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 100;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "25px Papyrus";

  for (var i = 0; i < captcha.length; i++) {
    ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeText("" + captcha[i], 15 * i, Math.floor(Math.random() * 20) + 25);
    
  }

  // ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  code = captcha.join("");
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
  event.preventDefault();
  if (document.getElementById("cpatchaTextBox").value == code) {
    alert("Valid Captcha")
  }else{
    alert("Invalid Captcha. try Again");
    createCaptcha();
  }
}
