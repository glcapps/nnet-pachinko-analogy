window.runPachinko = runPachinko;
function runPachinko() {
    window.snappachinko = {};
    window.snappachinko.s = Snap('#pachinkosvg');
    let myPaper = window.snappachinko.s;
    let pinMap = [7, 8, 4, 5, 2, 1, 3, 6, 9, 10];
    const colorMarioGreen = '#2CB01A';
    const colorWhite = '#FFFFFF';
    const colorOffWhite = '#DDDDDD';
    const colorDimWhite = '#AAAAAA';
    const colorBlack = '#000000';
    const colorMint = '#BADA55';
    const colorSuffixAplhaMed = 'AA';

    //utility functions
    function makeQuickNumberedArray(Count) {
        return Array.apply(null, { length: Count }).map(Number.call, Number);
    }
    function getStringBetween(str, start, end) {
        let startoutset = str.indexOf(start),
            endoutset = str.indexOf(end, startoutset + start.length);
        if (startoutset == 0 || startoutset > endoutset) return "";
        return str.slice(startoutset + start.length, endoutset);
    }
    function shuffleArray(array) {
        return array.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }
    function getHereDocFromCodeBlock(func) {
        let here = "HEREDOC";
        return getStringBetween(func.toString().replace("/*" + here, "{{{start " + here + " }}}").replace(here + "*/", "{{{end " + here + " }}}"), "{{{start " + here + " }}}", "{{{end " + here + " }}}");
    }
    console.log(getHereDocFromCodeBlock(function () {
        /*HEREDOC
        test line 1
        test line 2
        test line with an asterisk *
        HEREDOC*/
    }));
    //end utility functions

    function displayPachinko() {
        const toppad = 75;
        const leftpad = 20;
        const bucketPath = "M4424.5,5004.6c-1455-78.5-2647.8-363.8-3407.8-813.7C444.3,3852.1,138,3438.5,103.5,2958c-28.7-388.6,118.7-729.4,455.7-1056.8l151.2-147.4V-501.5c0-1981.5,3.8-2272.5,30.6-2402.7c197.2-959.2,1468.4-1642.6,3434.6-1845.6c314-32.6,1332.5-32.6,1646.5,0c1139.1,118.7,2031.3,388.6,2651.6,804.1c325.5,218.3,559.1,472.9,687.3,750.5c130.2,285.3,126.4,189.6,126.4,2693.7v2255.3l151.3,147.4c384.8,373.3,528.4,781.1,432.7,1231C9656.9,4145,8071.7,4853.4,5688.1,4998.9C5402.9,5016.1,4692.6,5019.9,4424.5,5004.6z M6051.9,3744.9c970.7-95.7,1834.1-323.5,2345.3-620.3c124.4-72.8,277.6-204.9,277.6-239.3c0-70.8-271.8-269.9-530.3-386.7c-1435.9-654.8-4164-727.5-5892.8-158.9c-321.6,107.2-706.5,298.7-834.7,415.4c-99.5,91.9-101.5,95.7-74.7,145.5c40.2,78.5,233.6,214.4,449.9,317.8c593.5,287.2,1485.7,484.4,2488.9,555.2C4635.1,3796.6,5697.7,3781.2,6051.9,3744.9z";
        const raphaelBucketPath = "M21.589,6.787c-0.25-0.152-0.504-0.301-0.76-0.445c-3.832-2.154-8.234-3.309-9.469-1.319c-1.225,2.103,2.314,5.798,6.293,8.222c0.082,0.051,0.167,0.098,0.25,0.146c5.463-0.402,9.887,0.204,9.989,1.402c0.009,0.105-0.026,0.211-0.083,0.318c0.018-0.025,0.041-0.045,0.057-0.07C29.146,12.943,25.585,9.222,21.589,6.787zM10.337,7.166l-0.722,1.52c-4.339,2.747-6.542,6.193-5.484,8.625c0.19,0.438,0.482,0.812,0.846,1.137l0.456-0.959c-0.156-0.178-0.292-0.365-0.384-0.577c-0.732-1.682,0.766-4.188,3.707-6.417l-3.323,6.994c1.492,1.689,5.748,1.748,10.276,0.154c-0.037-0.354,0.032-0.722,0.232-1.049c0.485-0.796,1.523-1.048,2.319-0.563c0.795,0.486,1.048,1.522,0.562,2.319c-0.484,0.795-1.523,1.047-2.319,0.562c-0.154-0.094-0.281-0.213-0.394-0.344c-4.354,1.559-8.372,1.643-10.553,0.314c-0.214-0.131-0.403-0.279-0.58-0.436l-0.124,0.26c-1.088,1.785,1.883,4.916,5.23,6.957c3.347,2.039,7.493,3.246,8.552,1.502l7.77-10.204c-2.48,0.384-6.154-0.963-9.272-2.864C14.014,12.197,11.131,9.546,10.337,7.166z";
        const raphaelFlagPath = "M9.5,3v10c8,0,8,4,16,4V7C17.5,7,17.5,3,9.5,3z M6.5,29h2V3h-2V29z";
        const bowlingPinPath = "M 12.78 121.69 c -21.75 -33.15 -10.9 -55.3 -2.77 -71.89 c 0.69 -1.4 1.35 -2.76 2.22 -4.62 c 0.13 -0.29 0.28 -2.11 0.38 -4.77 c 0.1 -2.65 0.13 -5.97 0.01 -9.35 c -0.07 -2.2 -0.56 -4.64 -1.05 -7.1 C 10.12 16.69 8.65 9.32 15.93 3 C 16.45 2.56 17 2.15 17.59 1.8 c 2.83 -1.72 6.14 -2.14 9.25 -1.53 c 3.07 0.6 5.98 2.23 8.05 4.62 c 0.47 0.54 0.9 1.13 1.29 1.77 c 0.79 1.3 1.37 2.77 1.68 4.39 c 0.29 1.5 0.35 3.13 0.14 4.87 c -0.18 1.52 -0.45 3.29 -0.75 5.24 c -1.23 8.11 -2.96 19.52 -0.44 24.82 c 0.65 1.36 1.25 2.55 1.88 3.8 c 7.33 14.54 18.63 36.97 -2.69 72.03 c -0.41 0.68 -1.14 1.05 -1.88 1.05 v 0.01 h -19.4 C 13.89 122.88 13.15 122.4 12.78 121.69 L 12.78 121.69 Z M 17 40.56 h 14.23 c -0.14 -2.19 -0.09 -4.54 0.07 -6.93 H 17.08 C 17.11 36.15 17.08 38.54 17 40.56 L 17 40.56 Z M 32.55 47.19 H 16.15 c -0.53 1.14 -1.35 2.81 -2.2 4.54 c -7.59 15.49 -17.69 36.12 1.98 66.74 H 32.9 c 19.18 -32.36 8.7 -53.17 1.88 -66.7 c -0.73 -1.45 -1.42 -2.82 -1.93 -3.89 C 32.74 47.66 32.64 47.43 32.55 47.19 L 32.55 47.19 Z M 16.84 28.62 h 14.94 c 0.34 -2.85 0.76 -5.62 1.13 -8.11 c 0.29 -1.94 0.56 -3.7 0.73 -5.11 c 0.15 -1.29 0.11 -2.47 -0.09 -3.53 c -0.21 -1.11 -0.6 -2.09 -1.12 -2.95 c -0.24 -0.4 -0.53 -0.8 -0.86 -1.17 C 30.15 6.12 28.14 5.01 26 4.59 c -2.1 -0.41 -4.3 -0.15 -6.13 0.96 c -0.36 0.22 -0.71 0.47 -1.06 0.78 c -5.34 4.63 -4.12 10.74 -2.91 16.78 C 16.26 24.95 16.62 26.77 16.84 28.62 L 16.84 28.62 Z";
        const checkPath = "M5.48 10.089l1.583-1.464c1.854.896 3.028 1.578 5.11 3.063 3.916-4.442 6.503-6.696 11.312-9.688l.515 1.186c-3.965 3.46-6.87 7.314-11.051 14.814-2.579-3.038-4.301-4.974-7.469-7.911zm12.52 3.317v6.594h-16v-16h15.141c.846-.683 1.734-1.341 2.691-2h-19.832v20h20v-11.509c-.656.888-1.318 1.854-2 2.915z"

        const pegwidth = 36;
        const pegheight = 36;
        const vspace = 20;
        const hspace = 20;

        let pinAnimations = [];
        let ballAnimations = [];
        let pegAnimations = [];
        let pegLabelAnimations = [];
        let buckets = [];

        function processPeg(weight, bias, activation, x, y) {
            let myDesignation = 'x' + x + 'y' + y;
            let angle = Math.floor(((bias * 0.5) + 0.25) * 90);
            const cornered = 5;
            const rounded = 50;
            let myleftpad = leftpad + y % 2 * 20;
            myPaper[myDesignation] = myPaper.group();
            let myGroup = myPaper[myDesignation];
            let peg = myPaper.rect(0, 0, pegwidth, pegheight, rounded, rounded);
            peg.attr({ fill: colorMint + colorSuffixAplhaMed, stroke: colorBlack, strokeWidth: 3 });
            peg.appendTo(myGroup);
            let textLabel = myPaper.text(10, 25, (angle - 45) + '°');
            textLabel.attr({ fill: colorWhite + '00' });
            textLabel.transform('scale(' + 0.9 + ',' + 0.9 + ')');
            pegLabelAnimations.push([textLabel, { fill: colorBlack }]);
            textLabel.appendTo(myGroup);
            //fixme (y-x) ?huh?
            myGroup.animate({ transform: 'translate(' + ((pegwidth + hspace) * x + myleftpad) + ',' + ((pegheight + vspace) * (y) + pegheight + toppad) + ')' }, 700, mina.bounce);
            // peg.animate({ transform: 'r(' + (angle + '') + ')' }, 700, mina.bounce);
            pegAnimations.push([peg, { r: cornered }, { transform: 'r(' + (angle + '') + ')' }]);
            //peg.animate({ r: cornered }, 3000, mina.easein);
        }
        //init
        myPaper.clear();
        let bouncePath = getHereDocFromCodeBlock(function () {
            /*HEREDOC
            m212,70 
            C222,60 230,90 228,116
            C230,120 235,159 239,161
            C249,179 280,120 307,150
            S313,180 280,273
            C283,273 283,263 247,298
            C247,298 287,328 284,348
            C284,348 322,380 318,410
            C284,410 322,430 283,470
            C304,440 323,550 323,556
            C323,526 466,540 466,590
            C466,590 426,590 429,630
            C439,640 409,610 409,730
            HEREDOC*/
            /*IGNORE

            S212,90 210,150
            C200,486 42,520 412,530 
            C160,532 490,590 400,600
            C400,600 410,610 410,660
            S 410,780 410,680
            S 410,780 410,730
            IGNORE*/
        });
        let testbox = myPaper.circle(0, 0, 5).attr({ fill: colorWhite + "00", stroke: colorBlack + "00", strokeWidth: 3 });
        let testboxgroup = myPaper.group();
        testboxgroup.append(testbox);
        let p = myPaper.path(bouncePath).attr({
            fill: "none",
            stroke: "#aaaaaa00",
            strokeWidth: 0
        });

        //checkboxes behind button
        makeQuickNumberedArray(6).forEach(checkboxNumber => {
            const top = [60, 95, 130, 165, 200, 235];
            const checkboxScale = '1';
            let checkboxGroup = myPaper.group();
            let checkbox = myPaper.path(checkPath);
            checkbox.attr({ transform: 'scale(1.1,1.1)' });
            checkbox.attr({ fill: colorMarioGreen, stroke: colorBlack, strokeWidth: 0.5 });
            checkbox.appendTo(checkboxGroup);
            checkboxGroup.transform('scale(' + checkboxScale + ',' + checkboxScale + ') translate(615,' + top[checkboxNumber] + ')');
        });
        //presentation buttons
        let buttonsGroup = myPaper.group();
        makeQuickNumberedArray(6).reverse().forEach(buttonNumber => {
            let buttonGroup = myPaper.group();
            let button = Snap.parse(ButtonFragmentString());
            buttonGroup.append(button);
            const labels = ['one', 'two', 'three', 'four', 'five', 'six'];
            let textLabel = myPaper.text(17, 16, labels[buttonNumber]);
            textLabel.attr({ stroke: '#000000' });
            textLabel.transform('scale(' + 2.2 + ',' + 2.2 + ') translate(' + (40) + ',' + 24 + ')');
            textLabel.appendTo(buttonGroup);
            buttonGroup.transform('scale(' + 0.8 + ',' + 0.5 + ') translate(' + (Math.random() * 10 + 730) + ',' + (buttonNumber * 71 + 100) + ')')
                .data("buttonNumber", buttonNumber)
                .click(function () {
                    this.animate({ transform: 'scale(' + 0.8 + ',' + 0.5 + ') translate(' + (Math.random() * 10 + 780) + ',' + (buttonNumber * 71 + 50) + ')' }, 300, mina.easein);
                    //call the function in this array that goes with the button number
                    [
                        //first slide moves pins to column headings
                        movePinsToColumns,
                        function () {
                            //demo single ball down round peg pachinko
                            let myPath = myPaper.path(bouncePath).attr({
                                fill: "none", stroke: colorWhite + "00", strokeWidth: 1
                            });
                            testbox.attr({ fill: colorWhite, stroke: colorBlack, strokeWidth: 3 });
                            testboxgroup.drawAtPath(myPath, 4500, {
                                rotate: true, easing: mina.linear, reverse: false, drawpath: false, callback: function () {
                                    //flash bucket
                                    debugger;
                                    Snap.animate(0, 1, function (value) {
                                        buckets[6].attr({ fill: value < 1 ? colorWhite : colorMarioGreen });
                                    }, 1500);
                                }
                            });
                        },
                        function () {
                            ballAnimations.forEach(myItem => {
                                myItem[0].animate({ transform: myItem[2] }, 1000 + (Math.random() * 1000), mina.bounce);
                            });
                        },
                        function () {
                            pegAnimations.forEach(pegTuple => {
                                pegTuple[0].animate(pegTuple[1], 2000, mina.easein);
                            });

                        },
                        function () {
                            pegLabelAnimations.forEach(pegLabelTuple => {
                                //pegLabelTuple[0].attr({fill:colorOffWhite});
                                Snap.animate(0, 2000, function (value) { pegLabelTuple[0].attr({ fill: colorBlack }) });
                                //pegLabelTuple[0].animate({fill:"#000"},2000);
                            });
                            pegAnimations.forEach(pegTuple => {
                                pegTuple[0].animate(pegTuple[2], 2000, mina.bounce);
                            });

                        },
                        BounceBallToBuckets][buttonNumber]();
                });
            buttonGroup.appendTo(buttonsGroup);
        });

        //Balls
        let ballsGroup = myPaper.group();
        let columnPinOfFirstPlay = 4; Math.floor(Math.random() * (pinMap.length + 1));
        makeQuickNumberedArray(360).forEach(ballNumber => {
            let ballGroup = myPaper.group();
            let ball = Snap.parse(BallFragmentString());
            ballGroup.append(ball);
            ballAnimations.push([ballGroup,
                'scale(' + 1 + ',' + 1 + ') translate(' + ((Math.sin(ballNumber * Math.PI / 180) * 1900)) + ',' + ((Math.cos(ballNumber * Math.PI / 180) * 1000)) + ')',
                'scale(' + 0.025 + ',' + 0.025 + ') translate(' + ((Math.random() * 100 * 22) + (pinMap.indexOf(columnPinOfFirstPlay) * (pegwidth + hspace) / 0.025)) + ',' + ballNumber * 9 + ')',
                'scale(' + 0.025 + ',' + 0.025 + ') translate(' + (Math.random() * 100 * 22) + ',' + 600/0.025 + ')'
            ]);
            // ballGroup.transform('scale(' + 1.025 + ',' + 1.025 + ') translate(' + (600) + ',' + (8) + ')');
            ballGroup.appendTo(ballsGroup);
        });
        ballAnimations.forEach(myItem => {
            myItem[0].transform(myItem[1]);
        });
        function MoveBallsToColumns(targetColumnArray) {
            if (targetColumnArray == undefined) { targetColumnArray = makeQuickNumberedArray(10) }

            ballAnimations.forEach(myItem => {
                myItem[0].transform(myItem[2]);
            });
        }
        function BounceBallToBuckets() {
            let myBouncePath = getHereDocFromCodeBlock(function () {
                /*HEREDOC
                m212,70 
                C222,60 230,90 228,116
                C230,120 235,159 239,161
                C249,179 280,120 307,150
                C466,590 426,590 429,630
                C439,640 409,610 409,730
                HEREDOC*/
                /*IGNORE
    
                S212,90 210,150
                C200,486 42,520 412,530 
                C160,532 490,590 400,600
                C400,600 410,610 410,660
                S 410,780 410,680
                S 410,780 410,730
                IGNORE*/
            });
            ballAnimations.forEach(myItem => {
                let myPath = myPaper.path(myBouncePath).attr({
                    fill: "none", stroke: colorWhite + "00", strokeWidth: 1
                });
                debugger;
                let thisGContainer = myPaper.group();
                thisGContainer.append(myItem[0]);
                thisGContainer.drawAtPath(myPath, 4500, {
                    rotate: true, easing: mina.linear, reverse: false, drawpath: false, callback: function () {
                        //flash bucket
                        debugger;
                    }
                });
                // myItem[0].animate({ transform: myItem[3] }, 1000 + (Math.random() * 1000), mina.bounce);
            });
        }
        //Pegs
        makeQuickNumberedArray(10).forEach(x => {
            makeQuickNumberedArray(10).forEach(y => {
                processPeg(Math.random(), (Math.random()), 'diamond', y, x);
            });
        });
        //Bowling Pins
        let pinsGroups = myPaper.group();
        makeQuickNumberedArray(10).forEach(bowlingPinNumber => {
            drawBowlingPin(bowlingPinNumber, true);
            drawBowlingPin(bowlingPinNumber, false);
        });
        function drawBowlingPin(bowlingPinNumber, isMovable) {
            const pinScale = 0.7;
            let pinGroup = myPaper.group();
            let pin = myPaper.path(bowlingPinPath);
            pin.attr({ fill: colorOffWhite, stroke: colorDimWhite, strokeWidth: 1 });

            if (isMovable) { pinAnimations.push([pinGroup, 'scale(' + pinScale + ',' + pinScale + ') translate(' + (15 + leftpad + (bowlingPinNumber * (pegwidth + hspace) / pinScale)) + ',' + (pegwidth / 2) + ')']) };
            function moveBowlingPinsToFormation() {
                const leftmargin = 870;
                const topmargin = 430;
                const rowWidth = 40;
                const rowHeight = 65;
                let pinPositions = [[], [leftmargin + rowWidth * 3, topmargin + rowHeight * 3], [leftmargin + rowWidth * 2, topmargin + rowHeight * 2], [leftmargin + rowWidth * 4, topmargin + rowHeight * 2], [leftmargin + rowWidth, topmargin + rowHeight], [leftmargin + rowWidth * 3, topmargin + rowHeight], [leftmargin + rowWidth * 5, topmargin + rowHeight], [leftmargin, topmargin], [leftmargin + rowWidth * 2, topmargin], [leftmargin + rowWidth * 4, topmargin], [leftmargin + rowWidth * 6, topmargin]];
                pinGroup.transform('scale(' + pinScale + ',' + pinScale + ') translate(' + pinPositions[pinMap[bowlingPinNumber]][0] + ',' + pinPositions[pinMap[bowlingPinNumber]][1] + ')');
            }
            moveBowlingPinsToFormation();
            pinGroup.append(pin);
            let labelText = pinMap[bowlingPinNumber];
            let textLabel = myPaper.text(9, 22, '' + labelText);
            textLabel.attr({ stroke: colorWhite });
            textLabel.transform('scale(' + 2 + ',' + 2 + ') translate(-' + (labelText - 10 ? 1 : 5) + ',' + 24 + ')');
            textLabel.appendTo(pinGroup);
            pinsGroups.add(pinGroup);
            pinGroup.appendTo(pinsGroups)
                .data("bowlingPinNumber", bowlingPinNumber)
                .click(function () {
                    movePinsToColumns();
                });
        }
        function movePinsToColumns() {
            pinAnimations.forEach(pinGroupTuple => {
                //pinGroupTuple[0].animate({transform:(pinGroupTuple[1])});
                pinGroupTuple[0].animate({ transform: pinGroupTuple[1] }, 300, mina.easein);
            });
        }
        //Buckets / Pipes
        makeQuickNumberedArray(10).forEach(bucketNumber => {
            const bucketScaleHorizontal = 163;
            const bucketScaleVertical = 110;
            let bucketGroup = myPaper.group();
            let bucket = myPaper.path(bucketPath);
            bucket.attr({ fill: colorMarioGreen });
            bucketGroup.append(bucket);
            buckets[bucketNumber] = bucket;
            let labelText = pinMap[bucketNumber];
            let textLabel = myPaper.text(9, 22, '' + labelText);
            textLabel.attr({ stroke: colorWhite });
            textLabel.transform('scale(' + bucketScaleHorizontal + ',-' + bucketScaleVertical + ') translate(' + (labelText - 10 ? 16 : 12) + ',-' + (bucketScaleVertical / 10) + ')');
            textLabel.appendTo(bucketGroup);
            bucketGroup.transform('scale(' + (1 / bucketScaleHorizontal) + ',-' + (1 / bucketScaleVertical) + ') translate(' + (900 + (bucketNumber * 10000)) + ',-' + ((120 * toppad) + ((70) * 1000)) + ')');
        });

        //Balls
        function BallFragmentString() {
            return getHereDocFromCodeBlock(function () {
                /*HEREDOC
                <linearGradient id="linearGradientRedBall" y2="535.22" gradientUnits="userSpaceOnUse" x2="605.71" y1="535.22"
                    x1="154.29">
                    <stop id="stop15842" style="stop-color:#770900" offset="0" />
                    <stop id="stop15848" style="stop-color:#da101b" offset=".5" />
                    <stop id="stop15850" style="stop-color:#d2400f" offset=".75" />
                    <stop id="stop15852" style="stop-color:#d44316;stop-opacity:.61458" offset=".9375" />
                    <stop id="stop15838" style="stop-color:#c30000;stop-opacity:.21875" offset="1" />
                </linearGradient>
                <path xmlns="http://www.w3.org/2000/svg" id="path14863" style="fill:url(#linearGradientRedBall)"
                    d="m605.71 535.22a225.71 225.71 0 1 1 -451.42 0 225.71 225.71 0 1 1 451.42 0z"
                    transform="matrix(-.67295 -.73969 .73969 -.67295 239.83 1176.5)" />
                HEREDOC*/
            });
        }
        //buttons
        function ButtonFragmentString() {
            return getHereDocFromCodeBlock(function () {
                /*HEREDOC
                <g xmlns="http://www.w3.org/2000/svg" transform="translate(0,-903.36218)" id="layer1">
                <defs xmlns="http://www.w3.org/2000/svg" id="defs4"><linearGradient id="linearGradient3801"><stop id="stop3803" style="stop-color:#ccf7ff;stop-opacity:1" offset="0"/><stop id="stop3805" style="stop-color:#ebfcff;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient6723"><stop id="stop6725" style="stop-color:#c5eff8;stop-opacity:1" offset="0"/><stop id="stop6727" style="stop-color:#6dd2f1;stop-opacity:1" offset="0.14646658"/><stop id="stop6729" style="stop-color:#4abbe6;stop-opacity:1" offset="0.2559669"/><stop id="stop3713" style="stop-color:#008ccf;stop-opacity:1" offset="0.54674143"/><stop id="stop6731" style="stop-color:#008ccf;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient6661"><stop id="stop6663" style="stop-color:#c5eff8;stop-opacity:1" offset="0"/><stop id="stop6665" style="stop-color:#6dd2f1;stop-opacity:1" offset="0.17655624"/><stop id="stop6667" style="stop-color:#4abbe6;stop-opacity:1" offset="0.33419999"/><stop id="stop6721" style="stop-color:#0d79ba;stop-opacity:1" offset="0.66710001"/><stop id="stop6669" style="stop-color:#008efb;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient6611"><stop id="stop6613" style="stop-color:#c5eff8;stop-opacity:1" offset="0"/><stop id="stop6615" style="stop-color:#6dd2f1;stop-opacity:1" offset="0.21595745"/><stop id="stop6617" style="stop-color:#4abbe6;stop-opacity:1" offset="0.38936168"/><stop id="stop6619" style="stop-color:#006fa6;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient6583"><stop id="stop6585" style="stop-color:#ccf7ff;stop-opacity:1" offset="0"/><stop id="stop6591" style="stop-color:#e5fbff;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient6571"><stop id="stop6573" style="stop-color:#c5eff8;stop-opacity:1" offset="0"/><stop id="stop6581" style="stop-color:#6dd2f1;stop-opacity:1" offset="0.3351064"/><stop id="stop6575" style="stop-color:#4abbe6;stop-opacity:1" offset="0.5"/><stop id="stop6577" style="stop-color:#18252c;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient6557"><stop id="stop6559" style="stop-color:#91e9fd;stop-opacity:1" offset="0"/><stop id="stop6569" style="stop-color:#4abbe6;stop-opacity:1" offset="0.5"/><stop id="stop6565" style="stop-color:#038dd0;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient6004"><stop id="stop6006" style="stop-color:#ffffff;stop-opacity:0.9285714" offset="0"/><stop id="stop6008" style="stop-color:#ffffff;stop-opacity:0" offset="1"/></linearGradient><linearGradient id="linearGradient5932"><stop id="stop5934" style="stop-color:#d2e0e7;stop-opacity:1" offset="0"/><stop id="stop5936" style="stop-color:#028acb;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient5399"><stop id="stop5401" style="stop-color:#ffffff;stop-opacity:1" offset="0"/><stop id="stop5403" style="stop-color:#028acb;stop-opacity:1" offset="1"/></linearGradient><linearGradient id="linearGradient3911"><stop id="stop3913" style="stop-color:#91e9fd;stop-opacity:0" offset="0"/><stop id="stop3915" style="stop-color:#097ab0;stop-opacity:1" offset="1"/></linearGradient><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient5405" NS2:href="#linearGradient3911" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-477.71618,-458.61212)" spreadMethod="pad"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient5405-3" NS2:href="#linearGradient3911-1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(2.5130797,2.224476e-7,-1.7703186e-7,1.9999997,-351.79095,-458.61211)" spreadMethod="pad"/><linearGradient id="linearGradient3911-1"><stop id="stop3913-4" style="stop-color:#e0fffe;stop-opacity:0.96062994" offset="0"/><stop id="stop5942-1" style="stop-color:#b3f0fb;stop-opacity:0.92125982" offset="0.15113398"/><stop id="stop5940-4" style="stop-color:#86e2f9;stop-opacity:1" offset="0.25928274"/><stop id="stop3915-4" style="stop-color:#028acb;stop-opacity:1" offset="1"/></linearGradient><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient5965" NS2:href="#linearGradient3911-1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(2.5130797,2.224476e-7,-1.7703186e-7,1.9999997,-210.53451,-329.62366)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6010" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.5,0)"/><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter6357"><feGaussianBlur result="blur" stdDeviation="2.000000" in="SourceAlpha" id="feGaussianBlur6359"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.300000 0 " type="matrix" result="bluralpha" id="feColorMatrix6361"/><feOffset result="offsetBlur" dy="3.000000" dx="3.000000" in="bluralpha" id="feOffset6363"/><feMerge id="feMerge6365"><feMergeNode in="offsetBlur" id="feMergeNode6367"/><feMergeNode in="SourceGraphic" id="feMergeNode6369"/></feMerge></filter><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6512" NS2:href="#linearGradient3911" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-477.71618,-458.61212)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6514" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.5,0)"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6526" NS2:href="#linearGradient3911" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-477.71618,-458.61212)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6528" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.5,0)"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6537" NS2:href="#linearGradient3911" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-477.71618,-458.61212)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6539" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.5,0)"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6546" NS2:href="#linearGradient3911" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-477.71618,-458.61212)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6548" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.5,0)"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6551" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-99.166305,-95.609955)"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6554" NS2:href="#linearGradient6557" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-576.38248,-554.22208)" spreadMethod="pad"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6567" NS2:href="#linearGradient6571" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-576.38248,-554.22208)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="133.31017" y1="331.01505" x2="133.31017" y2="275.4458" id="linearGradient6589" NS2:href="#linearGradient6583" gradientUnits="userSpaceOnUse"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6609" NS2:href="#linearGradient6611" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-576.38248,-554.22208)" spreadMethod="pad"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6633" NS2:href="#linearGradient6611" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-576.38248,-554.22208)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6635" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-99.166305,-95.609955)"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="133.31017" y1="331.01505" x2="133.31017" y2="275.4458" id="linearGradient6637" NS2:href="#linearGradient6583" gradientUnits="userSpaceOnUse"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="133.31017" y1="331.01505" x2="133.31017" y2="275.4458" id="linearGradient6644" NS2:href="#linearGradient6583" gradientUnits="userSpaceOnUse" gradientTransform="translate(-60.125,670.5)"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6650" NS2:href="#linearGradient6611" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-576.38248,-554.22208)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6652" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-99.166305,-95.609955)"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6655" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-159.2913,574.89004)"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6658" NS2:href="#linearGradient6661" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-636.50748,116.27792)" spreadMethod="pad"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6683" NS2:href="#linearGradient6661" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-636.50748,116.27792)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6685" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-159.2913,574.89004)"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="133.31017" y1="331.01505" x2="133.31017" y2="275.4458" id="linearGradient6687" NS2:href="#linearGradient6583" gradientUnits="userSpaceOnUse" gradientTransform="translate(-60.125,670.5)"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="232.5" cy="458.61218" r="58.75" fx="232.5" fy="458.61218" id="radialGradient6696" NS2:href="#linearGradient6661" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.0546935,2.4286098e-7,-1.5900841e-7,1.9999997,-636.50748,116.27792)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="423.77374" id="linearGradient6698" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-159.2913,574.89004)"/><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter3102"><feGaussianBlur result="blur" stdDeviation="2.000000" in="SourceAlpha" id="feGaussianBlur3104"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.450000 0 " type="matrix" result="bluralpha" id="feColorMatrix3106"/><feOffset result="offsetBlur" dy="4.000000" dx="4.000000" in="bluralpha" id="feOffset3108"/><feMerge id="feMerge3110"><feMergeNode in="offsetBlur" id="feMergeNode3112"/><feMergeNode in="SourceGraphic" id="feMergeNode3114"/></feMerge></filter><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter2913"><feGaussianBlur result="blur" stdDeviation="2.000000" in="SourceAlpha" id="feGaussianBlur2915"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.325000 0 " type="matrix" result="bluralpha" id="feColorMatrix2917"/><feOffset result="offsetBlur" dy="4.000000" dx="4.000000" in="bluralpha" id="feOffset2919"/><feMerge id="feMerge2921"><feMergeNode in="offsetBlur" id="feMergeNode2923"/><feMergeNode in="SourceGraphic" id="feMergeNode2925"/></feMerge></filter><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter3989"><feGaussianBlur result="blur" stdDeviation="2.500000" in="SourceAlpha" id="feGaussianBlur3991"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.484000 0 " type="matrix" result="bluralpha" id="feColorMatrix3993"/><feOffset result="offsetBlur" dy="0.000000" dx="0.000000" in="bluralpha" id="feOffset3995"/><feMerge id="feMerge3997"><feMergeNode in="offsetBlur" id="feMergeNode3999"/><feMergeNode in="SourceGraphic" id="feMergeNode4001"/></feMerge></filter><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter4017"><feGaussianBlur result="blur" stdDeviation="2.500000" in="SourceAlpha" id="feGaussianBlur4019"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.370000 0 " type="matrix" result="bluralpha" id="feColorMatrix4021"/><feOffset result="offsetBlur" dy="4.000000" dx="4.000000" in="bluralpha" id="feOffset4023"/><feMerge id="feMerge4025"><feMergeNode in="offsetBlur" id="feMergeNode4027"/><feMergeNode in="SourceGraphic" id="feMergeNode4029"/></feMerge></filter><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter4073"><feGaussianBlur result="blur" stdDeviation="2.500000" in="SourceAlpha" id="feGaussianBlur4075"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.370000 0 " type="matrix" result="bluralpha" id="feColorMatrix4077"/><feOffset result="offsetBlur" dy="6.000000" dx="3.000000" in="bluralpha" id="feOffset4079"/><feMerge id="feMerge4081"><feMergeNode in="offsetBlur" id="feMergeNode4083"/><feMergeNode in="SourceGraphic" id="feMergeNode4085"/></feMerge></filter><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter4157"><feGaussianBlur result="blur" stdDeviation="3.000000" in="SourceAlpha" id="feGaussianBlur4159"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.500000 0 " type="matrix" result="bluralpha" id="feColorMatrix4161"/><feOffset result="offsetBlur" dy="1.000000" dx="0.000000" in="bluralpha" id="feOffset4163"/><feMerge id="feMerge4165"><feMergeNode in="offsetBlur" id="feMergeNode4167"/><feMergeNode in="SourceGraphic" id="feMergeNode4169"/></feMerge></filter><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="233" y1="341.11218" x2="233" y2="421.28052" id="linearGradient2999" NS2:href="#linearGradient6004" gradientUnits="userSpaceOnUse" gradientTransform="translate(-144.56338,577.13268)"/><radialGradient xmlns:NS2="http://www.w3.org/1999/xlink" cx="252.96033" cy="458.61218" r="58.75" fx="252.96033" fy="458.61218" id="radialGradient3002" NS2:href="#linearGradient6723" gradientUnits="userSpaceOnUse" gradientTransform="matrix(5.2452199,-2.0117937e-7,7.6709552e-8,1.9999997,-1175.896,118.52067)" spreadMethod="pad"/><linearGradient xmlns:NS2="http://www.w3.org/1999/xlink" x1="-194.71872" y1="-8.5078068" x2="-194.71872" y2="-110.5078" id="linearGradient3799" NS2:href="#linearGradient3801" gradientUnits="userSpaceOnUse" gradientTransform="translate(354.89948,1030.6048)"/><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter3827"><feGaussianBlur result="blur" stdDeviation="2.500000" in="SourceAlpha" id="feGaussianBlur3829"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.370000 0 " type="matrix" result="bluralpha" id="feColorMatrix3831"/><feOffset result="offsetBlur" dy="6.000000" dx="3.000000" in="bluralpha" id="feOffset3833"/><feMerge id="feMerge3835"><feMergeNode in="offsetBlur" id="feMergeNode3837"/><feMergeNode in="SourceGraphic" id="feMergeNode3839"/></feMerge></filter><filter x="-0.25" y="-0.25" width="1.5" height="1.5" color-interpolation-filters="sRGB" id="filter3869"><feGaussianBlur result="blur" stdDeviation="3.000000" in="SourceAlpha" id="feGaussianBlur3871"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.500000 0 " type="matrix" result="bluralpha" id="feColorMatrix3873"/><feOffset result="offsetBlur" dy="1.000000" dx="0.000000" in="bluralpha" id="feOffset3875"/><feMerge id="feMerge3877"><feMergeNode in="offsetBlur" id="feMergeNode3879"/><feMergeNode in="SourceGraphic" id="feMergeNode3881"/></feMerge></filter></defs>
                <rect width="250" height="125" rx="16.4" x="25.936615" y="914.49481" id="rect6518" style="fill:#3cc1fa;fill-opacity:1;stroke:none;filter:url(#filter3827)"/><rect width="242.5" height="117.5" rx="12.5" x="29.686615" y="918.24481" id="rect6520" style="fill:url(#radialGradient3002);fill-opacity:1;fill-rule:nonzero;stroke:none"/><path d="m 42.186616,918.24486 c -6.925,0 -12.5,5.575 -12.5,12.49998 l 0,18.06248 0.6875,2.4375 c 0,0 165.848374,53.79428 241.609804,24.49995 0.13978,-0.054 -0.13855,-0.10209 0,-0.15625 l 0,-44.84368 c 0,-6.92498 -5.37199,-12.49998 -12.297,-12.49998 l -217.500304,0 z" id="path6522" style="fill:url(#linearGradient2999);fill-opacity:1;stroke:none"/><text x="38.899506" y="998.6048" id="text3017" style="font-size:40px;font-style:normal;font-weight:normal;fill:url(#linearGradient3799);fill-opacity:1;stroke:none;filter:url(#filter3869);font-family:Bitstream Vera Sans"><tspan x="38.899506" y="998.6048" id="tspan3019" style="font-size:56px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;fill:url(#linearGradient3799);fill-opacity:1;font-family:AR PL UKai TW;-inkscape-font-specification:AR PL UKai TW"/></text>
                </g>
                HEREDOC*/
            });
        }
    } // displayGraph
    displayPachinko();
}

