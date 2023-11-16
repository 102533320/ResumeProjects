/**********************************************
Project     : PHP-SRePS
Date Created: 22/09/2021
Description : js function file for PHP-SReP.
            : general purpose functions. 
contributor : Justin Santoso
**********************************************/

function displayNotification(){
    $('.toast').toast('show');
}

function displayItems(){
    $('#displayItems').Tabledit({
        url: 'scripts/handlers/itemHandler.php',
        columns: {
            identifier: [0, 'itemID'],
            editable: [
                [1, 'itemName'],
                [2, 'itemPrice'],
                [3, 'itemTotal']
            ]
        }, 
        restoreButton: false,
        onSuccess: function (data, textStatus, jqXHR) {
            if (data.action == "delete") {
                $("#" + data.id).remove();
                $("#displayItems").DataTable().ajax.reload();
            }
        },
    });
}

$(document).ready(function(){
    displayNotification();

    $('#searchItem').keyup(function(){
        var searchItem = $('#searchItem').val();

        $.post('scripts/handlers/searchHandler.php', {searchName : searchItem}, function(data){
            $('#searchResult').html(data);
            displayItems();
        });
    });

    displayItems();
});
