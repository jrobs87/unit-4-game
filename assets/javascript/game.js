console.log('Run the Jewels!'); // just for fun - looks js file and jquery loaded
let input = 0;
let randomNumber = 0;
let userNumber = 0;
let winCount = 0;
let lossCount = 0;

$(document).ready(function () {
    // RANDOM NUMBER GENERATOR - Populating our random number
    function randomNumberGen() {
        randomNumber = Math.ceil(Math.random() * (120 - 19) + 19);
        $('#randomNumber').text(randomNumber);
        userNumber = 0; // Set the user number to zero for a new game
        $('#userNumber').text(userNumber); // insert 0 user number into html
        console.log('The random number is ' + randomNumber);
    };

    function gemNumberGen() {
        numbersUsed = [];
        gemArray = ['.blue', '.green', '.purple', '.yellow']; //corresponding to gem classes
        for (i = 0; i < gemArray.length; i++) {
            number = Math.ceil(Math.random() * (12 - 1) + 1); // generating a number between 1-12
            // Begin Number Validation to insure unqie gem values - this kinda works but not really....
            for (n = 0; n < numbersUsed.length; n++) {
                if (numbersUsed[n] === number) {
                    console.log('Duplicate gem value caught');
                    number = Math.ceil(Math.random() * (12 - 1) + 1);
                };
            };
            // End Number Validation
            
            numbersUsed.push(number);
            $(gemArray[i]).val(number);
        };
        console.log(numbersUsed);
    };


    // CHECK WIN CONDITIONS - checks to see if the user number equals the random number for the win 
    function winCheck() {
        if (userNumber === randomNumber) {
            console.log('You won!');
            winCount++;
            $('#wins').text(winCount);
            // $('#world').css("visibility", "visible"); // SHOW CONFETTI
            randomNumberGen();
        } else if (userNumber > randomNumber) {
            console.log('You went over.');
            lossCount++;
            $('#losses').text(lossCount);
            randomNumberGen();
        };
    };

    // CAPTURE USER INPUT - getting out user input here - clicking gem buttons stores the associated html attribute value
    $('.gem').click(function () {
        input = parseInt(($(this).val())); // stores value and converts to an integer
        console.log('This gem is worth ' + input + ' points.');
        // update UserNumber 
        userNumber = userNumber + input;
        $('#userNumber').text(userNumber);
        console.log('Your number so far is ' + userNumber);
        // check for win conditions
        winCheck();
    });

    randomNumberGen();
    gemNumberGen();


});


// CONFETTI FOR THE WIN!
(function () {
    var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

    NUM_CONFETTI = 350;

    COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

    PI_2 = 2 * Math.PI;

    canvas = document.getElementById("world");

    context = canvas.getContext("2d");

    window.w = 0;

    window.h = 0;

    resizeWindow = function () {
        window.w = canvas.width = window.innerWidth;
        return window.h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeWindow, false);

    window.onload = function () {
        return setTimeout(resizeWindow, 0);
    };

    range = function (a, b) {
        return (b - a) * Math.random() + a;
    };

    drawCircle = function (x, y, r, style) {
        context.beginPath();
        context.arc(x, y, r, 0, PI_2, false);
        context.fillStyle = style;
        return context.fill();
    };

    xpos = 0.5;

    document.onmousemove = function (e) {
        return xpos = e.pageX / w;
    };

    window.requestAnimationFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    }();

    Confetti = class Confetti {
        constructor() {
            this.style = COLORS[~~range(0, 5)];
            this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
            this.r = ~~range(2, 6);
            this.r2 = 2 * this.r;
            this.replace();
        }

        replace() {
            this.opacity = 0;
            this.dop = 0.03 * range(1, 4);
            this.x = range(-this.r2, w - this.r2);
            this.y = range(-20, h - this.r2);
            this.xmax = w - this.r;
            this.ymax = h - this.r;
            this.vx = range(0, 2) + 8 * xpos - 5;
            return this.vy = 0.7 * this.r + range(-1, 1);
        }

        draw() {
            var ref;
            this.x += this.vx;
            this.y += this.vy;
            this.opacity += this.dop;
            if (this.opacity > 1) {
                this.opacity = 1;
                this.dop *= -1;
            }
            if (this.opacity < 0 || this.y > this.ymax) {
                this.replace();
            }
            if (!(0 < (ref = this.x) && ref < this.xmax)) {
                this.x = (this.x + this.xmax) % this.xmax;
            }
            return drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
        }
    };



    confetti = function () {
        var j, ref, results;
        results = [];
        for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
            results.push(new Confetti());
        }
        return results;
    }();

    window.step = function () {
        var c, j, len, results;
        requestAnimationFrame(step);
        context.clearRect(0, 0, w, h);
        results = [];
        for (j = 0, len = confetti.length; j < len; j++) {
            c = confetti[j];
            results.push(c.draw());
        }
        return results;
    };

    step();

}).call(this);

