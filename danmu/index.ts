const canvas = <HTMLCanvasElement>document.getElementById('canvas');
let ctx: any = canvas.getContext('2d');
const W: number  = canvas.width=window.innerWidth;
const H:number = window.innerHeight;
canvas.height = H*.6;

interface dataType{
    data:string
}
let store:dataType[] = [];