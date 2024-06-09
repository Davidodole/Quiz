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
  
  let url = "https://opentdb.com/api.php?amount=3&category=9&difficulty=hard&type=multiple";
  
  if(value !== "") {
        url += `https://opentdb.com/api.php?amount=3&category=${ value }&difficulty=hard&type=multiple`
  
  

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
    
    let minutes = 1;
    let sec = 30;
      
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
               },1000)
              
            }
      }, 1000);
        
      function showQuestion() {
      // the value return from api calls
        
      let results = res.results;
    const questions = results[currentQuestion];
 questionElement.innerHTML= questions.question;
    
    
    category.innerHTML= questions.category;
  const incorrect_Answers = questions.incorrect_answers;
  const correct_Answer = questions.correct_answer;
  
 let answers = incorrect_Answers;
 answers.splice(Math.floor(Math.random() * (incorrect_Answers.length + 1)),0, correct_Answer)
  
  
  optionsElement.innerHTML = "";
  answers.forEach(ans =>{
        
        const button = document.createElement("button");
      button.innerText = ans;
       optionsElement.appendChild(button);
       
       button.addEventListener("click", selectAnswer);
    })
    
    function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = correct_Answer;
  
    if (selectedButton.innerText === answer) {
      score++;
      selectedButton.style.background = "green";
    }
    else{
          selectedButton.style.background = "red";
    }
      
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
  
  function showResult() {
    quiz.innerHTML = `
      <h1>Quiz Completed!</h1>
    <p>Your score: ${score}/${results.length}</p>
      <button id="again"> Play Again</button>
    `;
    document.getElementById("again").addEventListener("click",()=>{
         window.location.reload();
    })
    if (score >= 6) {
      clapping.play();
     clapping.playbackspeed = "1.72";
    }
    else{
       laughing.play();
     laughing.playbackspeed = "1.72";
    }
  }
  
  })
     
};
})
