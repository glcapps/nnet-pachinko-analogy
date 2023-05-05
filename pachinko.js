window.runPachinko = runPachinko;
function runPachinko() {
    window.snappachinko = {};
    window.snappachinko.s = Snap('#pachinkosvg');
    let myPaper = window.snappachinko.s;

    function displayPachinko() {
        let bucketPath = "M4424.5,5004.6c-1455-78.5-2647.8-363.8-3407.8-813.7C444.3,3852.1,138,3438.5,103.5,2958c-28.7-388.6,118.7-729.4,455.7-1056.8l151.2-147.4V-501.5c0-1981.5,3.8-2272.5,30.6-2402.7c197.2-959.2,1468.4-1642.6,3434.6-1845.6c314-32.6,1332.5-32.6,1646.5,0c1139.1,118.7,2031.3,388.6,2651.6,804.1c325.5,218.3,559.1,472.9,687.3,750.5c130.2,285.3,126.4,189.6,126.4,2693.7v2255.3l151.3,147.4c384.8,373.3,528.4,781.1,432.7,1231C9656.9,4145,8071.7,4853.4,5688.1,4998.9C5402.9,5016.1,4692.6,5019.9,4424.5,5004.6z M6051.9,3744.9c970.7-95.7,1834.1-323.5,2345.3-620.3c124.4-72.8,277.6-204.9,277.6-239.3c0-70.8-271.8-269.9-530.3-386.7c-1435.9-654.8-4164-727.5-5892.8-158.9c-321.6,107.2-706.5,298.7-834.7,415.4c-99.5,91.9-101.5,95.7-74.7,145.5c40.2,78.5,233.6,214.4,449.9,317.8c593.5,287.2,1485.7,484.4,2488.9,555.2C4635.1,3796.6,5697.7,3781.2,6051.9,3744.9z";
        function processPeg(weight, bias, activation, x, y) {
            let pegwidth = 36;
            let pegheight = 36;
            let vspace = 20;
            let hspace = 20;
            let rounded = 5;
            myPaper['x' + x + 'y' + y] = myPaper.group();
            let myGroup = myPaper['x' + x + 'y' + y];
            let r = myPaper.rect(0, 0, pegwidth, pegheight, rounded, rounded);
            r.attr({ fill: '#bada55aa', stroke: '#000', strokeWidth: 3 });
            r.appendTo(myGroup);
            let textLabel = myPaper.text(1, 22, 'x' + x + 'y' + y);
            // Text path usage
            //let pth = myPaper.path("M10,10L100,100");
            //textLabel.attr({textpath: pth});
            textLabel.appendTo(myGroup);
            //fixme (y-x) ?huh?
            myGroup.animate({ transform: 'translate(' + ((pegwidth + hspace) * x + pegwidth) + ',' + ((pegheight + vspace) * (y) + pegheight) + ')' }, 700, mina.bounce);
            r.animate({ transform: 'r(' + (bias * 90) + ')' }, 700, mina.bounce);
        }
        myPaper.clear();
        function makeQuickNumberedArray(Count) {
            return Array.apply(null, { length: Count }).map(Number.call, Number);
        }
        makeQuickNumberedArray(10).forEach(x => {
            makeQuickNumberedArray(10).forEach(y => {
                processPeg(Math.random(), Math.random(), 'diamond', x, y);
            });
        });

        makeQuickNumberedArray(10).forEach(bucketNumber => {
            let bucketGroup = myPaper.group();
            let bucket = myPaper.path(bucketPath);
            bucket.attr({ fill: '#444444' });
            bucketGroup.append(bucket);
            bucketGroup.transform('scale(0.00600,-0.009100) translate('+(800+(bucketNumber*13000))+',-70000)');
        });
    } // displayGraph
    displayPachinko();
}

