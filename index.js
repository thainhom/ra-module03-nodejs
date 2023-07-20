const fs = require('fs');
const Content = " Việt,\n Trung,\n Sáng\n file name.txt ";
fs.writeFile("name.txt", Content, 'utf-8', (error) => {
    if (error) {
        console.log("error ", error.message);
    } else {
        console.log("ghi file thành công");
    }

});