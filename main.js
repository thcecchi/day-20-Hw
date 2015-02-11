$(document).ready(function () {
  toDoList.init();
});

  var toDoList = {

    config: {
      url: "http://tiy-fee-rest.herokuapp.com/collections/tyler"
    },

    init: function () {
      toDoList.initStyle();
      toDoList.initEvents();
    },

    initStyle: function () {
      toDoList.renderAllListItems();
      $('.completedTitle').hide()

      completedArray=[]

      // click check mark and move to completed tasks ///
     //////////////////////////////////////////////
     $('.container').on('click', '.fa-check-square', function (e) {
       e.preventDefault

       // show completed container if it contains a completed item ///
      ///////////////////////////////////////////////////////////////
      if ( $('.completed').has('.listItemCard') ) {
        $('.completedTitle').show()
      }

      else {
        $('.completedTitle').hide()
      }

      var detachedItem = $(this).parent('.listItemCard').detach();
      detachedItem.appendTo('.completed').css('border', '2px dashed gainsboro');
      $(this).siblings('.fa').css('color', 'black')
      $(this).css('color', 'black')

       // push completed task itemid to array ///
      //////////////////////////////////////////
       completedArray.push($(this).parent('.listItemCard').data('itemid'))
       console.log(completedArray)

      //  // set up ajax request to add key "completed" ///
      // /////////////////////////////////////////////////
      var itemId = $(this).closest('.listItemCard').data('itemid');

      var addedListItem = {
        completed: "Y"
      }

      toDoList.addedListItem(itemId, addedListItem);
      // toDoList.renderAllListItems();


       // count number of completed tasks ///
      //////////////////////////////////////

      var completedCount = parseInt($(".completed > .listItemCard").length)

      function completeNum(e){
        completedCount ++;

        document.getElementById('completedCount').innerHTML = completedCount-1;
        return true
      }

      completeNum()

    });

    },

    initEvents: function () {

      // Take input and add a list item ////
      /////////////////////////////////////
      $('.wrapper').on('click', '.add', function (event) {
        event.preventDefault();

        var newListItem = {
          listItemText: $('.enterListItem').val()
        }

        $(this).find('.listItemCard').addClass("fadeIn")

        toDoList.createListItem(newListItem);

      });

      // Delete current ////
      /////////////////////
      $('.wrapper').on('click', '.fa-times', function (event) {
        event.preventDefault();

        var itemId = $(this).closest('.listItemCard').data('itemid');
        console.log(itemId);
        toDoList.deleteListItem(itemId);
        $(this).closest('.listItemCard').remove()

        // show completed container if it contains a completed item ///
       ///////////////////////////////////////////////////////////////
        var completedCount = parseInt($(".completed > .listItemCard").length)
        console.log(completedCount)

        function completeNum(e){
          completedCount ++;

          document.getElementById('completedCount').innerHTML = completedCount-1;
          return true
        }

        completeNum()

        // show completed container if it contains a completed item ///
       ///////////////////////////////////////////////////////////////
       if ( $('.completed').has('.listItemCard') ) {
         $('.completedTitle').show()
       }

       else {
         $('.completedTitle').hide()
       }
      });

      // Update current ////
      /////////////////////
      $('.wrapper').on('dblclick', '.listItem', function (event) {
        event.preventDefault();

        // replace text with input and add update button ////
        ////////////////////////////////////////////////////
        $(this).closest('.listItem').replaceWith('<input type="text" class="updateListItem" name="updateListItem"</input>');

        $('input').siblings('.update').show()
      });

      $('.wrapper').on('click', '.update', function (event) {
        event.preventDefault();

        var itemId = $('.updateListItem').closest('.listItemCard').data('itemid');

        var editedListItem = {
          listItemText: $('.updateListItem').val()
        }

        toDoList.updateListItem(itemId, editedListItem);

      });

    },

    render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);

      $el.append(template);

    },

    renderAllListItems: function () {
      $.ajax({
        url: toDoList.config.url,
        type: 'GET',
        success: function (items) {
          $('.listItemCard').detach()

          var compiledTemplate = _.template(templates.toDoList);
          // $('.container').append(compiledTemplate)

          var markup = "";
          items.forEach(function (item, idx, arr) {
            markup += compiledTemplate(item);
          });

          newArr = []

          // push each data object to array ///
          ////////////////////////////////////
          items.forEach(function(item, idx, arr) {
            newArr.push(item)
          })
          console.log(newArr)

          console.log('markup is.....', markup);
          $('.container').html(markup);

          newItemIdArr = []

          newArr.forEach(function(currentValue, index, array) {
            if (_.has(currentValue, "completed")) {
              console.log(true)
              var newItemId = currentValue._id
              newItemIdArr.push(newItemId)
            }
          })

          newItemIdArr.forEach(function (currentValue, index, aray) {

            $('.listItemCard').each( function (index) {

                if ($(this).data('itemid') == currentValue) {

                  $(this).detach()
                  $(this).appendTo('.completed').css('border', '2px dashed gainsboro')
                  $(this).find('.fa').css('color', 'black')
                }
              })
            })

        },

        error: function (err) {
          console.log(err);
        }

      });

    },

    createListItem: function (items) {

      $.ajax({
        url: toDoList.config.url,
        data: items,
        type: 'POST',
        success: function (data) {
          console.log(data);
          toDoList.renderAllListItems()
        },

        error: function (err) {
          console.log(err);
        }

      });
    },

    deleteListItem: function (id) {

      $.ajax({
        url: toDoList.config.url + '/' + id,
        type: 'DELETE',
        success: function (data) {
          console.log(data);
          // toDoList.renderAllListItems();
        },
        error: function (err) {
          console.log(err);
        }
      });

    },

    updateListItem: function (id, items) {

        $.ajax({
          url: toDoList.config.url + '/' + id,
          data: items,
          type: 'PUT',
          success: function (data) {
            console.log(data);
            toDoList.renderAllListItems();
          },
          error: function (err) {
            console.log(err);
          }
        });
    },

    addedListItem: function (id, items) {

        $.ajax({
          url: toDoList.config.url + '/' + id,
          data: items,
          type: 'PUT',
          success: function (data) {
            _.extend(id, data)
          },
          error: function (err) {
            console.log(err);
          }
        });
    }

  }
