﻿var base64String = "";
var userid="";


$(document).ready(function () {
    $('#preloader').css('display', 'flex');
    let searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get('e');
    userid = param;
    initProfilePic();
    
    //getuserAccessLevel();
    showUserData();
   // getImagepic();

    $('#Savebtn').click(function(){
        
        UpdateData();
        
    });

    $('#changeStaus').click(function(){
        var status=$('#ustatus').val();

       changeStatus(status);
    });

    $('#del').click(function(){
        deleteImage();
    });
});
/*
function getuserAccessLevel() {
    $.ajax({
        url: "../WebService.asmx/getUserAcessLevel",
        type: "POST",
        contentType: "application/json",
        // data: "{ 'uid': '" + userid + "'}",
        dataType: "json",
        success: function (response) {
            user = response.d;
            switch (parseInt(user) !== 0) {
                case 0:
                    alert("Unauthorized Access. Please Login");
                    window.location = "../login.html";
                    break;
                case 1:
                    showUserData();
                    initProfilePic();
                    getImagepic();
                    break;
                default:
                    alert("User profile not identified. Please Login.");
                    window.location = "../login.html";
                    break;
            }
        }


    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });

}
*/
function showUserData(){
    $.ajax({
        url: "../WebService.asmx/getuserdata",
        type: "POST",
        contentType: "application/json",
        data: "{ 'uid': '" + userid + "'}",
        dataType: "json",
        success: function (response) {
          //  alert(response.d);
            user = JSON.parse(JSON.parse(response.d));
            if (user[0].ustatus.localeCompare("521") === 0){
                alert("No records found");
                $('#preloader').css('display', 'none');
            }
            else if (user[0].ustatus.localeCompare("522") === 0)
                alert("Something went wrong. Please try again.");
            else {
                $('#fname').val(user[0].fname);
                $('#sname').val(user[0].sname);
                $('#gender').val(user[0].gender).change();
                if(user[0].photo.length>10){
                    $('#imgprofile').attr('src',user[0].photo);
                }
                else {
                    $('#imgprofile').attr('src', "../assets/imgs/profile pic.png");
                }

                $('#dob').val(user[0].dob);
                $('#maritalstatus').val(user[0].marriagestatus).change();
                $('#bloodgroup').val(user[0].bgroup).change();
                $('#phno').val(user[0].uphno);
                $('#email').val(user[0].uemail);
                $('#city').val(user[0].ucity);
                $('#profession').val(user[0].profession);
                $('#workingin').val(user[0].workingin);
                $('#lclass').val(user[0].lclass).change();
                $('#workingas').val(user[0].workingas).change();
                $('#bio').val(user[0].ubio);
                switch (parseInt(user[0].ustatus)) {
                    case -2:
                        $('#Pstatus').text("Pending");
                        break;
                    case -1:
                        $('#Pstatus').text("Pending");
                        break;
                    case 1:
                        $('#Pstatus').text("Approved");
                        break;
                    case 0:
                        $('#Pstatus').text("Blocked");
                        break;
                }
                $('#instaid').val(user[0].instaurl);
                $('#fbid').val(user[0].fbookurl);
                $('#lnkid').val(user[0].linkdnurl);

                $('#MediInsurP').val(user[0].medinsupro);
                $('#ExpertIn').val(user[0].expertin);
                $('#dateExpiry').val(user[0].medinsuexp);
                
                $('#batchNo').val(user[0].batchNo);
                $('#country_code').val(user[0].country_code);
                

                $('#preloader').css('display', 'none');

                

            }
        }

    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });
}

function changeStatus(status){
    if(userid.length>0){
        $.ajax({
            url: '../WebService.asmx/updateUserStatus',
            type: "POST", // type of the data we send (POST/GET)
            contentType: "application/json",
            data: "{ 'uid': '" + userid + "', 'ustatus': '" + status + "', 'email': '" + $('#email').val() + "', 'fname': '" + $('#fname').val() + "', 'sname': '" + $('#sname').val() + "'}",
            datatype: "json",
            success: function (response) { // when successfully sent data and returned
                //    alert("Res: " + response.d);
                switch (parseInt(JSON.parse(response.d))) {
                    case 1:
                        
                        showUserData();

                            
                        break;
                    case 0:
                        alert("Unable to update Profile Pic. Try after sometime.");
                        break;
                    
                }

            } // success close
        }).done(function () {
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + ", Error: " + errorThrown);
            //alert("Something went wrong. Please contact Admin.");
        }).always(function () {
        }); // ajax call ends
    }else
        alert("Invalid user details");
}


