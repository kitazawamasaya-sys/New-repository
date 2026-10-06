// ==============================
// 新聞名
// ==============================

const newspaper1 = "信毎";
const newspaper2 = "須坂";


// ==============================
// ブロックごとの配達データ
//
// deliveries = 家ごとの配達先（ブロック画面に表示）
//   place      : 家の場所・目印
//   newspaper1 : 信毎の部数（0 なら空欄）
//   newspaper2 : 須坂の部数（0 なら空欄）
//   note       : 備考（その他の新聞など、自由入力。なければ ""）
//                例: "●●新聞と□□新聞"
//
// インデックスの軒数・信毎・須坂は、deliveries から自動計算します。
// 配達先を入れていないブロックは [] のままにしてください（0 と表示されます）。
// ==============================

const blockData = [
    {
        block: "A",
        deliveries: [
            { place: "右の家",         newspaper1: 1, newspaper2: 0, note: "" },
            { place: "左3軒 右の家",   newspaper1: 1, newspaper2: 1, note: "" },
            { place: "左3軒 奥の家",   newspaper1: 1, newspaper2: 0, note: "" },
            { place: "左3軒 手前の家", newspaper1: 1, newspaper2: 0, note: "" },
            { place: "左鬼バック",     newspaper1: 1, newspaper2: 0, note: "" },
            { place: "左",             newspaper1: 1, newspaper2: 0, note: "" },
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "B",
        deliveries: [
            { place: "キティ",          newspaper1: 1, newspaper2: 0, note: "" },
        ]
    },
    {
        block: "C",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "D",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "E",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "F",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "G",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "H",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "I",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "J",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    },
    {
        block: "K",
        deliveries: [
            { place: "右 猫",          newspaper1: 1, newspaper2: 0, note: "" }
        ]
    }
];


// ==============================
// 共通
// ==============================

const indexView = document.getElementById("index-view");
const blockView = document.getElementById("block-view");

// 要素を作る小さな関数
function el(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

// ブロックの軒数・部数を deliveries から計算する
function getTotals(data) {
    return {
        houses: data.deliveries.length,
        newspaper1: data.deliveries.reduce((sum, d) => sum + d.newspaper1, 0),
        newspaper2: data.deliveries.reduce((sum, d) => sum + d.newspaper2, 0)
    };
}

// 画面を移動する（"" ならインデックス、"A" ならAブロック）
// URLの # 以降を書き換えるので、スマホの戻るボタンも使えます
function go(id) {
    location.hash = id;
}


// ==============================
// インデックス画面
// ==============================

document.getElementById("newspaper1-header").textContent =
    newspaper1;

document.getElementById("newspaper2-header").textContent =
    newspaper2;


const blockList = document.getElementById("block-list");

blockData.forEach(data => {

    const totals = getTotals(data);
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${data.block}</td>
        <td>${totals.houses}</td>
        <td>${totals.newspaper1}</td>
        <td>${totals.newspaper2}</td>
    `;

    blockList.appendChild(row);
});


// 開始ボタン → 最初のブロックへ
document.getElementById("start-button")
    .addEventListener("click", () => {

        go(blockData[0].block);

    });


function showIndex() {
    blockView.hidden = true;
    indexView.hidden = false;
    document.title = "新聞配達";
}


// ==============================
// ブロック画面
// ==============================

// 新聞1紙ぶんのセル
// 新聞名は左、部数は右に固定の幅で確保（部数は2部以上のときだけ表示）
function paperCell(name, count) {
    const td = el("td");

    if (count > 0) {
        const box = el("div", "paper");
        box.appendChild(el("span", "paper-name", name));
        box.appendChild(el("span", "paper-count", count > 1 ? String(count) : ""));
        td.appendChild(box);
    }

    return td;
}

function showBlock(index) {
    const data = blockData[index];
    const isFirst = index === 0;
    const isLast = index === blockData.length - 1;

    indexView.hidden = true;
    blockView.hidden = false;
    document.title = `${data.block}ブロック`;

    blockView.replaceChildren();

    // タイトル
    blockView.appendChild(el("h1", "", `${data.block}ブロック`));

    // 配達先の表
    const table = el("table", "detail-table");
    const tbody = el("tbody");

    if (data.deliveries.length > 0) {

        data.deliveries.forEach(d => {
            const row = el("tr");

            row.appendChild(el("td", "place", d.place));
            row.appendChild(paperCell(newspaper1, d.newspaper1));
            row.appendChild(paperCell(newspaper2, d.newspaper2));
            row.appendChild(el("td", "note", d.note));

            tbody.appendChild(row);
        });

    } else {
        const row = el("tr");
        const cell = el("td", "empty", "このブロックの配達先は未入力です");
        cell.colSpan = 4;
        row.appendChild(cell);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    blockView.appendChild(table);

    // 前へ・次へ
    const nav = el("div", "nav");

    const prevButton = el("button", "nav-button", "前へ");
    prevButton.addEventListener("click", () => {
        // 先頭ブロックの「前へ」はインデックスに戻る
        go(isFirst ? "" : blockData[index - 1].block);
    });

    const nextButton = el("button", "nav-button", isLast ? "終了" : "次へ");
    nextButton.addEventListener("click", () => {
        // 最後のブロックの「終了」はインデックスに戻る
        go(isLast ? "" : blockData[index + 1].block);
    });

    nav.appendChild(prevButton);
    nav.appendChild(nextButton);
    blockView.appendChild(nav);
}


// ==============================
// 画面の切り替え（URLの # で判断）
// ==============================

function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    const index = blockData.findIndex(d => d.block === id);

    if (index === -1) {
        showIndex();
    } else {
        showBlock(index);
    }

    window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);

route();
