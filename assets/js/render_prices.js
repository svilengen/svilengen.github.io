

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

var theUrl = "https://script.google.com/macros/s/AKfycbwHAwGpRWQk4N_MzbCkJ7u1S6ki3D7SAfNp1KjuNGpxbd1kAyBi1_NmKQ/exec";

var locationParameter = getUrlVars()["location"];
if (typeof locationParameter !== "undefined" && (typeof locationParameter !== "object" || !locationParameter)) {
    theUrl += '?location=' + locationParameter;
}

// var theUrl = "test/data.js";

$.ajax({
    type: "GET",
    url: theUrl,
    dataType: "text",
    success: function (response) {
        eval(response);
        var html = '';
        var count = 0;

        $.each(data, function (index, scheduleEntry) {
            ++count;
            console.log(count);
            var name = scheduleEntry['name'];
            var price = scheduleEntry['price'];
            var bcgrColor = 'black';
            if (count % 2 == 0) {
                bcgrColor = 'grey';
            }
            html += '<div class="row" style="background-color: ' + bcgrColor + ';">';
            if (price != '') {
                html += '<div class="col-sm item-name-col">';
                html += name;
                html += '</div>';
                html += '<div class="col-sm item-price-col">';
                html += price;
                html += '<span style="font-size: initial;"> &nbsp;лв</span>';                
                html += '</div>';
            } else {
                html += '<div class="col-sm item-header">';
                html += '<h1>';
                html += name;
                html += '</h1>';
                html += '</div>';                
            }

            html += '</div>';
        });
        $('#content').append(html);

    }
});

