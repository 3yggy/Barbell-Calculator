window.onload = function() {
    let btnAdd = document.getElementById('btnAdd');
    let inWeight = document.getElementById('inWeight');
    let inCount = document.getElementById('inCount');
    let lovelyThread = document.getElementById('lovelyThread');


    btnAdd.onclick = function(){
        AddBabe(inWeight.value,inCount.value);
    }
}

const maxWeight = 1000000;
const maxCount = 100;
function AddBabe(weight, count){
    weight = parseFloat(weight);
    count = parseInt(count)
    if(weight && count){

        if(weight>maxWeight)
            weight = maxWeight;
        if(count>maxCount)
            count = maxCount;

        console.log(weight+' x '+count);

        let tr = document.createElement('tr');
        
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
            BakeWeights();
        }
        thClose.appendChild(btnClose);

        tr.appendChild(thWeight);
        tr.appendChild(thCount);
        tr.appendChild(thClose);

        lovelyThread.appendChild(tr);

    }
    else{
        console.log('bad baby');
    }
}

var Plates = [1,54,75,12,9,5,8,2];
function BakeWeights(){
   
    console.log(PowerSet(Plates));
}

function PowerSet(input) {
    if(input.length === 0) return [input];
    
    let first = input[0];
    let rest = findPowerSet(input.slice(1));
    
    let tmp = [];
    
    rest.forEach(el => tmp.push([first].concat(el)));
    
    return tmp.concat(rest);

}