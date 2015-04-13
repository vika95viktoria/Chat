/**
 * Created by Администратор on 09.03.2015.
 */
'use strict';

var control=0;
var user="";
var uniqueId = function() {
    var date = Date.now();
    var random = Math.random() * Math.random();

    return Math.floor(date * random).toString();
};


var theMessage = function(user, message) {
    return {
        user:user,
        message:message,
        id: uniqueId()
    };
};
var appState = {
    mainUrl : 'http://localhost:999/chat',
    messageList:[],
    token : 'TE11EN'
};



function func(){

    run();
    sendMes();
    editName();
    whatToDo();



}
function run() {
    var element = document.getElementsByClassName('MyEl')[0];

    element.addEventListener('click', delegateEvent);

}
function whatToDo(){
    var appContainer = document.getElementsByClassName('Messages')[0];
    appContainer.addEventListener('click', delegateEvent5);
}
var editlabel;
function delegateEvent5(evtObj) {

    if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-warning')){
        changeMessage(evtObj.target.parentElement);
    }
    if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-danger')){
        onToggleItem(evtObj.target.parentElement);
    }
}

function onToggleItem(divItem) {
    var id = divItem.attributes['data-task-id'].value;
    var messageList = appState.messageList;
    for(var i = 0; i < messageList.length; i++) {
        if(messageList[i].id != id)
            continue;

        toggle(messageList[i], function() {
            updateItem2(divItem, messageList[i]);
            output(messageList);
        });

        return;
    }

}
var a=0;
function changeMessage(divItem){
    var id = divItem.attributes['data-task-id'].value;
    var messageList = appState.messageList;
    editlabel=divItem;
    for(var i = 0; i < messageList.length; i++) {
        if(messageList[i].id != id)
            continue;

        a=i;
        var Mess = messageList[i].message;
        document.getElementById('msgspace').value = Mess;
        control=1;
        var appContainer = document.getElementsByClassName('btn-success')[0];
        appContainer.addEventListener('click', delegateEvent10);
        return;
    }

}
function delegateEvent10(evtObj) {

    if (evtObj.type === 'click' && evtObj.target.classList.contains('btn-success') && control==1) {
        var nameText2 = document.getElementById('msgspace');
        var Mess = nameText2.value;
        var messageList = appState.messageList;
        changeDescription(messageList[a], Mess,function() {
            updateItem2(editlabel, messageList[a]);
            output(messageList);
        });



        control = 0;
    }
}

function changeDescription(message,newMess,continueWith) {
    message.message =newMess ;
    var nameText2 = document.getElementById('msgspace');
    nameText2.value = '';

    put(appState.mainUrl + '?id=' + message.id, JSON.stringify(message), function() {
        continueWith();
    });

}


function toggle(message, continueWith) {
    message.message="";
    put(appState.mainUrl + '?id=' + message.id, JSON.stringify(message), function() {
        continueWith();
    });
}


function delegateEvent(evtObj) {

    var nameText = document.getElementById('nameText');

    var text=nameText.value;
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
}


function sendMes(){
    var appContainer = document.getElementsByClassName('btn-success')[0];
    appContainer.addEventListener('click', delegateEvent4);

    restore();

}
function createAllMessages(allMessages) {
    for(var i = 0; i < allMessages.length; i++) {
        addMsgInternal(allMessages[i]);
        if(i==allMessages.length-1)
        {
            restoreName(allMessages[i]);
        }
    }
}
function delegateEvent4(evtObj) {

    if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-success') && control!=1){
        send();
    }

}
function send() {

    var nameText2 = document.getElementById('msgspace');
    var newMes = theMessage(user,nameText2.value);
    if(nameText2.value == '')
        return;


        addMsg(newMes,function() {
            output(appState);
        });

    nameText2.value = '';

}

function addMsg(message, continueWith) {
    post(appState.mainUrl, JSON.stringify(message), function(){
        restore();
    });
}

function editName (){

    document.getElementById('edit').onclick = function () {
        var newName= prompt("Введите ваше новое имя");
        addName(newName);
    }

}


function addMsgInternal(message) {


    var item = createItem(message);
    var items = document.getElementsByClassName('layer')[0];
    var messageList = appState.messageList;
    messageList.push(message);
    items.appendChild(item);

}
function updateItem2 (divItem, message){

    divItem.setAttribute('data-task-id', message.id);
    divItem.firstChild.textContent = message.user+": "+message.message;

}

function createItem(message){
    var temp = document.createElement('div');
    var htmlAsText = '<div data-task-id="идентификатор">описание'+ '<button class="btn-danger edit-btn" >'+'<button class="btn-warning edit-btn" ></div>';
    temp.innerHTML = htmlAsText;
    updateItem2(temp.firstChild, message);

    return temp.firstChild;
}
function restoreName (message){
   addName(message.user);
}

function restore(continueWith) {
    var url = appState.mainUrl + '?token=' + appState.token;
    get(url, function(responseText) {
        console.assert(responseText != null);

        var response = JSON.parse(responseText);

        appState.token = response.token;
        createAllMessages(response.messages);
        output(appState);



        continueWith && continueWith();
    });

}

function output(value){
    var output = document.getElementById('output');

    output.innerText = JSON.stringify(value, null, 2);
}

function defaultErrorHandler(message) {
    console.error(message);
    output(message);
}
function get(url, continueWith, continueWithError) {
    ajax('GET', url, null, continueWith, continueWithError);
}

function post(url, data, continueWith, continueWithError) {
    ajax('POST', url, data, continueWith, continueWithError);
}

function put(url, data, continueWith, continueWithError) {
    ajax('PUT', url, data, continueWith, continueWithError);
}
function isError(text) {
    if(text == "")
        return false;

    try {
        var obj = JSON.parse(text);
    } catch(ex) {
        return true;
    }

    return !!obj.error;
}

function ajax(method, url, data, continueWith, continueWithError) {
    var xhr = new XMLHttpRequest();

    continueWithError = continueWithError || defaultErrorHandler;
    xhr.open(method || 'GET', url, true);

    xhr.onload = function () {
        if (xhr.readyState !== 4)
            return;

        if(xhr.status != 200) {
            continueWithError('Error on the server side, response ' + xhr.status);
            return;
        }

        if(isError(xhr.responseText)) {
            continueWithError('Error on the server side, response ' + xhr.responseText);
            return;
        }

        continueWith(xhr.responseText);
    };

    xhr.ontimeout = function () {
        continueWithError('Server timed out !');
    }

    xhr.onerror = function (e) {
        var errMsg = 'Server connection error !\n'+
            '\n' +
            'Check if \n'+
            '- server is active\n'+
            '- server sends header "Access-Control-Allow-Origin:*"';

        continueWithError(errMsg);
    };

    xhr.send(data);
}

window.onerror = function(err) {
    output(err.toString());
}
