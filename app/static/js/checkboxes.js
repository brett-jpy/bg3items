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