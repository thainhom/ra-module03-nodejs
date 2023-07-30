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



}
const getDetailtodoapps = (req, res) => {

}

const viewEdittodoapps = (req, res) => {

}
const updatetodoapps = (req, res) => {

}
const deletetodoapps = (req, res) => {

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
