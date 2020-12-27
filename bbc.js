window.onload = function() {
    let btnAdd = document.getElementById('btnAdd');
    let inWeight = document.getElementById('inWeight');
    let inCount = document.getElementById('inCount');
    let lovelyThread = document.getElementById('lovelyThread');
    let btnClear = document.getElementById('btnClear');
    let btnCalc = document.getElementById('btnCalc');
    let inLift = document.getElementById('inLift');
    let checkSym = document.getElementById('checkSym');
    let sldrLift = document.getElementById('sldrLift');
    let nmbrLift = document.getElementById('nmbrLift');
    
    btnAdd.onclick = function(){
        AddBabe(inWeight.value,inCount.value);
        GetBabies();
        PreparationUpdate();
    }

    btnClear.onclick = function(){
        array = Array.from(lovelyThread.children).filter(e=>e.id=='valueMan');
        for(i in array){     
            let bb = array[i].remove();
        }
        PreparationUpdate();
    }

    sldrLift.max = 100;
    nmbrLift.oninput = function(){
        var nmbr = parseFloat(nmbrLift.value);
        if(!nmbr)
            nmbr = 0;

        if(nmbr > sldrLift.max){
            nmbr = sldrLift.max;
            nmbrLift.value = nmbr;
        }
        sldrLift.value = nmbr;
        SeekLift();
    }

    sldrLift.oninput = function(){
        nmbrLift.value = sldrLift.value;
        SeekLift();
    }
}

const maxWeight = 1000000;
const maxCount = 20;

function SeekLift(){
    const lift = NearestLift(parseFloat(sldrLift.value),Object.keys(combos))
    if(lift){
        console.log('lift: '+lift);
        console.log('from: '+combos[lift]);
    }
}

function NearestLift(x, a){
    var lo = -1, hi = a.length;
    while (hi - lo > 1) {
        var mid = Math.round((lo + hi)/2);
        if (a[mid] <= x) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    if (a[lo] == x) hi = lo;
    return a[lo];//, a[hi]];
}



function Calculate(plates){
    var result = {};
 //   result.push(0,[]);
  
    for (var i = 1; i < (1 << plates.length); i++) {
        var sum = 0;
        var subset = [];
        for (var j = 0; j < plates.length; j++)
        if (i & (1 << j)){
            subset.push(plates[j]);
            sum+=plates[j];
        }

        result[sum] = subset;
    }

   /* var keys =  Object.keys(result);
    keys.sort();
    var sorted = {}
    for(i in keys){
        let key = keys[i];
        sorted[key] = result[key]
    }

    
    console.log(sorted);
*/
    return result;
}

var combos;
function PreparationUpdate(){
    combos = Calculate(GetBabies()); 
    let keys = Object.keys(combos);
    const max = keys[keys.length-1];
    sldrLift.max = max;
    sldrLift.step =(max %1).toFixed(2);
    console.log(max);
}

function GetBabies(){
    var babies = [];
    array = Array.from(lovelyThread.children).filter(e=>e.id=='valueMan');
    for(i in array){ 
        let bb = array[i];
        let val = parseFloat(bb.firstChild.textContent);
        for (let i = 0; i < bb.children.item(1).textContent; i++) {
            babies.push(val);
        }
    }
    return babies;
}

function AddBabe(weight, count){
    weight = parseFloat(weight).toFixed(2);
    count = parseInt(count)
    if(weight && count){

        if(weight>maxWeight)
            weight = maxWeight;
        if(count>maxCount)
            count = maxCount;

        let tr = document.createElement('tr');
        tr.id = 'valueMan';

        let thWeight = document.createElement('th');
        thWeight.textContent = weight;
        thWeight.className = 'entry';
        let thCount = document.createElement('th');
        thCount.textContent = count;
        thCount.className = 'entry';

        let thClose = document.createElement('th');
        let btnClose = document.createElement('button');
        btnClose.textContent = 'X';
        btnClose.onclick = function(){
            tr.remove();
            PreparationUpdate();
        }
        thClose.appendChild(btnClose);

        tr.appendChild(thWeight);
        tr.appendChild(thCount);
        tr.appendChild(thClose);

        lovelyThread.appendChild(tr);
    }
}