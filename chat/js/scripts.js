/**
 * Created by Администратор on 09.03.2015.
 */

var Mess;
var control=0;
var uniqueId = function() {
    var date = Date.now();
    var random = Math.random() * Math.random();

    return Math.floor(date * random).toString();
};


var theMessage = function(user, message) {
    return {
        description:user,
        description2:message,
        id: uniqueId()
    };
};

var MessageList = [];

var labelEl1;
 var user="";
function whatToDo(){
    var appContainer = document.getElementsByClassName('Messages')[0];
    appContainer.addEventListener('click', delegateEvent5);
}


function delegateEvent5(evtObj) {

    if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-warning')){
         labelEl1 = evtObj.target.parentElement;
        changeMessage(labelEl1);
    }
     if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-danger')){
            var labelEl = evtObj.target.parentElement;

                   onToggleItem(labelEl);
        }
}


var a=0;


function delegateEvent10(evtObj) {

    if (evtObj.type === 'click' && evtObj.target.classList.contains('btn-success')) {
        var nameText2 = document.getElementById('msgspace');
        Mess = nameText2.value;

        changeDescription(MessageList[a], Mess);
        updateItem(labelEl1, MessageList[a]);
        store(MessageList);
        control = 0;
    }
}


function changeMessage(labelEl){
    var id = labelEl.attributes['data-task-id'].value;


    for(var i = 0; i < MessageList.length; i++) {
        if (MessageList[i].id != id)
            continue;

         a=i;
         Mess = MessageList[i].description2;
        document.getElementById('msgspace').value = Mess;
        control=1;
        var appContainer = document.getElementsByClassName('btn-success')[0];
        appContainer.addEventListener('click', delegateEvent10);
             return;
        }

}

function changeDescription(message,newMess){
    message.description2 =newMess ;
    var nameText2 = document.getElementById('msgspace');
    nameText2.value = '';
}


function onToggleItem(labelEl) {
    var id = labelEl.attributes['data-task-id'].value;
    for(var i = 0; i < MessageList.length; i++) {
        if(MessageList[i].id != id)
            continue;
        MessageList.splice(i,1);
        store(MessageList);
        location.reload()

        return;
    }

}

function sendMes(){
    var appContainer = document.getElementsByClassName('btn-success')[0];
    appContainer.addEventListener('click', delegateEvent4);

}
function delegateEvent4(evtObj) {

    if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-success') && control!=1){
    send();
    }

}
function send() {

        var nameText2 = document.getElementById('msgspace');
        var newMes = theMessage(user,nameText2.value);
        if(nameText2.value!='' && user!=""){
            addMsg(newMes);

        }
        if(user=="")  {
        alert("Введите имя пользователя") ;
        }
        nameText2.value = '';




}



function editName(){

    document.getElementById('edit').onclick = function () {
        var newName= prompt("Введите ваше новое имя");
        addName(newName);
    }

}




function addMsg(message) {

    document.addEventListener("DOMContentLoaded", function addMsg() {}, false);

    var item = createItem(message);
    var items = document.getElementsByClassName('layer')[0];

    MessageList.push(message);
    items.appendChild(item);
    store(MessageList);
}

function createItem(message){
    var temp = document.createElement('div');
    var htmlAsText = '<div data-task-id="идентификатор">описание'+ '<button class="btn-danger edit-btn" >'+'<button class="btn-warning edit-btn" ></div>';
    temp.innerHTML = htmlAsText;
    updateItem(temp.firstChild, message);

    return temp.firstChild;
}

function updateItem(divItem, message){

    divItem.setAttribute('data-task-id', message.id);
    divItem.firstChild.textContent = message.description+": "+message.description2;

}
function store(listToSave) {


    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    localStorage.setItem("MessageList", JSON.stringify(listToSave));
}
function storeName(nameToSave) {


    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    localStorage.setItem("user", JSON.stringify(nameToSave));
}

function restoreName() {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("user");

    return item && JSON.parse(item);
}
function restore() {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("MessageList");

    return item && JSON.parse(item);
}


function run() {
    var element = document.getElementsByClassName('MyEl')[0];

    element.addEventListener('click', delegateEvent);
   // element.addEventListener('dblclick', delegateEvent10);
    user=restoreName();
    addName(user);
    var allMessages = restore() ;
    createAllMessages(allMessages);


}
function createAllMessages(allMessages) {
    for(var i = 0; i < allMessages.length; i++)
        addMsg(allMessages[i]);
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
    user=value;
    document.getElementById('myName').innerHTML=value;
    storeName(user);

}


function func(){

    run();
    sendMes();
    editName();
    whatToDo();



}

