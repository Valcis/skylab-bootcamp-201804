"use strict";

function CreatePerson(){
    
    this.epicanthalFold = function(){
        (Math.random() < 0.3) ? this.epicanthalFold = true : this.epicanthalFold = false;
    };
    this.eyesColor = function(){
        var rnd = Math.ceil(Math.random() * 4);
        switch (rnd){
            case (1):
                this.eyesColor = "black";
                break;
            case (2):
                this.eyesColor = "brown";
                break;
            case (3):
                this.eyesColor = "green";
                break;
            default:
                this.eyesColor = "blue";
                break;
        }
    };
    this.skinColor = function(){
        var rnd = Math.ceil(Math.random() * 4);
        switch (rnd){
            case (1):
                this.skinColor = "light";
                break;
            case (2):
                this.skinColor = "medium";
                break;
            case (3):
                this.skinColor = "medium-dark";
                break;
            default:
                this.skinColor = "dark";
                break;
        }
    };
    this.hairColor = function(){
        var rnd = Math.ceil(Math.random() * 4);
        switch (rnd){
            case (1):
                this.hairColor = "black";
                break;
            case (2):
                this.hairColor = "brown";
                break;
            case (3):
                this.hairColor = "blond";
                break;
            default:
                this.hairColor = "red";
                break;
        }
    };
    this.gender = function(){
        (Math.random() < 0.5) ? this.gender = "man" : this.gender = "woman";
    };
    this.height = (1.5 + Math.random()*0.5).toFixed(2) + "m";
    this.weight = Math.round(40 + Math.random()*50) + "kg";

    this.nation = function(){

        if(this.skinColor === "dark") {
            if((this.epicanthalFold) && this.eyesColor !== ("blue")){
                return this.nation = "Australia or south Oceania";
            } else {
                if(this.hairColor === "black" && (this.eyesColor === "black" || this.eyesColor === "brown")) return this.nation = "Africa or Central America";
                if(this.hairColor === "blond" && this.eyesColor === "blue") return this.nation = "Demolition Man Land";
                return this.nation = "anywhere, with parents from different places";
            }
        } else if (this.skinColor === "medium-dark") {
            if((this.epicanthalFold) && this.eyesColor !== "blue"){
                return this.nation = "south-west Asia or north Oceania";
            } else {
                if((this.hairColor === "black" || this.hairColor === "brown") && (this.eyesColor === "black" || this.eyesColor === "brown")) return this.nation = "north Africa, Middle East or south America";
                if((this.hairColor === "black" || this.hairColor === "brown") && (this.eyesColor !== "black" && this.eyesColor !== "brown")) return this.nation = "Middle East";
                if(this.hairColor === ("red")) return this.nation = "north Africa";
                if(this.hairColor === ("blond")) return this.nation = "latin America";
                return this.nation = "anywhere from this world";
            }
        } else if (this.skinColor === "medium") {
            if(this.epicanthalFold){
                if ((this.hairColor === "black" || this.hairColor === "brown") && this.eyesColor !== "blue"){
                    return this.nation = "south and west Asia";
                }
                return this.nation = "anywhere in Asia, but is hard to see";
            } else {
                if(this.hairColor === "blond" || this.hairColor === "brown") return this.nation = "Mediterranean sea or north America";
                if(this.hairColor === "black") return this.nation = "Middle East or south-east America";
                return this.nation = "north America or center Europe";
            }
        } else {
            if(this.epicanthalFold){
                if ((this.hairColor === "black" || this.hairColor === "brown") && (this.eyesColor === "black" || this.eyesColor === "brown")){
                    return this.nation = "center Asia or Antartida";
                }
                return this.nation = "Japan";
            } else {
                if(this.hairColor === "blond") return this.nation = "north-west Europe to Siberia";
                if(this.hairColor === "red") return this.nation = "north Europe";
                return this.nation = "anywhere in north";
            }
        }
    }

    this.epicanthalFold();
    this.eyesColor();
    this.skinColor();
    this.hairColor();
    this.gender();
    this.nation();

    this.info = function() {
        var ep = "";
        if (this.epicanthalFold) ep = " with epicanthic fold";
        this.info = ("You created a " + this.height + " and " + this.weight + " " + this.gender + ": Has " +
    this.eyesColor + " eyes" + ep + ", " + this.skinColor + " skin and " + this.hairColor +
    " hair... Could be from " + this.nation + "." );
    }
    this.info();
    console.log(this.info);
}


var user1 = new CreatePerson();
var user2 = new CreatePerson();
var user3 = new CreatePerson();