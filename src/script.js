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
    var style = window.getComputedStyle(document.body);
    console.log(style.getPropertyValue('--main-colour'));

    ctx.fillStyle = style.getPropertyValue('--main-colour');
    const points = generateRandomPoints(10, width, height);
    points.sort((a, b) => a[0] - b[0]);
    console.log(points);
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const mainColour = style.getPropertyValue('--main-colour');
    const subColour = style.getPropertyValue('--sub-colour');
    ctx.strokeStyle = mainColour;
    ctx.beginPath();
    let maxY = 0;
    for (const [x, y] of points) {
        maxY = Math.max(maxY, y);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    console.log(`Maxy: ${maxY}`);

    const blockWidth = 4;
    const blockHeight = 2;
    const areaPoints = generateAreaPoints(points, blockWidth, blockHeight);
    // ctx.filter=`blur(${blockWidth > blockHeight ? blockWidth : blockHeight}px)`;
    ctx.filter=`blur(5px)`;
    for (const [x, y] of areaPoints) {
        ctx.fillStyle=`oklch(${(y / maxY)} 0.2723 268.73)`;
        ctx.fillRect(x, y, blockWidth, blockHeight)
    }

    // ctx.fillRect(0, 0, 10, 10);

    // ctx.fill
};

function generateRandomPoints(amount, width, height) {
    return Array.from({ length: amount }, (_, i) => [ (width / amount) * i, Number(((Math.random() * (height - 0)) + 0).toFixed(2))]);
}

function generateAreaPoints(points, blockWidth, blockHeight) {
    const noXBlocks = (points[points.length - 1][0] - points[0][0]) / blockWidth;
    console.log(`number of blocks x wise: ${noXBlocks}`);

    const blocks = [];

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

                while (yVal < 200) {
                    blocks.push([xCoord, yVal]);
                    yVal += blockHeight;
                }
                console.log([xCoord, yVal]);
                break;

            }
        }
    }
    console.log("blocks",blocks);
    return blocks;
}
