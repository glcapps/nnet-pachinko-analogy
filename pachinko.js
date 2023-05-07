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

    function displayPachinko() {
        const toppad = 75;
        const leftpad = 20;
        const bucketPath = "M4424.5,5004.6c-1455-78.5-2647.8-363.8-3407.8-813.7C444.3,3852.1,138,3438.5,103.5,2958c-28.7-388.6,118.7-729.4,455.7-1056.8l151.2-147.4V-501.5c0-1981.5,3.8-2272.5,30.6-2402.7c197.2-959.2,1468.4-1642.6,3434.6-1845.6c314-32.6,1332.5-32.6,1646.5,0c1139.1,118.7,2031.3,388.6,2651.6,804.1c325.5,218.3,559.1,472.9,687.3,750.5c130.2,285.3,126.4,189.6,126.4,2693.7v2255.3l151.3,147.4c384.8,373.3,528.4,781.1,432.7,1231C9656.9,4145,8071.7,4853.4,5688.1,4998.9C5402.9,5016.1,4692.6,5019.9,4424.5,5004.6z M6051.9,3744.9c970.7-95.7,1834.1-323.5,2345.3-620.3c124.4-72.8,277.6-204.9,277.6-239.3c0-70.8-271.8-269.9-530.3-386.7c-1435.9-654.8-4164-727.5-5892.8-158.9c-321.6,107.2-706.5,298.7-834.7,415.4c-99.5,91.9-101.5,95.7-74.7,145.5c40.2,78.5,233.6,214.4,449.9,317.8c593.5,287.2,1485.7,484.4,2488.9,555.2C4635.1,3796.6,5697.7,3781.2,6051.9,3744.9z";
        const raphaelBucketPath = "M21.589,6.787c-0.25-0.152-0.504-0.301-0.76-0.445c-3.832-2.154-8.234-3.309-9.469-1.319c-1.225,2.103,2.314,5.798,6.293,8.222c0.082,0.051,0.167,0.098,0.25,0.146c5.463-0.402,9.887,0.204,9.989,1.402c0.009,0.105-0.026,0.211-0.083,0.318c0.018-0.025,0.041-0.045,0.057-0.07C29.146,12.943,25.585,9.222,21.589,6.787zM10.337,7.166l-0.722,1.52c-4.339,2.747-6.542,6.193-5.484,8.625c0.19,0.438,0.482,0.812,0.846,1.137l0.456-0.959c-0.156-0.178-0.292-0.365-0.384-0.577c-0.732-1.682,0.766-4.188,3.707-6.417l-3.323,6.994c1.492,1.689,5.748,1.748,10.276,0.154c-0.037-0.354,0.032-0.722,0.232-1.049c0.485-0.796,1.523-1.048,2.319-0.563c0.795,0.486,1.048,1.522,0.562,2.319c-0.484,0.795-1.523,1.047-2.319,0.562c-0.154-0.094-0.281-0.213-0.394-0.344c-4.354,1.559-8.372,1.643-10.553,0.314c-0.214-0.131-0.403-0.279-0.58-0.436l-0.124,0.26c-1.088,1.785,1.883,4.916,5.23,6.957c3.347,2.039,7.493,3.246,8.552,1.502l7.77-10.204c-2.48,0.384-6.154-0.963-9.272-2.864C14.014,12.197,11.131,9.546,10.337,7.166z";
        const raphaelFlagPath = "M9.5,3v10c8,0,8,4,16,4V7C17.5,7,17.5,3,9.5,3z M6.5,29h2V3h-2V29z";
        const bowlingPinPath = "M 12.78 121.69 c -21.75 -33.15 -10.9 -55.3 -2.77 -71.89 c 0.69 -1.4 1.35 -2.76 2.22 -4.62 c 0.13 -0.29 0.28 -2.11 0.38 -4.77 c 0.1 -2.65 0.13 -5.97 0.01 -9.35 c -0.07 -2.2 -0.56 -4.64 -1.05 -7.1 C 10.12 16.69 8.65 9.32 15.93 3 C 16.45 2.56 17 2.15 17.59 1.8 c 2.83 -1.72 6.14 -2.14 9.25 -1.53 c 3.07 0.6 5.98 2.23 8.05 4.62 c 0.47 0.54 0.9 1.13 1.29 1.77 c 0.79 1.3 1.37 2.77 1.68 4.39 c 0.29 1.5 0.35 3.13 0.14 4.87 c -0.18 1.52 -0.45 3.29 -0.75 5.24 c -1.23 8.11 -2.96 19.52 -0.44 24.82 c 0.65 1.36 1.25 2.55 1.88 3.8 c 7.33 14.54 18.63 36.97 -2.69 72.03 c -0.41 0.68 -1.14 1.05 -1.88 1.05 v 0.01 h -19.4 C 13.89 122.88 13.15 122.4 12.78 121.69 L 12.78 121.69 Z M 17 40.56 h 14.23 c -0.14 -2.19 -0.09 -4.54 0.07 -6.93 H 17.08 C 17.11 36.15 17.08 38.54 17 40.56 L 17 40.56 Z M 32.55 47.19 H 16.15 c -0.53 1.14 -1.35 2.81 -2.2 4.54 c -7.59 15.49 -17.69 36.12 1.98 66.74 H 32.9 c 19.18 -32.36 8.7 -53.17 1.88 -66.7 c -0.73 -1.45 -1.42 -2.82 -1.93 -3.89 C 32.74 47.66 32.64 47.43 32.55 47.19 L 32.55 47.19 Z M 16.84 28.62 h 14.94 c 0.34 -2.85 0.76 -5.62 1.13 -8.11 c 0.29 -1.94 0.56 -3.7 0.73 -5.11 c 0.15 -1.29 0.11 -2.47 -0.09 -3.53 c -0.21 -1.11 -0.6 -2.09 -1.12 -2.95 c -0.24 -0.4 -0.53 -0.8 -0.86 -1.17 C 30.15 6.12 28.14 5.01 26 4.59 c -2.1 -0.41 -4.3 -0.15 -6.13 0.96 c -0.36 0.22 -0.71 0.47 -1.06 0.78 c -5.34 4.63 -4.12 10.74 -2.91 16.78 C 16.26 24.95 16.62 26.77 16.84 28.62 L 16.84 28.62 Z";

        const pegwidth = 36;
        const pegheight = 36;
        const vspace = 20;
        const hspace = 20;

        function processPeg(weight, bias, activation, x, y) {
            let myDesignation = 'x' + x + 'y' + y;
            let angle = Math.floor(((bias * 0.5) + 0.25) * 90);
            const rounded = 5;
            let myleftpad = leftpad + y % 2 * 20;
            myPaper[myDesignation] = myPaper.group();
            let myGroup = myPaper[myDesignation];
            let peg = myPaper.rect(0, 0, pegwidth, pegheight, rounded, rounded);
            peg.attr({ fill: colorMint + colorSuffixAplhaMed, stroke: colorBlack, strokeWidth: 3 });
            peg.appendTo(myGroup);
            let textLabel = myPaper.text(10, 25, (angle - 45) + '°');
            textLabel.attr({});
            textLabel.transform('scale(' + 0.9 + ',' + 0.9 + ')');
            textLabel.appendTo(myGroup);
            //fixme (y-x) ?huh?
            myGroup.animate({ transform: 'translate(' + ((pegwidth + hspace) * x + myleftpad) + ',' + ((pegheight + vspace) * (y) + pegheight + toppad) + ')' }, 700, mina.bounce);
            peg.animate({ transform: 'r(' + (angle + '') + ')' }, 700, mina.bounce);
        }
        myPaper.clear();
        function makeQuickNumberedArray(Count) {
            return Array.apply(null, { length: Count }).map(Number.call, Number);
        }
        makeQuickNumberedArray(10).forEach(x => {
            makeQuickNumberedArray(10).forEach(y => {
                processPeg(Math.random(), (Math.random()), 'diamond', y, x);
            });
        });
        //Bowling Pins
        let pinsGroups = myPaper.group();
        let pinAnimations = [];
        makeQuickNumberedArray(10).forEach(bowlingPinNumber => {
            const pinScale = 0.7;
            let pinGroup = myPaper.group();
            let pin = myPaper.path(bowlingPinPath);
            pin.attr({ fill: colorOffWhite, stroke: colorDimWhite, strokeWidth: 1 });
            function moveBowlingPinsToMachine() {
                pinGroup.transform('scale(' + pinScale + ',' + pinScale + ') translate(' + (15 + leftpad + (bowlingPinNumber * (pegwidth + hspace) / pinScale)) + ',' + (pegwidth / 2) + ')');
            }
            function animateBowlingPinsToMachine() {
                pinGroup.animate({ transform: 'scale(' + pinScale + ',' + pinScale + ') translate(' + (15 + leftpad + (bowlingPinNumber * (pegwidth + hspace) / pinScale)) + ',' + (pegwidth / 2) + ')' });
            }
            let myAnimateBowlingPinsToMachine = {};

            pinAnimations.push([pinGroup, 'scale(' + pinScale + ',' + pinScale + ') translate(' + (15 + leftpad + (bowlingPinNumber * (pegwidth + hspace) / pinScale)) + ',' + (pegwidth / 2) + ')']);
            function moveBowlingPinsToFormation() {
                const leftmargin = 850;
                const topmargin = 50;
                const rowWidth = 40;
                const rowHeight = 65;
                let pinPositions = [[], [leftmargin + rowWidth * 3, topmargin + rowHeight * 3], [leftmargin + rowWidth * 2, topmargin + rowHeight * 2], [leftmargin + rowWidth * 4, topmargin + rowHeight * 2], [leftmargin + rowWidth, topmargin + rowHeight], [leftmargin + rowWidth * 3, topmargin + rowHeight], [leftmargin + rowWidth * 5, topmargin + rowHeight], [leftmargin, topmargin], [leftmargin + rowWidth * 2, topmargin], [leftmargin + rowWidth * 4, topmargin], [leftmargin + rowWidth * 6, topmargin]];
                pinGroup.transform('scale(' + pinScale + ',' + pinScale + ') translate(' + pinPositions[pinMap[bowlingPinNumber]][0] + ',' + pinPositions[pinMap[bowlingPinNumber]][1] + ')');
            }
            // myPaper.pinsgroup.add(pin);
            //pin.click();
            moveBowlingPinsToFormation();
            //moveBowlingPinsToMachine();
            pinGroup.append(pin);
            let labelText = pinMap[bowlingPinNumber];
            let textLabel = myPaper.text(9, 22, '' + labelText);
            textLabel.attr({ stroke: colorWhite });
            textLabel.transform('scale(' + 2 + ',' + 2 + ') translate(-' + (labelText - 10 ? 1 : 5) + ',' + 24 + ')');
            textLabel.appendTo(pinGroup);
            pinsGroups.add(pinGroup);
        });
        pinsGroups.click(function () {
            pinAnimations.forEach(pinGroupTuple => {
                //pinGroupTuple[0].animate({transform:(pinGroupTuple[1])});
                pinGroupTuple[0].transform(pinGroupTuple[1]);
            });
        });
        //Buckets / Pipes
        makeQuickNumberedArray(10).forEach(bucketNumber => {
            const bucketScaleHorizontal = 163;
            const bucketScaleVertical = 110;
            let bucketGroup = myPaper.group();
            let bucket = myPaper.path(bucketPath);
            bucket.attr({ fill: colorMarioGreen });
            bucketGroup.append(bucket);
            let labelText = pinMap[bucketNumber];
            let textLabel = myPaper.text(9, 22, '' + labelText);
            textLabel.attr({ stroke: colorWhite });
            textLabel.transform('scale(' + bucketScaleHorizontal + ',-' + bucketScaleVertical + ') translate(' + (labelText - 10 ? 16 : 12) + ',-' + (bucketScaleVertical / 10) + ')');
            textLabel.appendTo(bucketGroup);
            bucketGroup.transform('scale(' + (1 / bucketScaleHorizontal) + ',-' + (1 / bucketScaleVertical) + ') translate(' + (900 + (bucketNumber * 10000)) + ',-' + ((120 * toppad) + ((70) * 1000)) + ')');
        });
    } // displayGraph
    displayPachinko();
}

