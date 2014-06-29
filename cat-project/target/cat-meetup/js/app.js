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
    debugger;
//    $(function() {
//        $.get( "http://localhost:555/getMeetup", function( data ) {
//            meetupData = JSON.parse(data);
//            debugger;
//            changePages("#home", "fade");
//        });
//
//    });
});



$('#home').ready(function(){
    $("#showGuests").click(function (e) {
        $(function() {
            $.get( "http://localhost:555/getGuests", function( data ) {
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
                "<div class='guestOuter'>" +
                    "<div class='guestMiddle'>" +
                        "<div class='guestInner'>" +
                            "<div class='guestInnerElement'>" +
                                "<img class='guestImg' src='" +
                                imageSrc +
                                "'>" +
                            "</div>" +
                            "<div class='guestInnerElement'>" +
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