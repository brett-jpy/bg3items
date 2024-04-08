function buildPage(icon, itemName, description, itemType, act, location, wiki_link, rarity){
    let bsCard = `<div class="shadow card mb-3" style="width: 540px;">
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

function itemSearch(){
    let act = document.querySelector('[data-act]:checked').value;
    let rarity = document.querySelector('[data-rarity]:checked').value;
    let type = document.querySelector('[data-items]:checked').value;
    // console.log(act, rarity, type)

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
            });
            $("#item-response").html(html)
            $("body").css({ 'overflow' : 'visible'});
        }
    })
};