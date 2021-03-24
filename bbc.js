window.onload = function() {
    let btnAdd = document.getElementById('btnAdd');
    let inWeight = document.getElementById('inWeight');
    let inCount = document.getElementById('inCount');
    let lovelyThread = document.getElementById('lovelyThread');
    let btnClear = document.getElementById('btnClear');
    let btnCalc = document.getElementById('btnCalc');
    let inLift = document.getElementById('inLift');
    let reader = document.getElementById('reader');
    let sldrLift = document.getElementById('sldrLift');
    let nmbrLift = document.getElementById('nmbrLift');
    let plateDisplay = document.getElementById('plateDisplay');
    
    btnAdd.onclick = function(){
        AddBabe(inWeight.value,inCount.value);
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
            nmbr = Math.round(sldrLift.max*100)/100;
            nmbrLift.value = nmbr;
        }
        sldrLift.value = nmbr;
        SeekLift();
    }

    sldrLift.oninput = function(){
        nmbrLift.value = sldrLift.value;
        SeekLift();
    }

    const cockies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
    const plateCockies = cockies['plates'].split('|');
    const targetCocky = cockies['target'];
    for (i = 0; i < plateCockies.length; i+=2) {
        AddBabe(plateCockies[i],plateCockies[i+1])
    }
    PreparationUpdate();

    nmbrLift.value = targetCocky;
    sldrLift.value = targetCocky;
    SeekLift();

}

const maxWeight = 1000000;
const maxCount = 30;

function SeekLift(){
    if(combos){
        var tar = parseFloat(sldrLift.value);
        //console.log('want:',tar);
        const lift = NearestLift(tar,Object.keys(combos))

        if(lift){
            //console.log('lift: '+lift);
            //console.log('from: '+combos[lift]);
            
            var CookieDate = new Date;
            CookieDate.setFullYear(CookieDate.getFullYear() +10);
            document.cookie = 'target='+tar+'; expires=' + CookieDate.toGMTString() + ';';

            var txt;
            plateDisplay.innerHTML = ""
            if(lift!='0'){
                var display = combos[lift].sort(function(a,b){ return a-b;})
                txt = display;
                
                for(i in display){
                    var plate = document.createElement('div');
                    plate.className = 'plate';
                    var weight = display[i];
                    plate.textContent = weight;
                    plate.style.maxWidth = weight*2+60+'px';
                    plate.style.height = '26px';
                    plate.style.bottom = (i*26)+'px';
                    plateDisplay.appendChild(plate);
                }

            }else
                txt = 'No plates'

            reader.innerHTML  = 'Weight: '+lift+'<br>Plates: '+ txt;
        }
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
    return a[lo];
}

function Calculate(plates){
    var result = {0:[]};
    for (var i = 1; i < (1 << plates.length); i++) {
        var sum = 0;
        var subset = [];
        for (var j = 0; j < plates.length; j++)
        if (i & (1 << j)){
            subset.push(plates[j]);
            sum+=plates[j];
        }
        result[Math.round(sum * 100) / 100] = subset;
    }
    return result;
}

var combos;
function PreparationUpdate(){

    const BabiesWithMen = GetBabiesWithMen();
    var babies = BabiesWithMen[0]; men = BabiesWithMen[1];

    var CookieDate = new Date;
    CookieDate.setFullYear(CookieDate.getFullYear() +10);
    document.cookie = 'plates='+men+'; expires=' + CookieDate.toGMTString() + ';';

    let ctrl =  document.getElementById('displayContainer');
    lastLen = babies.length;
    if(lastLen){

        ctrl.hidden= false;

        combos = Calculate(babies); 

        var keys = Object.keys(combos);
        const max = keys[keys.length-1];
        sldrLift.max = max;
        sldrLift.step =(max %1).toFixed(2);
        console.log('possibles: ',keys);
        console.log('max: ',max);
        SeekLift();
    }else{
        ctrl.hidden= true;
    }
}


function GetBabiesWithMen(){
    var babies = [];
    var men = ""
    array = Array.from(lovelyThread.children).filter(e=>e.id=='valueMan');
    for(i in array){ 
        let bb = array[i];
        let val = parseFloat(bb.firstChild.textContent);
        let count = bb.children.item(1).textContent;
        
        for (let i = 0; i < count; i++) {
            babies.push(val);
        }
        men+=val+"|"+count+"|"
    }
    return [babies,men];
}

var lastLen = 0;
function AddBabe(weight, count){
    weight = Math.round(parseFloat(Math.abs(weight))*100)/100;
    count = parseInt(count)


    if(weight && count){

        if(weight>maxWeight)
            weight = maxWeight;
        //if(count>maxCount)
          //  count = maxCount;

        if(count+lastLen>maxCount){
            alert('Si tienes mas de ['+maxCount+'], platos, porque no dame un poco, senor grande?!');
            return;
        }

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
        btnClose.textContent = '-';
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