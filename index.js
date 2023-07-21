const fs = require("fs")
const students = [
    {
        name: 'Trung',
        age: 25,
        homeTowm: "Quảng Bình"
    },
    {
        name: 'Tín',
        age: 29,
        homeTowm: "Quảng Nam"
    },

    {
        name: 'Sơn',
        age: 25,
        homeTowm: "Đà Nẵng"
    },

    {
        name: 'Giang',
        age: 21,
        homeTowm: "Quảng Bình"
    },

    {
        name: 'Tài',
        age: 21,
        homeTowm: "Quảng Nam"
    },

    {
        name: 'Sáng',
        age: 20,
        homeTowm: "Hà Tĩnh"
    },

    {
        name: 'Việt',
        age: 21,
        homeTowm: "Huế"
    },
    {
        name: 'Giang',
        age: 20,
        homeTowm: "Huế"
    },





]
// chạy vong lập for of đê ghi thông tin các sinh viên vào các file riêng biệt
for (let student of students) {
    const content = "Tên :" + student.name + '\n' + "Tuổi :" + student.age + '\n' + 'Quê Quán:' + student.homeTowm
    const fileName = student.name + '.txt'
    fs.writeFileSync(fileName, content, "utf-8")
}
// Đọc và in thông tin từng file sinh viên ra console.log
for (let student of students) {
    const fileName = student.name + '.txt'
    // đọc nội dung từ các file định dạng utf-8
    try {
        const data = fs.readFileSync(fileName, "utf-8")
    } catch (error) {
        console.error("error reading file ", error)
    }

}
// Gom các sinh viên theo quê quán và in ra console.log
const studentsByhomeTowm = {}
for (let student of students) {
    const content = "Tên :" + student.name + '\n' + 'Tuổi:' + student.age + '\n'

    if (studentsByhomeTowm[student.homeTowm]) {
        // nếu quê quán đã tồn tại trong studentByhomeTowm , thêm thông tin tên và tuổi vào nhóm tương ứng
        studentsByhomeTowm[student.homeTowm].push(content)
    } else {
        // nếu quê quán sinh viên chưa tồn tại tạo một nhóm mới in thông tin sính viên vào 
        studentsByhomeTowm[student.homeTowm] = [content];
    }
}
// in thông tin gom nhóm ra mà hình cosole.log
for (const hometown in studentsByhomeTowm) {

    console.log("Sinh viên từ " + hometown + ":");

    for (const studentInfo of studentsByhomeTowm[hometown]) {
        console.log(studentInfo);
    }
    console.log("-------------");
}
