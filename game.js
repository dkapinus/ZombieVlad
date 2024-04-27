//Появление зомби в случайном месте
const items = document.querySelectorAll(".item");
const zombieImg = document.createElement("img");
zombieImg.src = "images/zombie.png";
let randomIndex;
randomIndex = getRandomItemIndex(items);


//Элементы для фонового звука и его включения/выключения
const bu = document.querySelector("#sound-bu");
const soundBtn = document.querySelector("#sound-btn");

//Элементы для выстрел: картинки попадания,
//звук выстрела, подчёт попаданий
const hitImage = document.createElement("img");
hitImage.src = "images/blood.png";
const shot = document.querySelector("#sound-shot");
const hitCounter = document.querySelector("#hit-counter");

//"Флаг" для подсчёта промахов и счётчик промахов
let hit = true;
const missCounter = document.querySelector("#miss-counter");

//Элементыи флаг для включения/выключения игры
const startBtn = document.querySelector("#start-btn")
let isStarted = false
let interval;


//Вспомогательная функция для нахождения
//случайного индекса в массиве
function getRandomItemIndex(array) {
    return Math.floor(Math.random() * array.length);
};

function playGame() {
    //Перемещение зомби
    interval = setInterval(function () {
        //Проверяем "флаг", если было попадание - скидываем на false
        //если был промах - считаем промахи
        if (hit === true) {
            hit = false;
        } else {
            missCounter.innerText++;
        }
        //Помещаем нового зомби в случайную ячейку
        randomIndex = getRandomItemIndex(items);
        items[randomIndex].append(zombieImg);
        //Убираем следы крови перед появлением нового зомби
        hitImage.remove()
    }, 2000)
}


// Включение и выключение фонового звука,
// изменение текст на кнопке
soundBtn.onclick = function () {
    if (bu.currentTime) {
        bu.pause();
        bu.currentTime = 0;
        soundBtn.innerHTML = "SOUND ON"
    } else {
        bu.play();
        soundBtn.innerHTML = "SOUND OFF"
    }
}

//Попадание по зомби


startBtn.onclick = function () {
    if (!isStarted) {
        isStarted = true
        zombieImg.onclick = function () {
            //Меняем "флаг" при попадании
            hit = true
            hitCounter.innerText++;
            //Запускаем заново звук выстрела
            shot.currentTime = 0;
            shot.play();
            //Убираем зомби и на его место вставляем кровавый след
            zombieImg.remove();
            items[randomIndex].append(hitImage);
        }
        playGame()
        items[randomIndex].append(zombieImg);
        startBtn.innerHTML = "STOP"


    } else {
        isStarted = false
        zombieImg.onclick = null
        clearInterval(interval)
        zombieImg.remove();
        hitImage.remove()
        startBtn.innerHTML = "START"
        missCounter.innerText = 0
        hitCounter.innerText = 0

    }
}
