

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var datasource = "/datasource/prices.json";

$.getJSON(datasource ,function( data ) {    
        var html = '';
        var count = 0;
        $.each(data, function (index, scheduleEntry) {
            ++count;            
            var name = scheduleEntry['name'];
            var price = scheduleEntry['price'];
            var bcgrColor = 'black';
            if (count % 2 == 0) {
                bcgrColor = 'grey';
            }
            html += '<div class="row" style="padding-left:10px; background-color: ' + bcgrColor + ';">';
            if (price != '') {
                html += '<div class="col-sm-10 item-name-col">';
                html += name;
                html += '</div>';
                html += '<div class="col-sm-2 item-price-col">';
                html += price;
                html += '<span>&nbsp;лв</span>';                
                html += '</div>';
            } else {
                html += '<h3 class="col-sm item-header">';
                html += name;
                html += '</h3>';                
            }

            html += '</div>';
        });
        $('#content').append(html);

    });


