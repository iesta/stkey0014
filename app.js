const fs = require('fs');
const CryptoJS = require('crypto-js');
// const _cliProgress = require('cli-progress');

const combis = fs.readFileSync('combis.txt', 'utf8').toString().match(/^.+$/gm);
const message = fs.readFileSync('message.txt', 'utf8');

function cartesianProduct(a) { // a = array of array
    var i, j, l, m, a1, o = [];
    if (!a || a.length == 0) return a;

    a1 = a.splice(0, 1)[0]; // the first array of a
    a = cartesianProduct(a);
    for (i = 0, l = a1.length; i < l; i++) {
        if (a && a.length) for (j = 0, m = a.length; j < m; j++)
            o.push([a1[i]].concat(a[j]));
        else
            o.push([a1[i]]);
    }
    return o;
}

let tot=1;
let arrayOrArray = []

for(let i = 0; i < combis.length; i++){
    tot *= combis[i].length
    arrayOrArray.push(combis[i].split(''))
}

const res = cartesianProduct( arrayOrArray )

console.log("Total combinations: ",tot);

encryptedHMAC = message.substring(0, 64);
encryptedHTML = message.substring(64);


for(let i = 0; i < res.length; i++){

    decryptedHMAC = CryptoJS.HmacSHA256(encryptedHTML, CryptoJS.SHA256(res[i].join("")).toString()).toString();
    if (decryptedHMAC !== encryptedHMAC) {
        // console.log(`#${i}/${tot}`, "Negative: ", res[i].join("") );
        if(i%5000==0) {
            console.log("Tested ",i," negative keys");
        }
    } else {
        console.log(`#${i}/${tot}`, "Positive: ", res[i].join(""));
        console.log("---",);
        const plainHTML = CryptoJS.AES.decrypt(encryptedHTML, res[i].join("")).toString(CryptoJS.enc.Utf8);
        console.log(plainHTML);
        console.log("---",);
        break;
    }

}