
class TodoService {
    constructor({todoRespository}) {
        this.todoRespository = todoRespository;
    }
    
    create (todoItem) {

    }

    list(query) {
        const [{ meta, $loki, ...expected }] = this.todoRespository.list();
        return result;
    }
}

module.exports = TodoService;