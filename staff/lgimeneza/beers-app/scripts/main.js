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

var list;

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
        var anchor = document.createElement('a')

        item.appendChild(anchor);
        anchor.setAttribute('href', '#')
        anchor.appendChild(document.createTextNode(beer.name));

        item.addEventListener('click', function(e) {
            showBeerInfo(beer.id);
        });   
        

        list.appendChild(item);
    });
}


function showBeerInfo(id){

    logic.getBeerInfo(id, function(beer){

        list.lastChild.remove()

        var container = document.createElement('div');
        container.setAttribute('id', 'container');
        var name = document.createElement('h2');
        var desc = document.createElement('p');
        //var img = document.createElement('img');

        //img.setAttribute('href',beer.)

        container.appendChild(name)
        name.appendChild(document.createTextNode(beer.name));
        container.appendChild(desc)
        desc.appendChild(document.createTextNode(beer.style.description));

        list.appendChild(container);

    });

}