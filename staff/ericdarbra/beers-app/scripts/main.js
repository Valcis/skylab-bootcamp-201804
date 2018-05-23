'use strict';

document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();

    var input = this.elements[0];

    var query = input.value;

    logic.searchBeers(query, function (beers) {
        listBeers(beers);
    });

    input.value = '';
});

var list, container;

function listBeers(beers) {
    if (!list) {
        list = document.createElement('ul');

        document.body.appendChild(list);
    }

    //list.innerHTML = '';
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    beers.forEach(function (beer) {
        var item = document.createElement('li');
        var anchor = document.createElement('a');
        anchor.href = "#";
        
        item.appendChild(anchor);
        anchor.appendChild(document.createTextNode(beer.name));

        
        item.addEventListener('click',function(e){
            
            showBeerInfo(beer.id)

        });
        
        
        
        list.appendChild(item);
    });
}
function showBeerInfo(id){


    logic.getBeerInfo(id, function(beer){
        
        if(!container){
            var container = document.createElement('div');
            var title = document.createElement('h2');
        }
        console.log(container);
        list.lastChild.remove();
       /*  while(list.lastChild){  
        list.removeChild(container);
         }*/

        container.appendChild(title)
        title.appendChild(document.createTextNode(beer.name));
        list.appendChild(container);

        var desc = document.createElement('p');

        desc.appendChild(document.createTextNode(beer.style.description));
        container.appendChild(desc);
        
    })

}
