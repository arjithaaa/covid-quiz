//initialising the quiz set

var quizSet = new Array(10);

function Quiz(q, a, b, c, d, ans) { //constructor fn
  this.q = q;
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.ans = ans;
  this.res = 'E'; //initialised to a random value
  this.attempted = false;
}

quizSet[0] = new Quiz("How is COVID-19 passed on?", "A. Drinking unclean water", "B. Droplets coming from our nose and mouth", "C. Parasites", "D. All of the above", "B");
quizSet[1] = new Quiz("What are the symptoms of COVID-19?", "A. Cough", "B. Fever", "C. Tiredness", "D. All of the above", "D");
quizSet[2] = new Quiz("Where does COVID-19 orignate from?", "A. China", "B. India", "C. UK", "D. USA", "A");
quizSet[3] = new Quiz("Which statement is true?", "A. All patients show symptoms", "B. No patient shows symptoms", "C. Some patients show symptoms", "D. None of the above", "C");
quizSet[4] = new Quiz("Which of the following is not just a myth?", "A. Antibiotics can prevent COVID-19", "B. Good nutrition can prevent the corona virus", "C. Wearing a mask is necessary", "D. None of the above", "C");
quizSet[5] = new Quiz("When should masks be worn?", "A. Always", "B. While going outside", "C. Never", "D. Inside the house", "B");
quizSet[6] = new Quiz("What is the usual recovery period for serious cases?", "A. 1 week", "B. 10 weeks", "C. 6 months", "D. 3-6 weeks", "D");
quizSet[7] = new Quiz("Can COVID-19 spread through food?", "A. No", "B. Sometimes", "C. Yes", "D. Always", "A");
quizSet[8] = new Quiz("Which country has the maximum number of cases?", "A. India", "B. USA", "C. Pakistan", "D. New Zealand", "B");
quizSet[9] = new Quiz("Which Indian state has the maximum number of deaths due to COVID-19?", "A. Tamil Nadu", "B. Rajasthan", "C. Maharashtra", "D. Delhi", "C");

//the quiz
var i = 0, //question number
  correctAns = 0, //to display no of correct ans at navbar
  score = 0, //final score
  name = "",
  no, //chosen random question's index
  start, //time when quiz starts
  time, //for clearInterval
  timeOut, //for clearTimeout
  posScore = 0,
  negScore = 0;
var randomOrder = new Array();
localStorage.setItem("score", 0);


function storeName() { //stores player's name
  name = document.getElementById("name").value;
  if (name == "") document.getElementById("warning").style.display = "inline-block";
  else startQuiz();
}


function startQuiz() { //prepares for starting quiz
  genRandomOrder();
  start = Date.now();
  timer();
  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz").style.display = "flex";
  showQuiz();
}

function genRandomOrder() { //generates the array containing random order of questions
  let c = 0;
  while (c < 10) {
    let x = Math.floor(Math.random() * 10); //gen random no. between 0 and 9
    if (c == 0) {
      randomOrder.push(x);
      c++;
    } else {
      for (var k = 0; k < randomOrder.length; k++) {
        if (randomOrder[k] == x) break;
      }
      if (k == randomOrder.length) {
        randomOrder.push(x);
        c++;
      }
    }
  }
}

function timer() { //calculates and displays time left
  time = setInterval(function() {
    document.getElementById("timer").textContent = "Time Left : " + (parseInt(120 - (Date.now() - start) / 1000)).toString();
  }, 1);
  timeOut = setTimeout(function() { //auto submit after 2 mins
    endQuiz();
  }, 120000);
}

function showQuiz() { //handles displaying question and options

  if (i == 9) { //last question
    document.getElementById("nextButton").textContent = "Submit";
  } else {
    document.getElementById("nextButton").textContent = "Next";
  }

  for (let j = 0; j < 4; j++) {
    document.getElementsByClassName("option")[j].classList.add("op");
    document.getElementsByClassName("option")[j].classList.remove("selected-wrong");
    document.getElementsByClassName("option")[j].classList.remove("selected-correct");
  }

  no = randomOrder[i];
  if (quizSet[no].res != 'E') { //preventing user from changing answer in prev ques
    for (let j = 0; j < 4; j++) {
      document.getElementsByClassName("option")[j].classList.remove("op");
    }
    if (quizSet[no].res == quizSet[no].ans) { //displaying result of prev eval questions
      document.getElementById("option" + quizSet[no].res).classList.add("selected-correct");
    } else {
      document.getElementById("option" + quizSet[no].res).classList.add("selected-wrong");
      document.getElementById("option" + quizSet[no].ans).classList.add("selected-correct");
    }

  }

  //displaying question and options
  document.getElementById("ques").textContent = quizSet[no].q;
  document.getElementById("optionA").textContent = quizSet[no].a;
  document.getElementById("optionB").textContent = quizSet[no].b;
  document.getElementById("optionC").textContent = quizSet[no].c;
  document.getElementById("optionD").textContent = quizSet[no].d;
}

function eval(res) { //evaluating response and related scoring
  if (quizSet[no].attempted === false) {
    if (res == quizSet[no].ans) {
      document.getElementById("option" + res).classList.add("selected-correct");
      correctAns += 1;
      posScore += 4;
    } else {
      document.getElementById("option" + res).classList.add("selected-wrong");
      document.getElementById("option" + quizSet[no].ans).classList.add("selected-correct");
      negScore -= 1;
    }
    document.getElementById("correctAns").textContent = "Correctly Answered : " + correctAns + "/10";
    for (let j = 0; j < 4; j++) {
      document.getElementsByClassName("option")[j].classList.remove("op");
    }
    quizSet[no].attempted = true;
    quizSet[no].res = res;

    //changing colour in side bar
    document.getElementById('q' + (i + 1)).classList.add("side");
    document.getElementById('q' + (i + 1)).classList.add("side");
  }
}

function nextQues() { //navigating to next ques
  i++;
  if (i == 10) endQuiz();
  else showQuiz();
}

function prevQues() { //navigating to prev ques
  if (i != 0) {
    i--;
  }
  showQuiz();
}

function navigate(num) { //nav using side bar
  i = num - 1;
  showQuiz();
}

function endQuiz() { //hide card, display final score
  clearInterval(time);
  clearTimeout(timeOut);
  //calculating score
  let timeLeft = 120 - (Date.now() - start) / 1000,
    timeScore;
  for (let a = 100; a >= 0; a -= 10) {
    if (timeLeft > a) {
      timeScore = a / 10;
      break;
    }
  }

  score = posScore + negScore + timeScore;

  document.getElementById("card").style.display = "none";
  document.getElementById("end").style.display = "flex";

  document.getElementById("finalReport").textContent = "Congrats " + name + "! You scored " + score + "/50.";
  highScoreDisp();
}

function highScoreDisp() { //updating and displaying high score using localStorage
  if (score > localStorage.getItem("score")) {
    localStorage.setItem("score", score);
    localStorage.setItem("name", name);
  }
  document.getElementById("hsName").textContent = "Name : " + localStorage.getItem("name");
  document.getElementById("hsScore").textContent = "Score : " + localStorage.getItem("score") + "/50";
}
