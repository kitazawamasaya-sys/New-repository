// ==============================
// 新聞名
// ==============================

const newspaper1 = "新聞①";
const newspaper2 = "新聞②";


// ==============================
// ブロックごとの配達データ
// ==============================

const blockData = [
    {
        block: "A",
        houses: 7,
        newspaper1: 7,
        newspaper2: 3
    },
    {
        block: "B",
        houses: 8,
        newspaper1: 8,
        newspaper2: 1
    },
    {
        block: "C",
        houses: 6,
        newspaper1: 6,
        newspaper2: 4
    },
    {
        block: "D",
        houses: 5,
        newspaper1: 5,
        newspaper2: 5
    },
    {
        block: "E",
        houses: 6,
        newspaper1: 5,
        newspaper2: 1
    },
    {
        block: "F",
        houses: 6,
        newspaper1: 3,
        newspaper2: 1
    },
    {
        block: "G",
        houses: 5,
        newspaper1: 5,
        newspaper2: 4
    },
    {
        block: "H",
        houses: 4,
        newspaper1: 4,
        newspaper2: 3
    },
    {
        block: "I",
        houses: 4,
        newspaper1: 14,
        newspaper2: 4
    },
    {
        block: "J",
        houses: 3,
        newspaper1: 3,
        newspaper2: 2
    },
    {
        block: "K",
        houses: 4,
        newspaper1: 4,
        newspaper2: 1
    }
];


// ==============================
// 画面表示
// ==============================

document.getElementById("newspaper1-header").textContent =
    newspaper1;

document.getElementById("newspaper2-header").textContent =
    newspaper2;


const blockList = document.getElementById("block-list");

blockData.forEach(data => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${data.block}</td>
        <td>${data.houses}</td>
        <td>${data.newspaper1}</td>
        <td>${data.newspaper2}</td>
    `;

    blockList.appendChild(row);
});


// ==============================
// 開始ボタン
// ==============================

document.getElementById("start-button")
    .addEventListener("click", () => {

        alert("開始します");

    });
