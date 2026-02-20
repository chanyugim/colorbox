export const drawCanvas = (canvas, ctx, boxCounter) => {
    class Box {
        constructor(x, y, dx, dy, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
        }
        move() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, 10, 10);
            if (this.x < 0 || this.x + 10 > canvas.width)
                this.dx *= -1;
            if (this.y < 0 || this.y + 10 > canvas.height)
                this.dy *= -1;
            this.x += this.dx;
            this.y += this.dy;
        }
    }
    const maxSpeed = 5, minSpeed = 2;
    const maxBox = 1000;
    const maxClickBox = 10; 
    const boxWidth = 10;
    const w = canvas.width;
    const h = canvas.height;
    let boxArray = [];

    const counter = () => {
        if (boxCounter)
            boxCounter(boxArray.length);
    }

    const numGenerator = (min, max, isFloor = false) => {
        return isFloor == false ? Math.random()*(max-min)+min : Math.floor(Math.random()*(max-min)+min);
    }
    const boxGenerator = (max, x, y) => {
        if (boxArray.length > maxBox)
            return;
        if (x && y) {
            for (let i = 0; i < max; i++) {
                const box = new Box(x, y, 
                (Math.random() < 0.5 ? -1 : 1)*numGenerator(minSpeed, maxSpeed), 
                (Math.random() < 0.5 ? -1 : 1)*numGenerator(minSpeed, maxSpeed),
                `RGB(${numGenerator(0, 256, true)},${numGenerator(0, 256, true)},${numGenerator(0, 256, true)})`);
                boxArray.push(box);
            }
        }
        else {
            for (let i = 0; i < max; i++) {
                const box = new Box(Math.random()*(w-boxWidth), Math.random()*(h-boxWidth), 
                (Math.random() < 0.5 ? -1 : 1)*numGenerator(minSpeed, maxSpeed), 
                (Math.random() < 0.5 ? -1 : 1)*numGenerator(minSpeed, maxSpeed),
                `RGB(${numGenerator(0, 256, true)},${numGenerator(0, 256, true)},${numGenerator(0, 256, true)})`);
                boxArray.push(box);
            }
        }
    }
    canvas.onclick = (e) => {
        const mouseX = e.clientX - ctx.canvas.offsetLeft;
        const mouseY = e.clientY - ctx.canvas.offsetTop;
        boxGenerator(numGenerator(1, 10, true), mouseX, mouseY);
        counter();
    }
    //boxGenerator(maxBox);
    let afId;    
    const init = () => {
        ctx.clearRect(0, 0, w, h);
        for (const item of boxArray) {
            item.move();  
        }
        afId = requestAnimationFrame(init);
    }
    init();

    return ()=>{
        cancelAnimationFrame(afId);
    }
}