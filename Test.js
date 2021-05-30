// Test

str = 'csupercalifragilisticexpialidociousc';

let dict = {};

dict.originalString = str;
let count = 0;
for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === 'a') {
        count++;
    }
}

dict.modifiedString = str.replaceAll('a', 'A');
dict.numberReplaced = count;
dict.length = str.length;
console.table(dict)
