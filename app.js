const deliveryData = [
    { name: "田中 太郎", items: ["● 朝刊", "□ 日経"] },
    { name: "山田 花子", items: ["● 朝刊"] },
    { name: "佐藤 一郎", items: ["● 朝刊", "□ 日経"] },
    { name: "鈴木 次郎", items: ["● 朝刊"] },
    { name: "高橋 三郎", items: ["● 朝刊", "□ 日経"] },
    { name: "伊藤 四郎", items: ["● 朝刊"] }
];

let currentIndex = 0;

function updateScreen() {
    const current = deliveryData[currentIndex];

    document.getElementById("name").textContent = current.name;

    document.getElementById("items").innerHTML =
        current.items.join("<br>");

    document.getElementById("progress").textContent =
        `${currentIndex + 1} / ${deliveryData.length}`;

    const nextList = document.getElementById("nextList");
    nextList.innerHTML = "";

    for (
        let i = currentIndex + 1;
        i <= currentIndex + 5 && i < deliveryData.length;
        i++
    ) {
        const item = document.createElement("div");

        item.className = "next-item";

        item.textContent =
            `${deliveryData[i].name}　` +
            deliveryData[i].items.join("");

        nextList.appendChild(item);
    }
}

document
    .getElementById("complete")
    .addEventListener("click", () => {

        if (currentIndex < deliveryData.length - 1) {
            currentIndex++;
            updateScreen();
        } else {
            alert("本日の配達完了！");
        }
    });

updateScreen();
