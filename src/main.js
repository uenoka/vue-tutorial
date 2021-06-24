var STRRAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
    fetch: function(){
        var todos = JSON.parse(
            localStorag.getItem(STRRAGE_KEY)||'[]'
        )
        todos.forEach(
            function(todo, index){
                todo.id = index
            })
            todoStorage.uid = todos.length
            return todos
    },
    save: function(todos){
        localStorage.setItem(STRRAGE_KEY,JSON.stringify(todos))
    }
}
const app = new Vue({
    el:'#app',
    data:{
        todos:[
            { "id": 1, "comment": "新しいToDo1", "state": 3 },
            { "id": 2, "comment": "新しいToDo2", "state": 0 }          
        ],
    },
    methods:{}
})
