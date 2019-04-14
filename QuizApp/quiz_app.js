//////////////////////////////
// coding challenge - Quiz app
//////////////////////////////

(function() {
    var Question = function(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    };

    Question.prototype.show = function() {
        console.log(this.question);
        for (var i=0; i<this.answers.length; i++) {
            console.log((i + 1) + '. ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(answer, callback) {
        var score;
        if (answer === this.correctAnswer) {
            console.log('Correct answer');
            score = callback(true);
        } else {
            console.log('Sorry Wrong answer');
            score = callback(false);
        }
        
        this.displayScore(score);
    }

    Question.prototype.displayScore = function(score) {
        console.log('Current score ' + score);
        console.log('-----------------------------------');
    }

    var q1 = new Question('What u r learning', ['JS', 'React'], 1);
    var q2 = new Question('Who is ur teacher', ['Jonas', 'Mark'], 1);
    var q3 = new Question('Will you quit in middle', ['Yes', 'No', 'Maybe'], 2);

    var questions = [q1, q2, q3];

    var score = function() {
        var sc = 0;
        return function(correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    };
    
    var keepScore = score();
    function nextQuestion() {
        var q = Math.floor(Math.random() * questions.length);
        questions[q].show();

        var userAnswer = prompt('Please select the correct answer (just type the number), type exit to quit the app');

        if (userAnswer != 'exit') {
            questions[q].checkAnswer(parseInt(userAnswer), keepScore);
            nextQuestion();
        }
    }

    nextQuestion();
})();