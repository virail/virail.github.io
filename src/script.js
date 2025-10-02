window.onload = function() {
    const fadeInElement = document.querySelectorAll('.fade-in');
    console.log(fadeInElement);
    for (const element of fadeInElement) {
        element.classList.add('show');
    }
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    console.log(`Width: ${width}, height: ${height}`);
    var style = window.getComputedStyle(document.body);
    console.log(style.getPropertyValue('--main-colour'));

    ctx.fillStyle = style.getPropertyValue('--main-colour');
    const points = generateRandomPoints(8, width, height);
    points.sort((a, b) => a[0] - b[0]);
    console.log(points);
    // We have sorted points along x
    // Now we need to perform quadratic bezier curves on this
    // so we grab tuples of 3 points, start, control, end
    let finalPoints = [];
    // for (let i = 0; i < points.length - 2; i++) {
    //     const start = points[i];
    //     const control = points[i + 1];
    //     const end = points[i + 2];
    //
    //     for (let t = 0; t < 1.0; t += 0.1) {
    //         const bezier = getPointOnQuadraticBezierCurveOptimised(start, control, end, t);
    //         finalPoints.push(bezier);
    //     }
    // }
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];

        for (let t = 0; t < 1.0; t += 0.1) {
            finalPoints.push(getCatmullRomPoint(p0, p1, p2, p3, t));
        }
    }
    finalPoints.sort((a, b) => a[0] - b[0])
    console.log("finalPoints",finalPoints);
    // and we draw these points
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const mainColour = style.getPropertyValue('--main-colour');
    const subColour = style.getPropertyValue('--sub-colour');
    ctx.strokeStyle = mainColour;
    ctx.beginPath();
    ctx.moveTo(finalPoints[0][0], 200);
    let maxY = 0;
    for (const [x, y] of finalPoints) {
        maxY = Math.max(maxY, y);
        // ctx.strokeStyle=`oklch(${x} 0.5 120)`;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(finalPoints[finalPoints.length - 1][0], 200);
    ctx.closePath();
    ctx.fillStyle=`oklch(0.5117 0.2723 268.73 / 15%)`;
    ctx.fill();

    ctx.beginPath();
    for (const [x, y] of finalPoints) {
        ctx.lineTo(x,y);
    }
    ctx.stroke();
    console.log(`Maxy: ${maxY}`);

    const blockWidth = 8;
    const blockHeight = 8;
    // const { blocks, gradients } = generateAreaPoints(finalPoints, blockWidth, blockHeight);
    // console.log("blocks", blocks);
    // console.log("gradients", gradients);
    // ctx.filter=`blur(${blockWidth > blockHeight ? blockWidth : blockHeight}px)`;
    // ctx.filter=`blur(5px)`;
    // for (let i = 0; i < blocks.length; i++) {
    //     ctx.fillStyle=gradients[i];
    //     ctx.fillRect(blocks[i][0], blocks[i][1], blockWidth, blockHeight);
    // }

    // ctx.fillRect(0, 0, 10, 10);

    // ctx.fill
    svgGraph();
};

function generateRandomPoints(amount, width, height) {
    const array = Array.from({ length: amount }, (_, i) => [ (width / amount) * i, Number(((Math.random() * (height - 0)) + 0).toFixed(2))]);
    array.push([width, Number(((Math.random() * (height - 0)) + 0).toFixed(2))])
    return array;
}

