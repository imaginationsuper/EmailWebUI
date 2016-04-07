/**
 * Created by Jerry on 4/5/16.
 */
var openInbox = document.getElementById("Inbox");
openInbox.click();

var mails = data;
var callNewMailCode = "document.getElementById('new_mail').style.display='block'";
var callMoveCode = "changeLabel()";

function to_close(){
    document.getElementsByClassName("w3-sidenav")[0].style.display = "none";
    document.getElementsByClassName("w3-overlay")[0].style.display = "none";
}
function to_open(){
    document.getElementsByClassName("w3-sidenav")[0].style.display = "block";
    document.getElementsByClassName("w3-overlay")[0].style.display = "block";
}
function showMail(id){
    subid = id + 'List';
    var cur_div = document.getElementById(subid);
    var numOfEmail = mails[id].length;
    var cur_mail = mails[id];
    /*for (var node in cur_div.childNodes){
     cur_div.removeChild(node);
     }*/
    for (var i=0; i<numOfEmail; i++){
        var new_mail = document.createElement('a');
        new_mail.setAttribute("href","javascript:void(0)");
        new_mail.setAttribute("id", id+"-Email-"+cur_mail[i].index);
        new_mail.setAttribute("class", "w3-boder-bottom email w3-hover-light-grey");
        new_mail.setAttribute("onclick", "openMail(this.id);to_close();");
        var new_mail_content = document.createElement('div');
        new_mail_content.setAttribute('class', "w3-container");
        new_mail_content.innerHTML = "<span class='w3-opacity w3-large'>" + cur_mail[i].sender + "</span><h5>" + cur_mail[i].subject +"</h5><span class='w3-tag w3-light-green'>"+cur_mail[i].category+"</span><p>"+ cur_mail[i].body.substr(0,30) +"...</p>";
        new_mail.appendChild(new_mail_content);
        cur_div.appendChild(new_mail);
    }
    document.getElementById(subid).classList.toggle("w3-show");
    document.getElementById(subid).previousElementSibling.classList.toggle("w3-red");
}
function openMail(id) {
    var mail_display = document.getElementById("mail_display");
    mail_display.style.display = "none";
    var id_text = id.split('-');
    var mail_index = id_text[id_text.length-1];
    var mail_cat = id_text[0];
    var subject =  "<h2>" + mails[mail_cat][mail_index].subject + "</h2>";
    var buttons = "<a class='w3-btn w3-light-grey' onclick=" + callNewMailCode + ">Reply  <i class='fa fa-mail-reply'></i></a> <a class='w3-btn w3-light-grey' onclick=" + callNewMailCode
        + ">Forward  <i class='fa fa-arrow-right'></i></a> <a class='w3-btn w3-light-grey' onclick=" + callMoveCode + ">Change Label  <i class='fa fa-arrow-right'></i></a>";
    var content = "<pre>" + mails[mail_cat][mail_index].body + "</pre>";
    mail_display.style.display = "block";
    mail_display.innerHTML = "<br>" + subject + "<br>" + buttons + "<hr>" + content;
}
function sendMail(){
    // not work
    var dest_address = document.getElementById("dest_address").valueOf();
    var subject = document.getElementById("subject").valueOf();
    var body = document.getElementById("body").valueOf();
    var message = subject + "\n\n" + body;
}
function addNewLabel(){
    var label_name = document.getElementById("label_name").value;
    if (document.getElementById(label_name) !=  null)
        return;
    var new_label = document.createElement("div");
    new_label.setAttribute("class", "w3-accordion");
    var new_label_btn = document.createElement("a");
    new_label_btn.setAttribute("href", "javascript:void(0)");
    new_label_btn.setAttribute("id", label_name);
    new_label_btn.setAttribute("onclick", "openMail(this.id);to_close();");
    new_label_btn.innerHTML = "<i class='fa fa-inbox'></i> " + label_name + " <i class='fa fa-caret-down'></i>";
    var new_label_list = document.createElement("div");
    new_label_list.setAttribute("id", label_name+"List");
    new_label_list.setAttribute("class", "w3-accordion-content w3-animate-left");
    new_label.appendChild(new_label_btn);
    new_label.appendChild(new_label_list);
    document.getElementById("LabelList").appendChild(new_label);
    mails[label_name] = [];
    document.getElementById("label_name").value = "";
    /*var fs = require("fs");
    fs.writeFile("emailbox.json", JSON.stringify(data, null, 4), function(err){
        if (err){
            console.log(err);
        } else {
            console.log("JSON saved");
        }
    });*/
}