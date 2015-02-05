var templates = {};

templates.toDoList = [
"<div class='listItemCard' data-itemid='<%= _id %>'>",
// "<i><%= check =></i>",
// "<div class='listName'>",
"<h3 class='listItem'><%= listItemText %></h3>",
// "</div>",
// "<i class='ex'><%= check =></i>",
"</div>"
].join("")
