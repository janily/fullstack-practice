const sections = document.querySelectorAll("section");
const bubble =document.querySelector(".bubble");
const gradients = [
    'linear-gradient(to right, #dc2430, #7b4397)',
    'linear-gradient(to right, #eef2f3, #8e9eab)',
    'linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E)'
];

const options = {
    threshold: 0.7
};

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
    entries.forEach(entry => { 
        const className = entry.target.className;
        const activeAnchor = document.querySelector(`[data-page=${className}]`); 
        const gradientIndex = entry.target.getAttribute('data-index');
        const coords =activeAnchor.getBoundingClientRect();
        const directions = {
            height:coords.height,
            width:coords.width,
            top:coords.top,
            left:coords.left,
        };

        if(entry.isIntersecting) {
            bubble.style.setProperty('left',`${directions.left}px`);
            bubble.style.setProperty('top',`${directions.top}px`);
            bubble.style.setProperty('width',`${directions.width}px`);
            bubble.style.setProperty('height',`${directions.height}px`);
            bubble.style.background = gradients[gradientIndex];
        }
        // console.log(entry);
    });
}

sections.forEach(section => {
    observer.observe(section);
});