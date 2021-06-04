const cubeVal = val => val**3

let vals = [1,2,3,4,5,6,7]
//single line to call the cubeVal
vals = vals.map(val => cubeVal(val))

console.log(vals)