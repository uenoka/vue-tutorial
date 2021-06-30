var STRRAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
    fetch: function(){
        var todos = JSON.parse(
            localStorage.getItem(STRRAGE_KEY)||'[]'
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
Vue.use(VueMindmap)
const app = new Vue({
    el:'#app',
    data:{
        nodes: [
            {
                'text': 'root',
                'fx': 10,
                'fy': 10,
            }
        ],
        connections: []

    },
    methods:{
        doAdd: function(event,value){
            var text = this.$refs.text
            if (!text.value.length) {
                return
            }
            this.nodes.push({
                'text': text.value,
                'fx': 10,
                'fy' : 10,
            })
            this.connections.push({
                'source': 'root',
                'target': text.value,
                'curve': {
                    'x': 10,
                    'y': 10
                }
            })
            Vue.set(app.nodes)
            Vue.set(app.connections)
            text.value = ''
        },
        doChangeState: function(item){
            item.state = item.state ? 0 : 1
        },
        doRemove: function(item){
            var index = this.todos.indexOf(item)
            this.todos.splice(index,1)
        }
    },
    computed:{
        labels(){
            return this.options.reduce(function(a,b){
                return Object.assign(a,{[b.value]:b.label})
            },{})
        },
        computedTodos:function(){
            return this.todos.filter(function(el){
                return this.current<0 ? true : this.current === el.state
            },this)
        }
    },
    watch: {
        todos: {
            handler: function(todos){
                todoStorage.save(todos)
            },
            deep: true
        }
    },
    created(){
        this.todos = todoStorage.fetch()
    }
})

