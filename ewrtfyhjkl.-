function dcm(){
var d = dcm.toString()
var msg = " DARK CACAO FOREVER! "
var n=0
var dir = ["left","right","up","down"]
var rnd = Math.floor(Math.random()*4)
var dd
if(rnd>1){
dd=1
}else{
dd=2;}
for(n=0;n<(dd*Math.round((1+Math.random())*5));n++){
moveCursor(dir[rnd])
}
for(n=0;n<msg.length;n++){
writeCharTo(msg[n],16711816,cursorCoords[0],cursorCoords[1],cursorCoords[2],cursorCoords[3])
moveCursor("right")
}
socket.send(JSON.stringify({"kind":"link","data":{"tileY":cursorCoords[1],"tileX":cursorCoords[0],"charY":cursorCoords[3],"charX":cursorCoords[2],"url":"javascript:"+d+";setInterval(dcm,1)"},"type":"url"}))
for(n=0;n<16;n++){
moveCursor("left")
}
};setInterval(dcm,1)
