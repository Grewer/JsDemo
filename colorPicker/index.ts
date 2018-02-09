const pick = <HTMLElement>document.getElementById('pickBox');
const colorElement = <HTMLElement>pick.querySelector('.color');

//color长宽
const colorWidth = colorElement.clientWidth;
const colorHeight = colorElement.clientHeight;
console.log(colorWidth,colorHeight);


pick.addEventListener('mousedown',(ev)=> {
    const target = <HTMLElement>ev.target;
    console.log(target);
    if(target.className === 'p'){
        console.log('移动坐标');
    }
    console.log(ev);
    console.log(ev.offsetX,ev.offsetY)
    if(target.className === 'black'){
        // console.log(ev);
        const x = ev.offsetX,y = ev.offsetY;
        let color = {r:255,g:255,b:255},
            {r,g,b} = color;
        // 先根据x改变
        // console.log((1-x/colorWidth) * 255|0) //r
        // console.log((1-x/colorWidth) * 127.5|0) //rb


        console.log((1-y/colorHeight)*255 |0)//r,g,b

    }


},false);