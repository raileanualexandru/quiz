fetch("https://opentdb.com/api.php?amount=10")
  .then(response => response.json())
  .then(data => {
    // console.log(data.results)

    let questionArr = []
    let trueResponse = []
    let falseResponse = []
    data.results.forEach(element => {
      questionArr.push(element.question)
      trueResponse.push(element.correct_answer)
      falseResponse.push(element.incorrect_answers)
    });
    //clone falseResponse array in allResponse
    let allResponse = []
    allResponse = [...falseResponse]
    //put true response in allResponse array
    for (let i = 0; i < 10; i++) {
      allResponse[i].push(trueResponse[i])

    }
    for (let i = 0; i < 10; i++) {
      shuffleArray(allResponse[i])
    }

    console.log(trueResponse)

    let score = 0;
    let questionNr = 0;
    let k = 0;
    let chooseBtn = document.querySelectorAll("button");
    document.getElementById("questionNumber").innerHTML = "Question: " + (questionNr + 1) + " / 10";
    document.getElementById("question").innerHTML = questionArr[questionNr]

    for (let j = 0; j < 4; j++) {
      chooseBtn[j].innerHTML = allResponse[k][j]
      if (allResponse[k][j] == undefined) {
        chooseBtn[j].style.display = "none";
      }

    }


    chooseBtn.forEach(function (elem) {
      elem.addEventListener("click", function () {

        questionNr++;

        document.getElementById("question").innerHTML = questionArr[questionNr]
        document.getElementById("questionNumber").innerHTML = "Question: " + (questionNr + 1) + " / 10";

        if (elem.innerText == trueResponse[k]) {
          document.body.style.backgroundColor = "green";
          score++;
        } else {
          document.body.style.backgroundColor = "red";
        }

        document.getElementById("target").innerHTML = score;

        k++;

        for (let j = 0; j < 4; j++) {
          if (k != 10) {
            chooseBtn[j].innerHTML = allResponse[k][j];
            if (allResponse[k][j] == undefined) {
              chooseBtn[j].style.display = "none";
            }
          }

        }


        if (questionNr == 10) {
          alert("your score is: " + score + "\n quiz finished \n click ok for another one!")
          window.location.reload();
        }

      });
    });



  });

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}