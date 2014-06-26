/**
 * Created by snirr on 24/06/14.
 */


var meetupData,
    meetupGuests,
    changePages,
    guestsList = [];

changePages =function(pageId, effect) {
    $.mobile.changePage(pageId, effect);
}

$('#splashPage').ready(function(){
    $(function() {
        $.get( "/getMeetup", function( data ) {
            meetupData = JSON.parse(data);
            console.log(meetupData);
            changePages("#home", "fade");
        });

    });
});



$('#home').ready(function(){
    $("#showGuests").click(function (e) {
        $(function() {
            $.get( "/getGuests", function( data ) {
                meetupGuests = JSON.parse(data);
                changePages("#guestsPage", "fade");
            });

        });

    });
});


$('#guestsPage').ready(function(){
    $('body').on('click', '.guestElement', function() {
        if ($(this).hasClass('selectedGuest') ||
            $(this).hasClass('selectedGuestOld')) {
            $(this).removeClass('selectedGuest');
            $(this).removeClass('selectedGuestOld');
        } else {
            $(this).addClass('selectedGuest');
        }

    });


    $('body').on('keyup', '#searchguest', function() {
        $(".guestElement").hide();
        guestsList.filter(function(index) {
            var regex = new RegExp( $("#searchguest").val(), "gi");

            if ($(this).hasClass('selectedGuest')) {
                $(this).removeClass('selectedGuest');
                $(this).addClass('selectedGuestOld');
            }


            if (regex.test($(this).text())) {
                return true;
            } else {
                return false;
            }
        }).show();

    });

});


$(document).on("pageshow","#home",function(){
    $('#headerApp').val(meetupData.results[0].name);
    $('#contentEvent').html(meetupData.results[0].description);
});

$(document).on("pageshow","#guestsPage",function(){
    var guestsPage = $('#guestList');

    $.each(meetupGuests.results, function(i)
    {
        var imageSrc = (meetupGuests.results[i].member_photo && meetupGuests.results[i].member_photo.thumb_link) ?
                            meetupGuests.results[i].member_photo.thumb_link : "images/avatar.jpg";
        var petek =
            "<div class='guestElement'>" +
                "<div class='deviceOuter'>" +
                    "<div class='deviceMiddle'>" +
                        "<div class='deviceInner'>" +
                            "<div class='deviceInnerElement'>" +
                                "<img class='guestImg' src='" +
                                imageSrc +
                                "'>" +
                            "</div>" +
                            "<div class='deviceInnerElement'>" +
                                "<span class='guestName'>" +
                                    meetupGuests.results[i].member.name +
                                "</span>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";

        guestsPage.append(petek);
    });

    guestsList = $(".guestElement");
});