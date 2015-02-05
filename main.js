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

    },

    initEvents: function () {
      // Take input and add a list item
      var add = $('.add').on('click', function (event) {
        event.preventDefault();

        var inputText = $('input').val();

        var newListItem = {
          listItemText: inputText
        }

        toDoList.createListItem(newListItem);

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

          var template = _.template($('#itemTmpl').html());
          var markup = "";
          items.forEach(function (item, idx, arr) {
            markup += template(item);
          });
          console.log('markup is.....', markup);
          $('section').html(markup);
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

      // $.ajax({
      //   url: toDoList.config.url + '/' + id,
      //   type: 'DELETE',
      //   success: function (data) {
      //     console.log(data);
      //     toDoList.renderAllListItems();
      //   },
      //   error: function (err) {
      //     console.log(err);
      //   }
      // });

    },

    updateListItem: function (id, items) {

        // $.ajax({
        //   url: toDoList.config.url + '/' + id,
        //   data: items,
        //   type: 'PUT',
        //   success: function (data) {
        //     console.log(data);
        //     toDoList.renderAllListItems();
        //   },
        //   error: function (err) {
        //     console.log(err);
        //   }
        // });
    }

  }
