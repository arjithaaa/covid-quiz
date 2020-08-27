//initialising the quiz set

var quizSet = new Array(10);

function Quiz (q, a, b, c, d, ans){ //constructor fn
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
quizSet[5] = new Quiz("When should masks be worn?","A. Always","B. While going outside","C. Never","D. Inside the house", "B");
quizSet[6] = new Quiz("What is the usual recovery period for serious cases?","A. 1 week","B. 10 weeks","C. 6 months","D. 3-6 weeks", "D");
quizSet[7] = new Quiz("Can COVID-19 spread through food?","A. No","B. Sometimes","C. Yes","D. Always", "A");
quizSet[8] = new Quiz("Which country has the maximum number of cases?","A. India","B. USA","C. Pakistan","D. New Zealand", "B");
quizSet[9] = new Quiz("Which Indian state has the maximum number of deaths due to COVID-19?","A. Tamil Nadu","B. Rajasthan","C. Maharashtra","D. Delhi", "C");

//the quiz
var i = 0, score = 0;

function showQuiz(){

  if( i == 0){ //hiding intro message
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz").style.display = "block";
  }

  if( i == 9){ //last question
    document.getElementById("nextButton").textContent = "Submit";
  }
  else{
    document.getElementById("nextButton").textContent = "Next";
  }

  for( let j = 0; j < 4 ; j++){
    document.getElementsByClassName("option")[j].classList.add("op");
    document.getElementsByClassName("option")[j].classList.remove("selected-wrong");
    document.getElementsByClassName("option")[j].classList.remove("selected-correct");
  }


  if( quizSet[i].res != 'E'){ //preventing user from changing answer in prev ques
    for( let j = 0; j < 4 ; j++){
      document.getElementsByClassName("option")[j].classList.remove("op");
    }
    if ( quizSet[i].res == quizSet[i].ans ){ //displaying result of prev questions
      document.getElementById("option" + quizSet[i].res).classList.add("selected-correct");
    }
    else{
      document.getElementById("option" + quizSet[i].res).classList.add("selected-wrong");
      document.getElementById("option" + quizSet[i].ans).classList.add("selected-correct");
    }

  }

  //displaying question and options
  document.getElementById("ques").textContent = quizSet[i].q;
  document.getElementById("optionA").textContent = quizSet[i].a;
  document.getElementById("optionB").textContent = quizSet[i].b;
  document.getElementById("optionC").textContent = quizSet[i].c;
  document.getElementById("optionD").textContent = quizSet[i].d;
}

function eval(res){ //evaluating response and scoring
  if(quizSet[i].attempted === false){
    if ( res == quizSet[i].ans ){
      document.getElementById("option" + res).classList.add("selected-correct");
      score += 1;
    }
    else{
      document.getElementById("option" + res).classList.add("selected-wrong");
      document.getElementById("option" + quizSet[i].ans).classList.add("selected-correct");
    }
    document.getElementById("score").textContent = "Score : "+score;
    for( let j = 0; j < 4 ; j++){
      document.getElementsByClassName("option")[j].classList.remove("op");
    }
    quizSet[i].attempted = true;
    quizSet[i].res = res;
  }
}

function nextQues(){ //navigating to next ques
  i++;
  if( i == 10)endQuiz();
  else showQuiz();
}

function prevQues(){ //navigating to prev ques
  if(i != 0){
    i--;
}
showQuiz();
}

function endQuiz(){ //hide card, display score
  document.getElementById("card").style.display = "none";
  document.getElementById("end").style.display = "block";

  document.getElementById("finalReport").textContent = "You scored "+score+"/10.";
}
