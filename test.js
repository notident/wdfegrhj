var fwcolors = [
	0x000000,
	0xB22234,
	0x0033CC
];

function random(a, b) {
	return Math.random() * (b - a) + a;
}

function explodeAtXY(posX, posY, fwcolor) {
	var maxSize = 0;
		
	var branchCount = 15;
	var editBatches = new Array(branchCount);
	for(var x = 0; x < editBatches.length; x++) {
		editBatches[x] = {};
	}
	
	for(var b = 0; b < branchCount; b++) {
		var angle = Math.random() * Math.PI * 2;
		var velocityX = Math.sin(angle);
		var velocityY = Math.cos(angle);
		
		var fX = posX;
		var fY = posY;
		
		for(var i = 0; i < 25; i++) {
			var x = Math.floor(fX);
			var y = Math.floor(fY);
			var bv = Math.floor((i / 25) * 4);
			editBatches[b][x + "," + y] = ["█▓▒░"[bv], fwcolor];
			
			fX += velocityX;
			fY -= velocityY;
			
			velocityY -= 0.05;
		}
	}
	
	for(var i = 0; i < editBatches.length; i++) {
		var batch = editBatches[i];
		var list = [];
		for(var w in batch) {
			var pos = w.split(",");
			var x = parseInt(pos[0]);
			var y = parseInt(pos[1]);
			var char = batch[w][0];
			var color = batch[w][1];
			list.push([x, y, char, color]);
		}
		editBatches[i] = list;
		var len = list.length;
		if(len > maxSize) maxSize = len;
	}
	
	var fwp = 0;
	var fwi = setInterval(function() {
		for(var w = 0; w < editBatches.length; w++) {
			var batch = editBatches[w];
			if(fwp >= batch.length) continue;
			var spark = batch[fwp];
			var px = spark[0];
			var py = spark[1];
			var char = spark[2];
			var color = spark[3];
			writeCharToXY(char, color, px, py);
		}
		fwp++;
		if(fwp >= maxSize) {
			clearInterval(fwi);
		}
	}, 1000 / 17);
}

function setFireworkAtXY(posX, posY, fwcolor) {
	var fuseColor = 0xFF0000;
	var fuseX = posX;
	var fuseY = posY;
	
	var velocityY = 2;
	var velocityX = random(-2, 2);
	
	var fuseTime = Math.floor(random(20, 30));
	var lastFusePos = null;
	
	var fuse = setInterval(function() {
		if(lastFusePos) {
			writeCharToXY(" ", 0x000000, lastFusePos[0], lastFusePos[1]);
		}
		var fpX = Math.floor(fuseX);
		var fpY = Math.floor(fuseY);
		writeCharToXY("▓", fuseColor, fpX, fpY);
		lastFusePos = [fpX, fpY];
		
		fuseX += velocityX;
		fuseY -= velocityY;
		velocityY -= 0.07;
		
		fuseTime--;
		if(fuseTime <= 0) {
			clearInterval(fuse);
			var col = fwcolors[Math.floor(Math.random() * fwcolors.length)];
			writeCharToXY(" ", 0x000000, lastFusePos[0], lastFusePos[1]);
			explodeAtXY(Math.floor(fuseX), Math.floor(fuseY), col);
		}
	}, 1000 / 16);
}

w.on("keydown", function(e) {
    if(e.key == "Control") {
        var pos = cursorCoords;
        var posX = pos[0] * 16 + pos[2];
        var posY = pos[1] * 8 + pos[3];
		
		setFireworkAtXY(posX, posY);
    }
});
