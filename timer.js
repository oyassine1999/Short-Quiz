let count = 100;

const timer = setInterval(function () {
    const questionElement = document.querySelector("#time");
    questionElement.innerHTML = count;

    console.log(count);
    count--;

    if (count === 0) {
    clearInterval(timer);
    }
}, 1000); // 1000 milliseconds = 1 second