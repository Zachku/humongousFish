var typeFastApp = angular.module('typeFastApp', []);

typeFastApp.controller('typeFastController', ['$scope', function ($scope) {
        $scope.isInputDisabled = true;

        // character combinations for exercise to be generated
        $scope.exercises = [
            { name : "asdfg"},
            { name : "hjklöä"},
            { name : "qwert"},
            { name : "yuiop"},
            { name : "zxcvb"},
            { name : "nm,.-" },
            { name : "12345"},
            { name : "67890" },
            { name : "1234567890" },
            { name : "yhnmjuik,.lopö-åä"},
            { name : "qazwsxedcrfvtgb"},
            { name : "qwertyuipåasdfghjklöääzxcvbnm" },
            { name : "qwertyuipåasdfghjklöääzxcvbnm1234567890" },
            { name : "Random words"}
        ];

        // possible lengths for test
        $scope.wordCounts = [
            { count: 2 },
            { count: 20 },
            { count: 30 },
            { count: 40 },
            { count: 50 },
            { count: 60 },
            { count: 70 },
            { count: 80 },
            { count: 90 },
            { count: 100 },
        ];
        $scope.wordCount = $scope.wordCounts[0];

        $scope.currentExercise = "";
        
        var words = [
            "israelilaisille", 
            "että",
            "he", 
            "kääntyvät", 
            "takaisin", "ja", "leiriytyvät", "Pii-Hahirotin", "kohdalle", "Migdolin", "ja", "meren", "välille", "leiriytykää", "vastapäätä", "Baal-Sefonia", "meren", "rannalle",
            "farao", "on", "ajatteleva", "että", "israelilaiset", "ovat", "eksyneet", "maassa", "ja", "että", "erämaa", "on", "saartanut", "heidät",
            "minä", "paadutan", "faraon", "sydämen", "niin", "että", "hän", "ajaa", "heitä", "takaa", "mutta", "minä", "näytän", "kunniani", "tuhoamalla", "faraon", "ja", "koko", "hänen", "sotajoukkonsa", "ja", "niin", "egyptiläiset", "tulevat", "tietämään", "että", "minä", "olen", "Herra", "Ja", "he", "tekivät", "niin",
            "Egyptin", "kuninkaalle", "ilmoitettiin", "että", "kansa", "oli", "paennut", "muuttui", "faraon", "ja", "hänen", "palvelijainsa", "mieli", "kansaa", "kohtaan", "ja", "he", "sanoivat:", "Mitä", "teimmekään", "kun", "päästimme", "Israelin", "meitä", "palvelemasta!",
            "hän", "valjastutti", "hevoset", "sotavaunujensa", "eteen", "ja", "otti", "väkensä", "mukaansa",
            "1", 
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
        ];

        var errors = 0; 
        var audio = new Audio('./audio/punch.mp3');
        var started = false;
        
        var resultColorPassed = {"background": "green"};
        var resultColorFailed = {"background": "red"};

        var startTime;
        var endTime;
        
        $scope.end;
        $scope.start;
        
        /*
         * Test has started and user has pressed the button 
         */
        $scope.check = function () {
            var input = $scope.textInput;
            var lengthOfInput = input.length;
            var lastCharOfInput = input.charAt(lengthOfInput - 1);
            
            var exercise = $scope.currentExercise;
            var firstCharOfExercise = exercise.charAt(0);
            
            if (started == false) {
                started = true;
                startTime = new Date();
                passStartTime();
            }    
            if (lastCharOfInput == firstCharOfExercise || (lastCharOfInput == " " && firstCharOfExercise == " ")) { 
                $scope.currentExercise = exercise.substring(1, exercise.length);
                $scope.exerciseText = $scope.currentExercise;
                if (exercise.length <= 1) {
                    showResults();
                    $scope.isInputDisabled = true;
                    $scope.currentExercise = "";
                    $scope.exerciseText = "";
                }
            } else {
                $scope.textInput = input.substring(0, input.length-1);
                errors++;
                audio.play();
            }
        };

        /*
         * When the test is over we send the results to user
         */
        showResults = function() {

            endTime = new Date();

            var timeItTook = (endTime.getTime() - startTime.getTime()) / 1000;
            var wmp = ($scope.wordCount.count / (timeItTook / 60)).toFixed(2);

            //Check if user had 5 or more typos
            if(errors > 5){
                greetings = "Better luck next time!";
                $scope.resultColor = resultColorFailed;
            } else {
                greetings = "Well done!";
                $scope.resultColor = resultColorPassed;
            }

            passEndTime();
            $("#resultDiv").html(greetings + "<br>" + "You had " + errors + " typos and it took " + timeItTook + " seconds. <br>Your WPM is " + wmp);

            $("#resultDiv").toggle();
        };

        $scope.useWords = function () {
            var generatedEx = "";
            for (var i = 0; i < $scope.wordCount.count; i++) {
                generatedEx += words[Math.floor(Math.random() * words.length)];
                generatedEx += i < $scope.wordCount.count - 1 ? " " : "";
            }
            $scope.currentExercise = generatedEx;
            $scope.exerciseText = $scope.currentExercise;
            $scope.reset();
        };
        
        /*
         * Autogenerate function to create texts to write
         */
        $scope.generateText = function () {
            var possibleChars = $scope.exercise.name;
            if (possibleChars == $scope.exercises[$scope.exercises.length-1].name){
                return $scope.useWords();
            }
            var generatedEx = "";

            var minLengthOfWord = 3;
            var maxLengthOfWord = 7;
            var lengthOfWord = 5;
            
            for (var i = 0; i < $scope.wordCount.count; i++) {
                var word = "";
                lengthOfWord = minLengthOfWord + Math.floor(Math.random() * (maxLengthOfWord - minLengthOfWord));
                for (var j = 0; j < lengthOfWord; j++) {
                    generatedEx += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
                }
                if (i < $scope.wordCount.count - 1) {
                    generatedEx += " ";
                }                ;
            }
            $scope.currentExercise = generatedEx;
            $scope.exerciseText = $scope.currentExercise;
            $scope.reset();
        };
        
        $scope.submitOwnText = function () {
            $scope.currentExercise = $scope.ownExerciseInput;
            $scope.exerciseText = $scope.ownExerciseInput;
            $scope.reset();
        }
        
        /*
         * Reset the application
         */
        $scope.reset = function () {
            $("#resultDiv").hide();
            $scope.start = "0";
            $scope.end = "0";
            errors = 0;
            $scope.textInput = "";
            started = false;
            $scope.isInputDisabled = false;
            $('#textInput').focus();

        }
        
        
        /*
         *  Pass start and end time to view 
         */
        passStartTime = function () {
            var h = startTime.getHours();
            var min = startTime.getMinutes() >= 10 ? startTime.getMinutes() : "0" + startTime.getMinutes();
            var sec = startTime.getSeconds() >= 10 ? startTime.getSeconds() : "0"+ startTime.getSeconds();
            $scope.start = h + ":" + min + ":" + sec;
        }
        passEndTime = function () {
            var h = endTime.getHours();
            var min = endTime.getMinutes() >= 10 ? endTime.getMinutes() : "0" + endTime.getMinutes();
            var sec = endTime.getSeconds() >= 10 ? endTime.getSeconds() : "0" + endTime.getSeconds();
            $scope.end = h + ":" + min + ":" + sec;
        }

}]);