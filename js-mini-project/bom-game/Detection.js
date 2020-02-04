export function detec(ball, gameObject) {
    //检测球撞击矩形，改变运动方向
    let bottomOfball = ball.position.y + ball.size;
    let topOfBall = ball.position.y;


    let topOfObject = gameObject.position.y;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;
    let bootomOfObject = gameObject.position.y + gameObject.height;

    if(bottomOfball >= topOfObject && 
        topOfBall <= bootomOfObject &&  
        ball.position.x >= leftSideOfObject && 
        ball.position.x + ball.size <= rightSideOfObject) {
        return true;
    } else {
        return false;
    }
}