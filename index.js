//  declearing a variables
 const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitButton = document.getElementById("submit");
  const correct = document.getElementById("correct");
  const category = document.getElementById("category");
  const source = document.getElementById("source");
  const clapping = document.getElementById("clapping");
  const laughing = document.getElementById("laughing");
  const select = document.getElementById("select");
  const timer = document.getElementById("timer");
  
select.addEventListener("submit", (e)=>{
      e.preventDefault();
      
  const value = document.getElementById("option").value;
  
  let url = "https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple";
  
  if(value !== "") {
        url += `https://opentdb.com/api.php?amount=20&category=${ value }&difficulty=hard&type=multiple`
  
  

// Api call
      const apiRequest = fetch(url).then(response =>{
      return response.json();
}).then(res =>{
      
      // declearing a variables 
      let currentQuestion = 0;
      let score = 0;
      let results = res.results;
       showQuestion();

        //setting timer for the questions
    
    let minutes = 5;
    let sec = 59;
      
      setInterval(function () {
             
        timer.textContent =`Time left : ${minutes}: ${sec} sec`;
            sec--;
            if(sec <= 9) {
            
                  timer.textContent =`Time left : ${minutes}: 0${sec} sec`;
            }
            
            if(sec === 0) {
                  minutes--;
                  sec = 59              
            
            }
            
            if (minutes === 0) {
               timer.textContent = "Time Up";
               setTimeout(function () {
                  showResult();
               },1000);
            }
      }, 1000);

        // showing question that was retrieved from api calls to the users 
        
      function showQuestion() {
      // the value return from api calls
        
      let results = res.results;
    const questions = results[currentQuestion];
 questionElement.innerHTML= questions.question;
    
    // showing categories of questions based on the users selection 
    category.innerHTML= questions.category;

        //using splice to add and remove correct answers
  const incorrect_Answers = questions.incorrect_answers;
  const correct_Answer = questions.correct_answer;
  
 let answers = incorrect_Answers;
 answers.splice(Math.floor(Math.random() * (incorrect_Answers.length + 1)),0, correct_Answer)
  
  
  optionsElement.innerHTML = "";
        
  answers.forEach(ans =>{

    // creating a button to display all answers 
        const button = document.createElement("button");
      button.innerText = ans;

    //append the button to optionsElement
       optionsElement.appendChild(button);

    //creating eventlistener to every button the user clicked on 
    
       button.addEventListener("click", selectAnswer);
    })

        // selecting answers from the displayed buttons 
        
    function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = correct_Answer;
  
    if (selectedButton.innerText === answer) {

      // adding to the score of the users if the click button equals to the answers
      
      score++;
      // change the background to green to indicate correct answer 
      selectedButton.style.background = "green";
    }
    else{
      // change the background to red to indicate wrong answer 
          selectedButton.style.background = "red";
    }
      //iterate to the next question 
      
      currentQuestion++;    
  
    if (currentQuestion < results.length) {
    
    setTimeout(function () {
         showQuestion(); 
         correct.innerHTML="";
    },3000);
    
    correct.innerHTML= "correct answer: " + answer;
    } else {
    setTimeout(function () {
          showResult();
    },3000)
      correct.innerHTML= "correct answer: " + answer;
    }
  }
  }
        
  //after the quiz show this
        
  function showResult() {
    quiz.innerHTML = `
      <h1>Quiz Completed!</h1>
    <p>Your score: ${score}/${results.length}</p>
      <button id="again"> Play Again</button>
    `;

    //adding eventlistener to reload page
    document.getElementById("again").addEventListener("click",()=>{
         window.location.reload();
    })

    //if the scores is higher than 10 play this 
    if (score >= 10) {
      clapping.play();
     clapping.playbackspeed = "1.72";
    }
    else{
      // if the scores is less than 10 play this
       laughing.play();
     laughing.playbackspeed = "1.72";
    }
  }
  
  })
     
};
})
