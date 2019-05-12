//split message from user
function splitMessage() {
    var contentMessage = document.getElementById('commandID').value;
    if(!contentMessage.replace(/\s/g, '').length){ // if value only contains spage show error
        alert("Data invalid");
        return;
    }
    var commandSplit = new Array();
    //if lenght < || 50 return;
    if ( contentMessage.length < 50 || contentMessage.length == 50 ){
        commandSplit.push(contentMessage)
        return commandSplit;
    }
    //if lenght > 50 then split
    else {
        var inputcontentMessage = contentMessage.split(' '); //convert string to array
        var countSplit = 0;
        var element = '';
        //split when string < || 50 character
        for (var i = 0; i < inputcontentMessage.length; i++) {
            countSplit = countSplit + inputcontentMessage[i].length;
            if ((countSplit < 50 && element.length < 50) || (countSplit == 50 && element.length < 50)) {
                element = element + inputcontentMessage[i] + ' ';
                if (i + 1 == inputcontentMessage.length) {
                    commandSplit.push(element);
                }
            }
            else {
                if (element.substr(element.length - 1) == ' ') // remove space last of string if it is space
                    element = element.substring(0, element.length - 1);
                commandSplit.push(element); // add to array
                countSplit = 0;
                element = inputcontentMessage[i] + ' ';
            }

        }

        for (var i = 0; i < commandSplit.length; i++) { // add prefix in each array
            commandSplit[i] = (i + 1) + '/' + commandSplit.length + ' ' + commandSplit[i];
        }
        return commandSplit;
    }
}
//API in order to POST any comment from user
function PostCommandAPI(comment) {
    if (comment){
        //handle and call API
        return true;
    }
    return false;
}
//function render list comment from user
function renderCommand(arrayCommand) {
    var listCommant = document.getElementById('list-array');
    var title = document.getElementById('list-comment');
    var node;
    var textnode;
    for (var i = 0; i < arrayCommand.length; i++) {
        node = document.createElement("li");
        textnode = document.createTextNode(arrayCommand[i]);
        node.appendChild(textnode);
        listCommant.appendChild(node);
    }

}
//call API
function postComment() {
    document.getElementById('btn-send').addEventListener('click', function (e) {
        e.preventDefault();
        if(PostCommandAPI(splitMessage()))
        {
            renderCommand(splitMessage());  // if add comment success then render in order to display for user
        }
    });
}

window.onload = function (e) {
    postComment(); // call postComment
}