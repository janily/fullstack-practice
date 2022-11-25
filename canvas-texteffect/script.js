window.addEventListener('load', ()=> {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const text = 'Hello';
    const textX = canvas.width/2;
    const textY = canvas.height/2;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'orangered';
    ctx.lineWidth = 3;
    ctx.font = '80px Helvetica';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text,  textX, textY);
    ctx.strokeText(text, textX, textY);
})