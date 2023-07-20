const fs = require('fs');
const student = [
    {
        name: "trung",
        age: 25,
        hometowm: "Quảng bình"
    },
    {
        name: "Viêt",
        age: 20,
        hometowm: "Thừa Thiên Huế"
    },
    {
        name: "Tín",
        age: 29,
        hometowm: "Đại Lộc Quảng Nam "
    },
    {
        name: "Sơn",
        age: 25,
        hometowm: "Đà Nẵng"
    },
    {
        name: "Tài",
        age: 20,
        hometowm: "Quảng Nam"
    },
    {
        name: "Giang",
        age: 19,
        hometowm: "Quảng bình"
    },
    {
        name: "Sáng",
        age: 18,
        hometowm: "Hà Tỉnh"
    },


];
for (let students of student) {
    const content = "Tên :" + students.name + '+\n' + "Tuổi :" + students.age + '\n' + "Quê quán :" + students.hometowm
    fs.writeFile(students.name + '.txt', content, "utf-8");
}


