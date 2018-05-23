"use strict";

document.forms[0].addEventListener("submit", function(e) {
  e.preventDefault();

  var input = this.elements[0];

  var query = input.value;

  logic.searchBeers(query, function(beers) {
    listBeers(beers);
  });

  input.value = "";
});

var list;


function listBeers(beers) {
  if (!list) {
    list = document.createElement("ul");

    document.body.appendChild(list);
  }

  //list.innerHTML = '';
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  

  beers.forEach(function(beer) {
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#";
    // link.href= "https://www.google.es/search?q=beer&oq=beer&aqs=chrome..69i57j69i60j0l4.1025j0j7&sourceid=chrome&ie=UTF-8"

    link.addEventListener("click", function(e) {

      logic.getBeerInfo(beer.id, function(beer) {
        // put title and display info below
        showTheBeer(beer)
        
      });

      
    });

    link.appendChild(document.createTextNode(beer.name));

    item.appendChild(link);

    list.appendChild(item);
  });
}


var sectionInfo;

function showTheBeer(beer){
    if (!sectionInfo){
        sectionInfo= document.createElement("section")
        document.body.appendChild(sectionInfo)
    }

    sectionInfo.innerHTML='';
   
    var title = document.createElement("h1");
    title.appendChild(document.createTextNode(beer.name));
    sectionInfo.appendChild(title);

    var info = document.createElement("p");
    info.appendChild(document.createTextNode(beer.style.description));
    sectionInfo.appendChild(info);

    if (beer.labels && beer.labels.medium) {
      var DOM_img = document.createElement("img");
      DOM_img.src = beer.labels.medium;
      sectionInfo.appendChild(DOM_img);
    }
}
