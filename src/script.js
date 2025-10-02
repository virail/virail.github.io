let style = window.getComputedStyle(document.body);
let mainColour = style.getPropertyValue('--main-colour');
let subColour = style.getPropertyValue('--sub-colour');

window.onload = function() {
    const fadeInElement = document.querySelectorAll('.fade-in');
    console.log(fadeInElement);
    for (const element of fadeInElement) {
        element.classList.add('show');
    }
    svgGraph(subColour, "sub");
    svgGraph(mainColour, "main");
};

function generateRandomPoints(amount, width, height, minHeight) {
    const array = Array.from({ length: amount }, (_, i) => [ (width / amount) * i, Number(((Math.random() * (height - minHeight)) + minHeight - (minHeight / 2)).toFixed(2))]);
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

function svgGraph(colour, tag) {
    const svg = document.getElementById('svg-graph');
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    console.log(`WIDTH: ${width}, height: ${height}`);


    const existingCircles = svg.querySelectorAll(`.${tag}-svg-circle`);
    console.log("existingCircles",existingCircles);
    existingCircles.forEach(circle => circle.remove());

    const existingLine = svg.querySelectorAll(`.${tag}-line`);
    existingLine.forEach((line) => line.remove());

    // const svgArea = document.getElementById('svg-area');
    // const svgPath = document.getElementById('svg-path');
    const points = generateRandomPoints(8, width, height, 50);
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

    // Fill
    // let path = `M 0 ${height}`;
    // for (const [x, y] of finalPoints) {
    //     path += `L ${x} ${y} `;
    // }
    //
    // path += `L ${width} ${height} Z`;
    //
    // svgArea.setAttribute("fill", `oklch(0.5117 0.2723 268.73 / 15%)`);
    // svgArea.setAttribute("d", path);

    let pathLine = `M ${finalPoints[0][0]} ${finalPoints[0][1]}`;
    for (let i = 0; i < finalPoints.length; i++) {
        const [x, y] = finalPoints[i];
        pathLine += ` L ${x} ${y}`;
    }

    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svgPath.setAttribute("stroke", colour);
    svgPath.setAttribute("stroke-width", 2);
    svgPath.setAttribute("fill", "none");
    svgPath.setAttribute("class", `${tag}-line`);
    svgPath.setAttribute("d", pathLine);

    svg.appendChild(svgPath);

    points.forEach(([x, y], i) => {
        if (true) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 5);
            circle.setAttribute("fill", colour);
            circle.setAttribute("class", `${tag}-svg-circle`);
            svg.appendChild(circle);
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            if (i % 3 === 0 && tag === "main") {
            text.innerHTML = `x: ${x}, y: ${y}`;
            text.setAttribute("x", x - 20);
            text.setAttribute("y", y - 20);
            text.setAttribute("style", "font: italic 32px sans-serif;");
            // svg.appendChild(text);
            }
        }
    });
    const padding = 10;
    const yPadding = 5;
    const minX = Math.min(...finalPoints.map(p => p[0]));
    const maxX = Math.max(...finalPoints.map(p => p[0]));
    const minY = Math.min(...finalPoints.map(p => p[0]));
    const maxY = Math.max(...finalPoints.map(p => p[0]));

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    svg.setAttribute('viewBox', 
        `${-padding} -20 ${width + padding * 2} ${height + padding * 2}`
    );
    // svg.setAttribute('viewBox', 
    //     `${minX - padding} ${minY - yPadding} ${contentWidth + padding * 2} ${contentHeight + yPadding * 2}`
    // );

    drawGridLines();

}

function drawGridLines() {
    const svg = document.getElementById('svg-graph');
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const existingLines = svg.querySelectorAll('.svg-grid-line');
    console.log("existsingLines", existingLines);
    existingLines.forEach(line => line.remove());
    const noLines = height / 4;
    for (let i = 0; i < noLines; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("x2", width);
        line.setAttribute("y1", (height / 4) * i);
        line.setAttribute("y2", (height / 4) * i);
        line.setAttribute("stroke-width", 1);
        line.setAttribute("stroke", mainColour);
        line.setAttribute("class", "svg-grid-line");
        svg.appendChild(line);
    }
}

addEventListener("resize", () => {svgGraph(subColour, "sub"); svgGraph(mainColour, "main") });
