﻿

$(document).ready(function () {
    // Load Google Charts library
    google.charts.load('current', { 'packages': ['bar'] });
    // Call getAllDonations after Google Charts library is loaded
    google.charts.setOnLoadCallback(getAllDonations);
});

function getAllDonations() {
    // Call both AJAX functions to fetch data
    
}


function getAllDonations() {
    $('#donationPersonList').find("tr:gt(0)").remove();
    $.ajax({
        url: "../WebService.asmx/getDonationPersonList",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            getDonations = JSON.parse(JSON.parse(response.d));
            if (getDonations[0].name.localeCompare("521") === 0) {
                alert("No records found");
                $('.loader').css('display', 'none');
            } else if (getDonations[0].name.localeCompare("522") === 0) {
                alert("Something went wrong. Please try again.");
            } else {
                // Sort donations by date in descending order
                getDonations.sort(function (a, b) {
                    return new Date(b.datee) - new Date(a.datee);
                });

                for (i = 0; i < getDonations.length; i++) {
                    var txt = '<tr><th scope="row">' + (parseInt(i) + 1) + '</th>';
                    txt += '<td>' + getDonations[i].datee + '</td>';
                    txt += '<td>' + getDonations[i].batchNo + '</td>';
                    txt += '<td>*****</td>';
                    if (getDonations[i].PaymentMode === "1") {
                        txt += '<td>Account Transfer</td>';
                    } else if (getDonations[i].PaymentMode === "2") {
                        txt += '<td>Phonepay QRCode</td>';
                    } else if (getDonations[i].PaymentMode === "3") {
                        txt += '<td>SBI CollectLink</td>';
                    } else if (getDonations[i].PaymentMode === "4") {
                        txt += '<td>Razor Pay</td>';
                    } else if (getDonations[i].PaymentMode === "5") {
                        txt += '<td>PhonePay App</td>';
                    }
                    txt += '<td>' + getDonations[i].DonationAmount + '</td>';
                    $('#donationPersonList').prepend('<tr>' + txt + '</tr>');
                }
                $('.loader').css('display', 'none');
            }
        },
        error: function (xhr, status, error) {
            console.log("Status " + status + "Error" + error);
        }
    });
}




function getDonationData() {
    $.ajax({
        url: "../WebService.asmx/getDonations",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            story = JSON.parse(JSON.parse(response.d));
            if (story[0].title.localeCompare("521") === 0) {
            }
            else if (story[0].title.localeCompare("522") === 0)
                alert("Something went wrong. Please try again.");
            else {

                for (i = 0; i < story.length; i++) {


                    var txt = '  <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">';
                    txt += '<div class="causes-item d-flex flex-column bg-white border-top border-5 border-primary rounded-top overflow-hidden h-100">';
                    txt += '    <div class="text-center p-4 pt-0">';
                    txt += '      <div class="d-inline-block bg-primary text-white rounded-bottom fs-5 pb-1 px-3 mb-4">';
                    txt += '          <small id="category1">' + story[i].category + '</small>';
                    txt += '       </div>';
                    txt += '      <h5 class="mb-3" id="title1">' + story[i].title + '</h5>';
                    txt += '      <p id="description">' + story[i].description + '</p>';
                    txt += '<a class="btn btn-outline-primary my-2" target="_blank" href="' + story[i].expendLink + '">View Expenditure</a>';
                    txt += '    <div class="causes-progress bg-light p-3 pt-2">';
                    txt += '       <div class="d-flex justify-content-between">';
                    var percentage = (story[i].donateamount / story[i].targetamount) * 100;
                    txt += '            <p class="text-dark" id="targetamount1">₹' + story[i].targetamount + ' <small class="text-body">Goal</small></p>';
                    txt += '        <p class="text-dark">' + story[i].donateamount + ' <small class="text-body">Raised</small></p>';
                    txt += '      </div>';
                    txt += '           <div class="progress">';
                    txt += '                <div class="progress-bar" role="progressbar" aria-valuenow="' + Math.floor(percentage) + '" aria-valuemin="0" aria-valuemax="100">';
                    txt += '            <span>' + Math.floor(percentage) + '%</span>';
                    txt += '                </div> </div> </div> </div>';
                    txt += '    <div class="position-relative mt-auto">';
                    txt += '      <img class="img-fluid" id="photo1" src="' + story[i].photo + '" alt="">';
                    txt += '      <div class="causes-overlay">';
                    txt += '   <a class="btn btn-outline-primary" href="donate.html"> Donate Now <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2"> ';
                    txt += ' <i class="fa fa-arrow-right"></i>';
                    txt += ' </div> </a> </div> </div> </div> </div>';


                    $('#donate-cards-t').append(txt);
                }
                $('#preloader').css('display', 'none');
                //j = i;
            }

        }

    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });

}


    //Edit user data and getting data using button 