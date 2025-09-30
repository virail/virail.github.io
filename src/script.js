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
    ctx.strokeStyle=style.getPropertyValue('--main-colour');
    ctx.beginPath();
    for (const [x, y] of points) {
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    // ctx.fillRect(0, 0, 10, 10);

    // ctx.fill
};

function generateRandomPoints(amount, width, height) {
    return Array.from({ length: amount }, (_, i) => [ (width / amount) * i, Number(((Math.random() * (height - 0)) + 0).toFixed(2))]);
}
