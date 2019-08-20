$(document).ready(function(){
    $("#submit-button").on('click', function(){
        var player = $("#user-input").val();
        var firstname = player.substring(0, player.indexOf(" "));
        var lastname = player.substring(player.indexOf(" ") + 1, player.length + 1);

        let url = `/compare/${firstname}-${lastname}`;

        var comparisonPlayer = $.ajax({
            url: url,
            type: 'GET',
            success: function(result){
                console.log(result);
            },
            error: function(err){
                console.log('Error: ' + err);
            }
        })
    
        var mikeTroutCall = $.ajax({
            url: '/compare/mike-trout',
            type: 'GET',
            success: function(result){
                console.log(result);
            },
            error: function(err){
                console.log('Error: ' + err);
            }
        })

        $.when(comparisonPlayer, mikeTroutCall).done(function(r1, r2) {
            console.log(r1);
            console.log(r2);
        });
    });
});