

    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var theUrl = "https://script.google.com/macros/s/AKfycbx1KkxeGTRLjobSQb202PM1ecSjD738ixJGMOWhMZD-JUX6-lM8/exec";

    var locationParameter = getUrlVars()["location"];
    if (typeof locationParameter !== "undefined" && (typeof locationParameter !== "object" || !locationParameter)) {
      theUrl += '?location=' + locationParameter;
    }     

    // var theUrl = "test/data.js";

    $.ajax({
        type: "GET",
        url: theUrl,
        dataType: "text",
        success: function(response) {
            eval(response);
            var html = '';
            $.each(data, function(index, scheduleEntry) {
                var dayOfWeek = scheduleEntry[0];
                html += '<div class="col mb-4">';
                // html += '<h5 style="text-align:center;background-color: transparent;">';
                html += dayOfWeek;
                // html += '</h5>';
                $.each(scheduleEntry[1], function(index, entry) {
                    var time = entry.Time;
                    var color = entry.Color;
                    var sport = entry.Sport;
                    var name = entry.Name;
                    var encodedName = encodeURIComponent(name);
                    var encodedDescription = encodeURIComponent(entry.Description);
                    var video = entry.Video;
                    var picture = entry.Picture;


                    var cardClass = 'card-dark text-center card-shadow rounded mt-2 card-select-class';
                    if (index % 2 == 0) {
                        cardClass = 'card bg-dark text-center card-shadow rounded mt-2 card-select-class';
                    }
                    html += '<div class="' + cardClass + '" name="' + sport.replace(/\s+/g, '') + '">';
                    html +=     '<div class="card-body p-1">';
                    html +=         '<h6 class="card-title">';
                    html +=             time;
                    html +=         '</h6>';
                    html +=         '<p class="card-text">'                    
                    html +=             sport;
                    html +=         '</p>';                                    
                    html +=         '<button  type="button" class="btn btn-outline-light" data-toggle="modal" data-target="#exampleModal" data-name="' + name + '" data-picture="' + picture + '" data-video="' + video + '" data-description="' + encodedDescription + '">';
                    html +=             name;
                    html +=         '</button>';
                    html +=     '</div>';
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
                btns[i].addEventListener("click", function(e) {


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


        }
    });

    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var name = button.data('name') // Extract info from data-* attributes
        var picture = button.data('picture')
        var video = button.data('video')
        var description = button.data('description') 
        
        
    
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find("#Video").attr("src", video + '?controls=0&amp;start=1');
        modal.find("#Picture").attr("src", picture);
        modal.find("#Description").text(decodeURIComponent(description));
        modal.find("#Name h4").html(decodeURIComponent(name));
        
      })
