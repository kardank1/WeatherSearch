// - Використовуй prompt та повертай значення звідти.
// - Створи функцію, яка буде набувати значення з prompt і всередині якої буде проміс.
// Якщо значення не є числом, відхиляй проміс та логіруй "error".
// Якщо значення парне, вирішуй проміс та повертай "even" через 1 секунду.
// Якщо значення не парне, вирішуй проміс та повертай "odd" через 2 секунди.

const number = Number(prompt("Enter number: "));

function isEven(number){
    const promise = new Promise((resolve, reject) => {
        if(Number.isNaN(number)){
            reject("error");
        }
        else if(number % 2 === 0){
            setTimeout(() => resolve("even"), 1000);
        }
        else  setTimeout(() => resolve("odd"), 2000);
    })
    return promise;
}

isEven(number).then(value => console.log(value)).catch(error => console.log(error))


