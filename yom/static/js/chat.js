$(document).ready(function () {

    $('.panel-heading a').parents('.panel').find('.panel-body').slideUp();
    $('.panel-heading a').addClass('panel-collapsed');
    $('.panel-heading a').text("+");
    $(".inputBottom").hide();

    $(document).on('click', '.panel-heading a', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.text("+");
            $(".inputBottom").hide();
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.text("-");
            $(".inputBottom").show();
        }
    });
    
    var NS = {};

	var put_text = function(bot_say) {
    	if(bot_say["responseJSON"].errorCode)
    	{
    	    result = bot_say["responseJSON"].description;
    	}
    	else if (bot_say["responseJSON"].output)
    	{
    	     result = bot_say["responseJSON"].output;
    	}
    	else
    	{
    	    result = "Network error"
    	}

		html_data = '<div class="clearfix"><blockquote class="you pull-left">'+result+'</blockquote></div>'
		$(".panel-body").append(html_data);
	};

	var send_req = function() {
		var userQuery = $("#userSay").val();
		$("#userSay").val("");
		$.support.cors = true;
		$.ajax({
			method: 'POST',
			url: 'http://172.30.10.141:8092/renderChat',
			data: {
                userId: parent.frames[0].$("#userID").val(),
				userQuery: userQuery
			},
            beforeSend: function() {
                $('.typing').show();
            },
            complete: function(data) {
				put_text(data);
                $('.typing').hide();
                scrollToBottom();
			}
		});
		return true;
	};

	$('#userSay').keydown(function(e) {
		if (e.keyCode == 13)
		{
            var userQuery = $("#userSay").val();
		    html_data = '<div class="clearfix"><blockquote class="me pull-right">'+userQuery+'</blockquote></div>'
            $(".panel-body").append(html_data);
			send_req();
		}
	});

	function scrollToBottom() {
        $(".panel-body")[0].scrollTop = $(".panel-body")[0].scrollHeight;
    }

    
/*    socket = io.connect('http://10.45.0.172:4000', {
    transports: ['polling']
    });



    socket.on(parent.frames[0].document.getElementById("#userID").val(), function(msg) {
        if (!$('.panel-heading a').hasClass('panel-collapsed')) {    
            $('.panel-heading a').parents('.panel').find('.panel-body').slideDown();
            $('.panel-heading a').removeClass('panel-collapsed');
            $('.panel-heading a').text("-");
            $(".inputBottom").show();
        }
        html_data = '<div class="clearfix"><blockquote class="you pull-left">'+msg+'</blockquote></div>'
        $(".panel-body").append(html_data);
    });*/


});