

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

var datasource = "/datasource/" + locationParameter + "/schedule.json";

$.getJSON(datasource ,function( data ) {
    var html = '';
    $.each(data, function (index, scheduleEntry) {
        var dayOfWeek = scheduleEntry[0];
        html += '<div class="col" style="margin: 5px; padding: 0px !important;">';
        html += '<h6 class="text-center">';
        html += dayOfWeek;
        html += '</h6>';
        $.each(scheduleEntry[1], function (index, entry) {
            var time = entry.Time;
            var timeOfDayIconClass = "fas fa-sun";
            var hours = time.split(":")[0];
            if (hours > 16) {                    
                timeOfDayIconClass ="fas fa-moon";
            } 

            var color = entry.Color;
            var sport = entry.Sport;
            var name = entry.Name;
            var encodedName = encodeURIComponent(name);
            var encodedDescription = encodeURIComponent(entry.Description);
            var video = entry.Video;
            var picture = entry.Picture;

            var cardClass = 'text-center card-shadow rounded mt-3 card-select-class';
            if (index % 2 == 0) {
                cardClass += ' card bg-dark';
            } else {
                cardClass += ' card-dark';
            }
            html += '<div class="' + cardClass + '" name="' + sport.replace(/\s+/g, '') + '">';
            html += '<div style="display: flex; padding: 2px;" class="align-items-center">';
            html += '<div class="text-nowrap schedule-card-time">';
            html += time;
            html += '</div>';
            html += '<i class="'+ timeOfDayIconClass + '"></i>';
            html += '<div class="schedule-card-text">';
            html += '<a data-toggle="modal" href="#exampleModal" data-name="' + sport + '" data-picture="' + picture + '" data-video="' + video + '" data-description="' + encodedDescription + '" data-trainerName="' + name + '">';
            html += sport;
            html += '</a>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

        });
        html += '</div>';
    });

    $('#content').append(html);

    // Get the container element
    var btnContainer = document.getElementById("content");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("card-select-class");


    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) {
            var shouldDeactivateAll = e.currentTarget.classList.contains("activeCard");
            
            // cleanup first
            var btns = btnContainer.getElementsByClassName("card-select-class");
            for (var i = 0; i < btns.length; i++) {
                btns[i].classList.remove("activeCard");
            }

            if (!shouldDeactivateAll) {
                // add the new style
                var x = document.getElementsByName(this.getAttribute("name"));
                for (var j = 0; j < x.length; j++) {
                    x[j].classList.add("activeCard");
                }
            }

        });
    }
  });


$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var name = button.data('name') // Extract info from data-* attributes
    var picture = button.data('picture')
    var video = button.data('video')
    var description = button.data('description')
    var trainerName = button.data('trainername')



    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find("#Video").attr("src", video + '?controls=0&amp;start=1');
    modal.find("#Picture").attr("src", picture);
    modal.find("#Description").text(decodeURIComponent(description));
    modal.find("#Name h4").html(decodeURIComponent(name));
    modal.find("#TrainerName").html(decodeURIComponent(trainerName));

})
