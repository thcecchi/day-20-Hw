var templates = {};

templates.toDoList = [
"<div class='listItemCard large-12 columns end' data-itemid='<%= _id %>'>",
"<h5 class='listItem'><%= listItemText %></h5>",
"<i class='fa fa-check-square'></i>",
"<i class='fa fa-times'></i>",
"<button class='large-1 columns update' name='update'>Update</button>",
"</div>"
].join("")
