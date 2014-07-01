/**
 * Created by snirr on 24/06/14.
 */


var meetupData,
    meetupGuests,
    changePages,
    serverAddress = "http://192.168.137.21:555",
    guestsList = [], setPaddingFunction;

setPaddingFunction = function () {
        $('#guestList').css({'padding' : '0px'});
      setPadding = $('#guestList').width() % ($('#guestList .guestElement').width() + 6);
        $('#guestList').css({'padding' : '0px ' + (setPadding / 2) + 'px'});

};
changePages =function(pageId, effect) {
    $.mobile.changePage(pageId, effect);
};

$('#splashPage').ready(function(){
    $(function() {
        $.get( serverAddress + "/getMeetup", function( data ) {
            if (typeof data == 'string' || data instanceof String) {
                meetupData = JSON.parse(data);
            } else {
                meetupData = (data);
            }
            changePages("#home", "fade");
        });

    });
});



$('#home').ready(function(){
    $("#showGuests").click(function (e) {
        $(function() {
            $.get( serverAddress + "/getGuests", function( data ) {

                if (typeof data == 'string' || data instanceof String) {
                    meetupGuests = JSON.parse(data);
                } else {
                    meetupGuests = (data);
                }

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
    var guestsPage = $('#guestList'),
        newBoxSize, setPadding;

    $.each(meetupGuests.results, function(i)
    {
        var imageSrc = (meetupGuests.results[i].member_photo && meetupGuests.results[i].member_photo.thumb_link) ?
                            meetupGuests.results[i].member_photo.thumb_link : "images/avatar.jpg";
        var petek =
            "<div class='guestElement'>" +
                /*"<div class='guestOuter'>" +*/
                    "<div class='guestMiddle'>" +
                        "<div class='guestInner'>" +
                            "<div class='guestInnerElement'>" +
                                "<img class='guestImg' src='" +
                                imageSrc +
                                "'>" +
                            "</div>" +
                            "<div class='guestInnerElement guestName'>" +
                                
                                    meetupGuests.results[i].member.name +
                                
                            "</div>" +
                        "</div>" +
                    "</div>" +
                /*"</div>" +*/

            "</div>";
        if (meetupGuests.results[i].member_photo && meetupGuests.results[i].member_photo.thumb_link) {
            guestsPage.prepend(petek);
        } else {
            guestsPage.append(petek);
        }


       
        
    });


    

    guestsList = $(".guestElement");

    if (($('#guestList').width() - ($('#guestList').width() % $('#guestList .guestElement').width())) / $('#guestList .guestElement').width()  < 4) { 
        newBoxSize = $('#guestList').width() / 4;
        console.log(newBoxSize);
        $('.guestElement').width(newBoxSize).height(newBoxSize);
        $('.guestImg').width(newBoxSize).height(newBoxSize);
        $('.guestName').css({ 'font-size': '10px' });

    }


     setPaddingFunction();
});


$( window ).resize(function() {
    // setTimeout(function(){
setPaddingFunction();
        if (($('#guestList').width() - ($('#guestList').width() % $('#guestList .guestElement').width())) / $('#guestList .guestElement').width()  < 4) { 
            newBoxSize = $('#guestList').width() / 4;
            console.log(newBoxSize);
            $('.guestElement').width(newBoxSize).height(newBoxSize);
            $('.guestImg').width(newBoxSize).height(newBoxSize);
            $('.guestName').css({ 'font-size': '10px' });


        }
    // }, 500);
    


});
