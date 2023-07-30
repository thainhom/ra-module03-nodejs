import getNextId from "../utilities/getNextId.js";
let todoapps = [
    {
        id: 1,
        title: 'đá bóng',
        completed: false,
    }, {
        id: 2,
        title: 'chơi game',
        completed: false,
    },
    {
        id: 3,
        title: 'xem phim',
        completed: false,
    },



]
const searchtodoapps = (req, res) => {
    res.render('pages/todolist/index', {
        todoapps: todoapps
    })

}
const viewAddtodoapps = (req, res) => {

}
const addtodoapps = (req, res) => {
    const body = req.body;
    const newtodo = {
        ...body,
        id: getNextId(todoapps)
    }
    todoapps.push(newtodo);
    res.redirect('/todoapps');



}
const getDetailtodoapps = (req, res) => {

}

const viewEdittodoapps = (req, res) => {
    const { id } = req.params;
    const todoapp = todoapps.find(todoapp => todoapp.id == id);
    if (todoapp) {
        res.render('pages/todolist/edit', {
            todoapp: todoapp
        });
    } else {
        res.render('logs/404', {
            msg: 'công việc chưa được triển khai'
        });
    }

}
const updatetodoapps = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    todoapps = todoapps.map(todo => {
        if (todo.id == id) {
            return {
                ...todo,
                title: body.title
            }
        } else {
            return todo
        }
    })
    res.redirect('/todoapps')

}
const deletetodoapps = (req, res) => {
    const { id } = req.params;
    const idtodo = todoapps.find(todo => todo.id == id)
    if (idtodo) {
        todoapps = todoapps.filter(todo => todo.id != id)
        res.redirect('/todoapps');
    } else {
        res.render('errors/404', {
            msg: 'Người dùng không tồn tại'
        });
    }


}
export default {
    searchtodoapps,
    viewAddtodoapps,
    addtodoapps,
    getDetailtodoapps,
    viewEdittodoapps,
    updatetodoapps,
    deletetodoapps

}
