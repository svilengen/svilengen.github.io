

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

var theUrl = "https://script.google.com/macros/s/AKfycbzA5eUscvhx4vA-rkFtuuPmWfASmx5YzZV0sr5EVyWH7l5-Kqx0RDo_AA/exec";

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

        $.each(data, function (index, scheduleEntry) {
            var name = scheduleEntry['name'];
            var description = scheduleEntry['description'];
            var price = scheduleEntry['price'];
            var pic = scheduleEntry['pic'];
            var pic2 = scheduleEntry['pic2'];
            var pic3 = scheduleEntry['pic3'];
            var pic4 = scheduleEntry['pic4'];
            var bcgrColor = 'black';
            html += '<div class="card bg-dark card-shadow">';
            

            html += '<a href="#" data-toggle="modal" data-target="#exampleModal" data-name="' + name + '" data-picture="' + pic + '" data-pic2="' + pic2 + '" data-pic3="' + pic3 + '" data-pic4="' + pic4 + '">';
            html += '<img src="' + pic + '" alt="' + name + '" class="card-img-top"></img>';
            html += '</a>';
            html += '<div class="card-body">';
            html += '<h5 class="card-title">';
            html += name;
            html += '</h5>';
            html += '<hr class="dotted-hr"/>';
            html += '<p class="card-price">';
            html += price + ' лв';
            html += '</p>';
            html += '<hr class="dotted-hr"/>';
            html += '<p class="card-text">';
            html += description;
            html += '</p>';
            html += '</div>';

            html += '</div>';
        });
        $('#content').append(html);

    }
});

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var name = button.data('name') // Extract info from data-* attributes
    var picture = button.data('picture')   
    var pic2 = button.data('pic2')
    var pic3 = button.data('pic3')
    var pic4 = button.data('pic4')
    

    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)    
    modal.find("#Picture").attr("src", picture);
    modal.find("#Picture_thumb").attr("src", picture);
    modal.find("#Picture_thumb").addClass("clothingImageModalActiveThumb");
    modal.find("#Pic2").attr("src", pic2);
    modal.find("#Pic3").attr("src", pic3);
    modal.find("#Pic4").attr("src", pic4);
})

