const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const operate = function(a, b) {
    return(add(a, b) || subtract(a, b) || multiply(a, b) || divide(a, b));
}