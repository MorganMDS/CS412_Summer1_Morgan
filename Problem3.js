// Problem3:
function execute(str, func) {
    let result = func(str);
    return result;
}

str = 'supercalifragilisticexpialidocious';
result = execute(str, str => {
    let strs = [];
    let start = 0;
    let end;
    while ((end = str.indexOf('c', start)) >= 0) {
        strs.push(str.substring(start - 1, end));
        start = end + 1;
    }
    strs.push(str.substring(start - 1));
    return strs;
})
result.forEach(o => console.log(o))


result = execute(str, str => {
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
    return dict;
})
console.table(result)