function generateAreaPoints(points, blockWidth, blockHeight) {
    const noXBlocks = (points[points.length - 1][0] - points[0][0]) / blockWidth;
    console.log(`number of blocks x wise: ${noXBlocks}`);

    const blocks = [];
    const gradients = [];

    // loop for each x block
    for (let i = 0; i < noXBlocks; i++) {
        // For each x coordinate which is given by
        // i * blockWidth
        // we need to iterate over the maxY value
        // to 0
        // decreasing the gradient and placing in the appropriate place
        // the x coordinate may be inbetween two points
        // so we need to get the y coordinate for that x coordinate.
        let xCoord = i * blockWidth;
        console.log(`xCoord ${xCoord}`);
        // will need to search for the two points that the x is between
        for (let j = 1; j < points.length; j++) {
            // Means we are between points[j] and points[j + 1]
            if (xCoord < points[j][0]) {
                const A = points[j - 1];
                const B = points[j];
                const scaledX = xCoord - A[0];
                const dirX = B[0] - A[0];
                const dirY = B[1] - A[1];
                const xPercentage = scaledX / dirX;

                let yVal = (dirY * xPercentage) + A[1];
                console.log(`yVal: ${yVal}`)

                let maxY = yVal;
                while (yVal < 200) {
                    blocks.push([xCoord, yVal]);
                    // gradients.push(`oklch(${(yVal / 100)} 0.2723 268.73 / ${100 - (yVal / 1.5)}%)`);
                    gradients.push(`oklch( 0.5117 0.2723 268.73 / 30%)`);
                    yVal += blockHeight;
                }
                console.log([xCoord, yVal]);
                break;

            }
        }
    }
    console.log("blocks",blocks);
    return { blocks, gradients };
}

function getPointOnQuadraticBezierCurveOptimised(startPoint, controlPoint, endPoint, ratio) {
    const remainder = 1 - ratio;
    const startPointMultiplier = remainder * remainder;
    const controlPointMultiplier = remainder * ratio * 2;
    const endPointMultiplier = ratio * ratio;
    return [
        startPoint[0] * startPointMultiplier + controlPoint[0] * controlPointMultiplier + endPoint[0] * endPointMultiplier,
        startPoint[1] * startPointMultiplier + controlPoint[1] * controlPointMultiplier + endPoint[1] * endPointMultiplier
    ];
}

function getCatmullRomPoint(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;

    return [
        0.5 * ((2 * p1[0]) +
            (-p0[0] + p2[0]) * t +
            (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
            (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * ((2 * p1[1]) +
            (-p0[1] + p2[1]) * t +
            (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
            (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
    ]
}

function svgGraph() {
    const svg = document.getElementById('svg-graph');
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    console.log(`WIDTH: ${width}, height: ${height}`);

    const existingCircles = svg.querySelectorAll('circle');
    existingCircles.forEach(circle => circle.remove());

    var style = window.getComputedStyle(document.body);
    var mainColour = style.getPropertyValue('--main-colour');
    var subColour = style.getPropertyValue('--sub-colour');

    const svgArea = document.getElementById('svg-area');
    const svgPath = document.getElementById('svg-path');
    const points = generateRandomPoints(8, width, height);
    console.log("SVG POINTS", points);
    points.sort((a, b) => a[0] - b[0]);
    let finalPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];

        for (let t = 0; t < 1.0; t += 0.1) {
            finalPoints.push(getCatmullRomPoint(p0, p1, p2, p3, t));
        }
    }
    finalPoints.sort((a, b) => a[0] - b[0])
    console.log("SVG FINALPOINTS", finalPoints);
    let path = `M 0 ${height}`;
    for (const [x, y] of finalPoints) {
        path += `L ${x} ${y} `;
    }

    path += `L ${width} ${height} Z`;

    svgArea.setAttribute("fill", `oklch(0.5117 0.2723 268.73 / 15%)`);
    svgArea.setAttribute("d", path);

    let pathLine = `M ${finalPoints[0][0]} ${finalPoints[0][1]}`;
    for (let i = 0; i < finalPoints.length; i++) {
        const [x, y] = finalPoints[i];
        pathLine += ` L ${x} ${y}`;
    }

    svgPath.setAttribute("stroke", mainColour);
    svgPath.setAttribute("stroke-width", 2);
    svgPath.setAttribute("fill", "none");
    svgPath.setAttribute("d", pathLine);

    points.forEach(([x, y], i) => {
        if (i !== 0 && i !== points.length - 1) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 5);
            circle.setAttribute("fill", mainColour);
            circle.setAttribute("class", "svg-circle");
            svg.appendChild(circle);
        }
    })

}

addEventListener("resize", svgGraph);
