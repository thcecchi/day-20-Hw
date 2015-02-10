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

        // replace text iwth input and add update button ////
        ////////////////////////////////////////////////////
        $(this).closest('.listItem').replaceWith('<input type="text" class="updateListItem" name="updateListItem"</input>');

        $('button.update').show()
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

          var compiledTemplate = _.template(templates.toDoList);
          // $('.container').append(compiledTemplate)

          var markup = "";
          items.forEach(function (item, idx, arr) {
            markup += compiledTemplate(item);
          });
          newArr = []
          items.forEach(function(item, idx, arr) {
              // if (_.has(item, "completed")==true) {
              //   item.detach();
              //   item.appendTo('.completed').css('border', '2px dashed gainsboro');
              // }
            newArr.push(item)
            console.log(newArr)
          })

          _.each(newArr, function (element, index, list) {
            if (_.has(element, "completed")) {
              element[index].detach();
              element[index].appendTo('.completed').css('border', '2px dashed gainsboro');
            }
          })



          console.log('markup is.....', markup);
          $('.container').html(markup);
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
          toDoList.renderAllListItems();
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
          toDoList.renderAllListItems();
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
