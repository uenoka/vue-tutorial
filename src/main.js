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
        'nodes': [
            {
                'text': 'カバの樹',
                'url': 'https://www.kabanoki.net',
                'fx': 10,
                'fy': 10,
                'nodes': [
                ],
                'category': 'Blog'
            },
            {
                'text': 'カテゴリー｜カバの樹',
                'url': 'https://www.kabanoki.net',
                'fx': -100,
                'fy': 100,
                'nodes': [
                    {
                        'text': 'vue.js',
                        'url': 'https://www.kabanoki.net/category/vue-js/',
                        'fx': 176.083777747024,
                        'fy': -665.1641376795345,
                        'nodes': [],
                        'category': 'blog category vue',
                        'color': 'rgba(255, 189, 10, 1.0)'
                    },
                    {
                        'text': 'wordpress',
                        'url': 'https://www.kabanoki.net/category/wordpress/',
                        'fx': 176.083777747024,
                        'fy': -665.1641376795345,
                        'nodes': [],
                        'category': 'blog category vue',
                        'color': 'rgba(255, 189, 10, 1.0)'
                    },
                    {
                        'text': 'codeigniter',
                        'url': 'https://www.kabanoki.net/category/codeigniter/',
                        'fx': 176.083777747024,
                        'fy': -665.1641376795345,
                        'nodes': [],
                        'category': 'blog category vue',
                        'color': 'rgba(255, 189, 10, 1.0)'
                    },
                ],
                'category': 'Blog'
            },
            {
                'text': '7月|カバの樹',
                'url': 'https://www.kabanoki.net/date/2019/07/',
                'fx': 450,
                'fy': 100,
                'nodes': [],
                 
                'category': 'Blog'
            },
        ],
        'connections': [
            {
                'source': 'カバの樹',
                'target': 'カテゴリー｜カバの樹',
                'curve': {
                'x': 10,
                'y': 10
                }
            },
            {
                'source': 'カバの樹',
                'target': '7月|カバの樹',
                'curve': {
                'x': 10,
                'y': 10
                }
            },
        ]
    },
    methods:{
        doAdd: function(event,value){
            var comment = this.$refs.comment
            if(!comment.value.length) {
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            comment.value = ''
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

