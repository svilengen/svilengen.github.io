

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



var datasource = "/datasource/trainers.json";

$.getJSON(datasource ,function( data ) {
    var html = '';
    $.each(data, function (index, scheduleEntry) {
        var name = scheduleEntry['name'];
        var description = scheduleEntry['description'];            
        var pic = scheduleEntry['pic'];
        var bcgrColor = 'black';
        html += '<div class="card bg-dark card-shadow">';
        html += '<a href="#" data-toggle="modal" data-target="#exampleModal" data-name="' + name + '" data-picture="' + pic + '">';
        html += '<img src="' + pic + '" alt="' + name + '" class="card-img-top"></img>';
        html += '</a>';
        html += '<div class="card-body">';
        html += '<h6 class="card-title">';
        html += name;
        html += '</h6>';
        html += '<hr class="dotted-hr"/>';
        html += '<p class="card-text">';
        html += description;
        html += '</p>';
        html += '</div>';

        html += '</div>';
    });
    $('#content').append(html);

});

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var name = button.data('name') // Extract info from data-* attributes
    var picture = button.data('picture')   
    

    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)    
    modal.find("#Picture").attr("src", picture);
})

