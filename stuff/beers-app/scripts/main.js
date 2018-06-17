'use strict';

document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();

    var input = this.elements[0];

    var query = input.value;

    logic.searchBeers(query, function (error, beers) {
        if (error) {
            alert('sorry, something went wrong... :(');
        } else {
            listBeers(beers);
        }
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

    if (beers.length) {
        beers.forEach(function (beer) {
            var item = document.createElement('li');
    
            var a = document.createElement('a');
            a.href = '#';
            a.appendChild(document.createTextNode(beer.name));
    
            a.addEventListener('click', function () {
                logic.getBeerInfo(beer.id, function (error, beer) {
                    if (error) {
                        alert('sorry, something went wrong... :(');
                    } else {
                        showBeer(beer);
                    }
                });
            });
    
            item.appendChild(a);
    
            list.appendChild(item);
        });
    }
}

var info;

function showBeer(beer) {
    if (!info) {
        info = document.createElement('section');

        document.body.appendChild(info);
    }

    info.innerHTML = '';

    var title = document.createElement('h2');

    title.appendChild(document.createTextNode(beer.name));

    info.appendChild(title);

    var desc = document.createElement('p');

    desc.appendChild(document.createTextNode(beer.description || 'sorry, no description available :('));

    info.appendChild(desc);

    if (beer.labels && beer.labels.medium) {
        var img = document.createElement('img');

        img.src = beer.labels.medium;

        info.appendChild(img);
    }
}
