//The data attirbue "locations" is intentionally plural to diff. from the the singluar one used elsewhere
function buildPage(icon, itemName, description, itemType, act, location, wiki_link, rarity){
    let bsCard = `<div class="shadow card mb-3 ${location.replaceAll(" ", "-")}" style="width: 540px;" data-locations="${location.replaceAll(" ", "-")}">
    <div class="row no-gutters">
      <div class="col-md-3">
        <img src="${icon}" alt="" style="opacity: 0.5;" />
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <a href="${wiki_link}"><h3 class="card-title ${rarity}">${itemName}</h3></a>
          <p class="card-text">${itemType}</p>
          <p class="card-text">${act} - ${location}</p>
          <p class="card-text">${description}</p>
        </div>
      </div>
    </div>
  </div>`
  return bsCard;
};

// Finds Only the Unique Values
// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
};

//Make Checkboxes
function makeLocationChecks(myArray) {
  let bsCheck = ""
  myArray.forEach(function (value, i) {
      console.log('%d: %s', i, value);
      bsCheck += `<div class="togHold">
      <div class="form-check form-check-inline">
          <input id="${value.replace(" ", "-")}"  data-location="${value}" class="form-check-input" type="checkbox" value="${value}" onclick="locPick('${value}')">
          <label class="form-check-label" for="${value.replace(" ", "-")}">${value}</label>
        </div>
      </div>`
  })
  $("#location-select").html(bsCheck)
};

function itemSearch(){
    let act = document.querySelector('[data-act]:checked').value;
    let rarity = document.querySelector('[data-rarity]:checked').value;
    let type = document.querySelector('[data-items]:checked').value;
    // console.log(act, rarity, type)
    let area = []
    let html = ""
    $.ajax({
        url: `/items?act=${act}&rarity=${rarity}&type=${type}`,
        type: 'GET',
        contentType: 'application/json',
        success : function(response) {
            console.log(response)
            let rr = JSON.parse(response)
            rr.forEach(function(item) {
                // console.log(item)
                let tmp = buildPage(item.img_link, item.Name, item.Description, item.Type, item.act, item.Location, item.wiki_link, item.Rarity.toLowerCase().replace(" ", ""))
                html += tmp
                area.push(item.Location);
                
            });
            $("#item-response").html(html)
            $("body").css({ 'overflow' : 'visible'});
            let uniqLoc = area.filter(onlyUnique);
            // Calls the function passing it the array of unique values
            makeLocationChecks(uniqLoc)
        }
    })
};

//
// The QUERY FORM FUNCTION
//"https://code.jquery.com/jquery-3.2.1.min.js"
$(document).ready(function() {
  document.getElementById("query").onclick = function(e) {
    e.preventDefault(); // crucial for the post only send the form data, other wise the form submits too (breaks ajax)
    e.stopPropagation(); // same
    let var1 = document.getElementById("queryValue").value;
    let html = ""

    $.ajax({
        url: `/query?term=${var1}`,
        type: 'GET',
        contentType: 'application/json',
        success : function(response) {
          console.log(response)
          let rr = JSON.parse(response)
            rr.forEach(function(item) {
                // console.log(item)
                let tmp = buildPage(item.img_link, item.Name, item.Description, item.Type, item.act, item.Location, item.wiki_link, item.Rarity.toLowerCase().replace(" ", ""))
                html += tmp
            });
            $("#item-response").html(html)
            $("body").css({ 'overflow' : 'visible'});
        }
      });
  }});