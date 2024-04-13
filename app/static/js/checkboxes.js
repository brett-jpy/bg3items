function actCheck(val) {
    console.log(val)
    document.querySelectorAll(`[data-act]:not([data-act="${val}"])`).forEach((el) => {el.checked = false});
};

function rarityCheck(val) {
    console.log(val)
    document.querySelectorAll(`[data-rarity]:not([data-rarity="${val}"])`).forEach((el) => {el.checked = false});
};

function itemCheck(val) {
    console.log(val)
    document.querySelectorAll(`[data-items]:not([data-items="${val}"])`).forEach((el) => {el.checked = false});
};

function locPick(val) {
    console.log(val)
    document.querySelectorAll(`[data-location]:not([data-location="${val}"])`).forEach((el) => {el.checked = false});
    // $(`.${val.replaceAll(" ", "-")}`).css({"display": "none"})
    document.querySelectorAll(`[data-locations]`).forEach((el) => {el.style.setProperty('display', 'block')});
    document.querySelectorAll(`[data-locations]:not([data-locations="${val.replaceAll(" ", "-")}"])`).forEach((el) => {el.style.setProperty('display', 'none')});
};