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
        // const currentColorArea = colorElement.style.backgroundColor;
        let {r,g,b} = getRGB(colorElement.style.backgroundColor);
        //右上 RGB;
        console.log(r,g,b);
        const x = ev.offsetX,y = ev.offsetY;
        let color = {r:255,g:255,b:255};
            // {r,g,b} = color;
        //左上角白色 255,255,255;
        const difference = {
            r:255-r,
            g:255-g,
            b:255-b
        };

        const rankX = x/colorWidth;

        rankChange(difference,rankX);
        console.log(difference);


        const rankY = y/colorHeight;

        // 先根据x改变
        // console.log((1-x/colorWidth) * 255|0) //r
        // console.log((1-x/colorWidth) * 127.5|0) //rb


        // console.log((1-y/colorHeight)*255 |0)//r,g,b

    }


},false);
interface rgb{
    r:number
    g:number
    b:number
}
const rankChange = (diff:rgb,rank:number):rgb =>{
    for(let i in diff){
        diff[i] = (rank * diff[i]) |0;
    }
    return diff;
};


const getRGB = (rgbString:string):rgb =>{
    let array:string[] = rgbString.split(',');
    return {r:Number(array[0].split('(')[1]),g:Number(array[1]),b:Number(array[2].slice(0,-1))};
};