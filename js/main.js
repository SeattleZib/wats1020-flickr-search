// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready',function(){
  var searchImages = function(tags){
    // Call Flicker API //
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    console.log(tags);
    $('#images').innerHTML = '<li class="search-throbber"<Finding...</li>';
    // Searches for images based on user input/tags //
    $.getJSON(flickrAPI, {
      tags: tags,
      tagMode: "any",
      format: "json"
      // Function complete //
     }).done(function( data ){
      $('#images').empty();
      $('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
      $.each(data.items, function(i, item){
        var newListItem = $("<li>")
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
        
// Button //
        var newButton = $("<button class='btn btn-sm btn-primary'>More Information</button>").attr({
          'data-title': item.title,
          'data-toggle': "modal",
          'data-target': "#infoModal",
          'data-imgsrc': item.media.m,
          'data-description': item.description,
          'type': "button"
        }).appendTo(newListItem);
        newListItem.appendTo("#images");
        if(i === 60) {
          return false;
        }
      });
  });
  };
                    
  // Search Button //
     $('button.search').on('click',function(event){
      event.preventDefault();
      var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
      console.log(searchTextInput);
      searchImages(searchTextInput.value);
    });
  //Modal Button //
    $('#infoModal').on('show.bs.modal',function(event){
      var button = $(event.relatedTarget);  //Button that triggered the modal //
      var title = button.data('title');  //Extract info from data-* attributes //
      var imgSrc = button.data('imgsrc');
      var imageDescription = button.data('description');
      
      //Update the modal's content //
      var modal = $(this);
      modal.find('.modal-title').html(title);
      var modalBody = modal.find('.modal-body');
      modalBody.empty();
      var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
    });
    });
  
  
  
  
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.

    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.

    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target