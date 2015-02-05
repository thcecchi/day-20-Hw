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
      $('.wrapper').on('click', '.delete', function (event) {
        event.preventDefault();

        var itemId = $('.listItemCard').data('itemid');
        console.log(itemId);
        toDoList.deleteListItem(itemId);
      });

      // Update current ////
      /////////////////////
      $('.wrapper').on('dblclick', '.listItem', function (event) {
        event.preventDefault();

        $('.listItem').replaceWith('<input type="text" class="updateListItem" name="updateListItem"> value="<%= listItemText %>"');

        var itemId = $('.listItemCard').data('itemid');

        // var editedListItem = {
        //   listItemText: $('.updateListItem').val()
        // }

        // toDoList.updateListItem(itemId, editedListItem);

      });

      $('.wrapper').on('click', '.update', function (event) {
        event.preventDefault();

        var itemId = $('.listItemCard').data('itemid');

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
          // $('.container').append(compiledTemplate);

          var markup = "";
          items.forEach(function (item, idx, arr) {
            markup += compiledTemplate(item);
          });
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
    }

  }
