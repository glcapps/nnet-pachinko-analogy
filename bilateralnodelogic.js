function getCurrentPegWeights() { }
function randomizePegWeight() { }
function refinePegWeight(myPeg, myPastProductiveContribution, myPastDestructiveContribution) { }
function evaluatePegWeight(myPeg) { }
function getPegExitDistribution(myPeg, myPegEntranceDistribution) { }
function getPegEntranceDistribution(myPeg, pegWeights) { }
function getPegExitDistribution(myPeg, pegWeights) { }
function getBucketEntranceDistribution(myBucket, pegWeights) { }
function getCurrentRefinementStepSize(myIterationNumber) { }
function getGravityAdjustedDistribution(myNaturalDistribution) { }
function getBucketResults(myPegWeights, myInitialBallLocations) { }
function getIdealBucketResult(myBucket, scenarioInputList, myscenarioPin) { }
function getIterationHappiness(myPegWeights, scenarioInputList, scenarioNeededOutput) { }
function getScenarioNeededOutput(scenarioInputList) { }
function getWorstPerformingScenario(myPegWeights, scenarioInputList) { }
window.logictest = function (teststuff) {
    const pegtoppad = 75;
    const pegleftpad = 20;
    const pegwidth = 36;
    const pegheight = 36;
    const pegvspace = 20;
    const peghspace = 20;
    function getcoordinatesfrompegcoordinate(x, y) {
        let oddrowoffset = ((y + 1) % 2 * 20);
        x = (x * (pegwidth + peghspace)) + pegleftpad + 0.5 * pegwidth + oddrowoffset;
        y = (y * (pegheight + pegvspace)) - pegvspace + pegtoppad + 0.5 * pegheight;
        return [x, y, (x + "," + y)];
    }
    function getEndPeg(x0, y0, x1, y1, pegAngle) {
        let inboundAngle = -1;
        //FIXME to decide fate
        x0 = x0 * 2; x1 = x1 * 2;
        if (y1 - y0 < 0) {
            //came straight down between two pegs
            y0 = y0 + 1;
            x0 = x1;
            inboundAngle = 90;
        } else if (y0 === y1 && x0 < x1) {
            inboundAngle = 0;
        } else if (y0 < y1 && x0 < x1) {
            inboundAngle = 35;
            if (x0 + 1 < x1) inboundAngle = 65;
        } else if (y0 < y1 && x0 > x1) { 
            inboundAngle = 135;
        } else if (y0 === y1 && x0 > x1) {
            inboundAngle = 180;
        } else if (y0 > y1 && x0 > x1) {
            inboundAngle = 315;
        } else if (y0 < y1 && x0 > x1) {
            inboundAngle = 315;
        } else {
            x0 = x0 + y0 % 2;
            ;
        }
        let x = x1;
        let y = y1;
        //double everything to get half step equivalents to fix the offsets of the pegs

        return [x, y];
    }
    const startcoordinate = getcoordinatesfrompegcoordinate(3, 3).pop();//"212,70";
    const bouncepointcoordinate = getcoordinatesfrompegcoordinate(4, 4).pop();//"313,180";
    const endcoordinate = getcoordinatesfrompegcoordinate(3, 5).pop();//"213,280";
    let myPath = teststuff.myPaper.path("M" + startcoordinate
        + " L" + bouncepointcoordinate
        + " L" + endcoordinate
    ).attr({
        fill: "none", stroke: colorWhite + "00", strokeWidth: 0
    });
    let testball = teststuff.myPaper.circle(0, 0, 5).attr({ fill: "#FFFFFF", stroke: "#000000", strokeWidth: 3 });
    let testballgroup = teststuff.myPaper.group();
    testballgroup.append(testball);
    testballgroup.drawAtPath(myPath, 700, {
        rotate: false, easing: mina.linear, reverse: false, drawpath: false, callback: function () {
            Snap.animate(0, 1, function (value) {
                buckets[6].attr({ fill: value < 1 ? colorWhite : colorMarioGreen });
            }, 1500);
        }
    });
}