function UpdateData(){
    
    
    if(userid.length>0){
       // alert("uid"+userid+"fname"+$('#fname').val()+"sname"+$('#sname').val()+"gender"+$('#gender').val()+"dob"+$('#dob').val()+"maritalstatus"+$('#maritalstatus').val()+"bgroup"+$('#bloodgroup').val()+"phno"+$('#phno').val());
        $.ajax({
            url: '../WebService.asmx/updateUserData',
            type: "POST", // type of the data we send (POST/GET)
            contentType: "application/json",
            data: "{ 'uid': '" + userid + "', 'fname': '" + $('#fname').val() + "', 'sname': '" + $('#sname').val() + "', 'gender': '" + $('#gender').val() + "', 'dob': '" + $('#dob').val() + "', 'maritalstatus': '" + $('#maritalstatus').val() + "', 'bgroup': '" + $('#bloodgroup').val() + "', 'phno': '" + $('#phno').val() + "', 'email': '" + $('#email').val() + "', 'city': '" + $('#city').val() + "', 'profession': '" + $('#profession').val() + "', 'workingin': '" + $('#workingin').val() + "', 'workingas': '" + $('#workingas').val() + "', 'lclass': '" + $('#lclass').val() + "', 'bio': '" + $('#bio').val() + "', 'instaurl': '" + $('#instaid').val() + "', 'fbookurl': '" + $('#fbid').val() + "', 'medicalInsurProvi': '" + $('#MediInsurP').val() + "', 'medicalInsurExpire': '" + $('#dateExpiry').val() + "', 'ExpertIn': '" + $('#ExpertIn').val() + "', 'linkdnurl': '" + $('#lnkid').val() + "', 'batchNo': '" + $('#batchNo').val() + "', 'country_code': '" + $('#country_code').val() + "'}",
            datatype: "json",
            success: function (response) { // when successfully sent data and returned
                // alert("Res: " + response.d);
                switch (parseInt(JSON.parse(response.d))) {
                    case 1:
                        alert("User Data Updated");
                        window.location='users.html';
                        showUserData();
                        break;
                    case 0:
                        alert("Unable to update Data. Try after sometime.");
                        break;
                    case -1:
                        alert("Unable to update Data, Please Contact to Admin");
                        break;
                    
                }

            } // success close
        }).done(function () {
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + ", Error: " + errorThrown);
            //alert("Something went wrong. Please contact Admin.");
        }).always(function () {
        }); // ajax call ends
    }else
        alert("Invalid user details");
}



function validateFileType(event) {
    var fileName = document.getElementById("fileprofile").value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
        //TO DO
        var output = document.getElementById('imgprofile');
        output.src = URL.createObjectURL(event.target.files[0]);
        /*output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }*/



    } else {
        $("#fileprofile").val(null);
        alert("Only jpg/jpeg and png files are allowed!");
    }
}

function initProfilePic(){

    $('#fileprofile').on('change', function() {      
        var img = $('#fileprofile')[0].files[0];
        var reader = new FileReader(); 
        reader.onloadend = function() { 
            //$("#base64Img").attr("href",reader.result); 
            base64String = reader.result;
            saveImage();
          //  alert(base64String);
        }
        reader.readAsDataURL(img);
    });

    
    
       
}

function saveImage(){
    //alert(base64String);
    if (base64String.length > 0) {
        if(userid.length>0){
            $.ajax({
                url: '../WebService.asmx/updateProfilePic',
                type: "POST", // type of the data we send (POST/GET)
                contentType: "application/json",
                data: "{ 'uid': '"+userid+"', 'baseval': '" + base64String + "'}",
                datatype: "json",
                success: function (response) { // when successfully sent data and returned
                    //    alert("Res: " + response.d);
                    switch (parseInt(JSON.parse(response.d))) {
                        case 1:
                            getProfilePic();
                            base64String = "";
                            
                            break;
                        case 0:
                            alert("Unable to update Profile Pic. Try after sometime.");
                            break;
                    
                    }

                } // success close
            }).done(function () {
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus + ", Error: " + errorThrown);
                //alert("Something went wrong. Please contact Admin.");
            }).always(function () {
            }); // ajax call ends
        }else
            alert("Invalid user details");
    } else
        alert("Please select an image to upload");
}

function getImagepic() {
    
    $.ajax({
        url: '../WebService.asmx/getProfilePic',
        type: "POST", // type of the data we send (POST/GET)
        contentType: "application/json",
        data: "{ 'uid': '" + userid + "'}",
        datatype: "json",
        success: function (response) { // when successfully sent data and returned
         //   alert("Res: " + JSON.stringify(response.d));
            if (response.d.length > 10) {
                $('#imgprofile').attr('src', String(response.d).replaceAll('"', ''));
                //$("#tarea").val(String(response.d).replaceAll('"', ''));
            }else
                $('#imgprofile').attr('src', "..\assets\imgs\profile pic.png");
        } // success close
    }).done(function () {
    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus + ", Error: " + errorThrown);
        //alert("Something went wrong. Please contact Admin.");
    }).always(function () {
    }); // ajax call ends
}

function deleteImage(){
    //alert(base64String);
    
        if(userid.length>0){
            $.ajax({
                url: '../WebService.asmx/updateProfilePic',
                type: "POST", // type of the data we send (POST/GET)
                contentType: "application/json",
                data: "{ 'uid': '"+userid+"', 'baseval': ''}",
                datatype: "json",
                success: function (response) { // when successfully sent data and returned
                    //    alert("Res: " + response.d);
                    switch (parseInt(JSON.parse(response.d))) {
                        case 1:
                            showUserData();
                            //alert("Success");
                            base64String = "";
                            
                            break;
                        case 0:
                            alert("Unable to update Profile Pic. Try after sometime.");
                            break;
                    
                    }

                } // success close
            }).done(function () {
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus + ", Error: " + errorThrown);
                //alert("Something went wrong. Please contact Admin.");
            }).always(function () {
            }); // ajax call ends
        }else
            alert("Invalid user details");
    
}