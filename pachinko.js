window.runPachinko = runPachinko;
function runPachinko() {
    window.snappachinko = {};
    window.snappachinko.s = Snap('#pachinkosvg');

    function displayPachinko() {
        function processPeg(weight, bias, activation, x, y) {
            //add my own visual
            let pegwidth = 34;
            let pegheight = 34;
            let vspace = 20;
            let hspace = 20;
            let rounded = 5;

            window.snappachinko.s['x' + x + 'y' + y] = window.snappachinko.s.group();
            let r = window.snappachinko.s.rect(0, 0, pegwidth, pegheight, rounded, rounded);
            r.attr({ fill: '#bada55aa', stroke: '#000', strokeWidth: 3 });
            r.appendTo(window.snappachinko.s['x' + x + 'y' + y]);
            let t1 = window.snappachinko.s.text(1, 22, 'x' + x + 'y' + y);
            // Text path usage
            //let pth = window.snappachinko.s.path("M10,10L100,100");
            //t1.attr({textpath: pth});
            t1.appendTo(window.snappachinko.s['x' + x + 'y' + y]);
            //fixme (y-x) ?huh?
            window.snappachinko.s['x' + x + 'y' + y].animate({ transform: 'translate(' + ((pegwidth + hspace) * x + pegwidth) + ',' + ((pegheight + vspace) * (y) + pegheight) + ')' }, 700, mina.bounce);
            r.animate({ transform: 'r(' + (bias * 90) + ')' }, 700, mina.bounce);
        }
        window.snappachinko.s.clear();
        function makeQuickNumberedArray(Count) {
            return Array.apply(null, { length: Count }).map(Number.call, Number);
        }
        makeQuickNumberedArray(10).forEach(x => {
            makeQuickNumberedArray(10).forEach(y => {
                processPeg(Math.random(), Math.random(), 'diamond', x, y);
            });
        });


    } // displayGraph
    displayPachinko();
}

