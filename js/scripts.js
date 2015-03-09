/**
 * Created by Администратор on 09.03.2015.
 */
function deleteM(){
    var appContainer = document.getElementsByClassName('Messages')[0];
    appContainer.addEventListener('click', delegateEvent5);
    appContainer.addEventListener('change', delegateEvent3);


}

function delegateEvent3(evtObj) {

    if(evtObj.type === 'change' && evtObj.target.nodeName == 'INPUT'){
        var labelEl = evtObj.target.parentElement;

        onToggleItem(labelEl);
    }
}



function delegateEvent5(evtObj) {

    if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-success')){
        var labelEl = evtObj.target.parentElement;
        changeMessage(labelEl);
    }
}
function changeMessage(labelEl){

    var newMess= prompt("Введите изменное сообщение");
    var divItem = document.createElement('div');
    var checkbox = document.createElement('input');
    var button = document.createElement('button');
    button.classList.add('btn-success');
    divItem.classList.add('msg');
    checkbox.setAttribute('type', 'checkbox');
    divItem.appendChild(checkbox);
    divItem.appendChild(document.createTextNode(newMess));
    divItem.appendChild(button);
    labelEl.parentNode.replaceChild(divItem,labelEl);

}

function onToggleItem(labelEl) {


    labelEl.parentNode.removeChild(labelEl);




}


function send() {
    document.getElementById('send').onclick = function() {
        var nameText2 = document.getElementById('msgspace');
        var text2=nameText2.value;
        if(text2!=''){
            addMsg(text2);

        }
        nameText2.value = '';


    }

}



function editName(){

    document.getElementById('edit').onclick = function () {
        var newName= prompt("Введите ваше новое имя");
        addName(newName);
    }

}




function addMsg(value) {
    if(!value){
        return;
    }
    document.addEventListener( "DOMContentLoaded", function addMsg () {}, false );

    var items = document.getElementsByClassName('layer')[0];
    var divItem2 = document.createElement('div');
    var checkbox = document.createElement('input');
    var button = document.createElement('button');
    button.classList.add('btn-success');

    divItem2.classList.add('msg');

    checkbox.setAttribute('type', 'checkbox');


    divItem2.appendChild(checkbox);
    divItem2.appendChild(document.createTextNode(value));
    divItem2.appendChild(button);




    items.appendChild(divItem2);

}












function run() {
    var element = document.getElementsByClassName('MyEl')[0];

    element.addEventListener('click', delegateEvent);



}




function delegateEvent(evtObj) {

    var nameText = document.getElementById('nameText');

    text=nameText.value;
    if(text!=''){
        addName(text);
    }
    nameText.value = '';

}


function addName(value) {
    if(!value){
        return;
    }



    document.addEventListener( "DOMContentLoaded", function addName() {}, false );
    document.getElementById('myName').innerHTML=value;

}






function func(){

    run();
    send();
    editName();
    deleteM();


}

