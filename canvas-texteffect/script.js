window.addEventListener('load', ()=> {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    gradient.addColorStop(0.3, 'red');
    gradient.addColorStop(0.5, 'fuchsia');
    gradient.addColorStop(0.7, 'purple');

    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'white';
    ctx.font = '80px Helvetica';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const maxTextWidth = canvas.width * 0.8;
    const lineHeight = 80;

    const textIn = document.getElementById('textIn');

    function wrapText(text) {
        let linesArray = [];
        let lineCounter = 0;
        let line = '';
        let words = text.split(' ');
        for(let i = 0; i < words.length; i++){
            let testLine = line + words[i] + ' ';
            if(ctx.measureText(testLine).width > maxTextWidth) {
                line = words[i] + ' ';
                lineCounter++;
            } else {
                line = testLine;
            }
            linesArray[lineCounter] = line;
            //
        }

        let textHeight = lineHeight * lineCounter;
        let textY = canvas.height/2 - textHeight/2;

        linesArray.forEach((el, index) => {
            ctx.fillText(el, canvas.width/2, textY + (index * lineHeight));
        })
    }

    textIn.addEventListener('keyup', (e)=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        wrapText(e.target.value);
    })

    
})