"use strict";

window.addEventListener("load", function() {
    let controller = new ImageController(document.body);
    controller.items = document.querySelectorAll("#article-screenshots img");
    
});

class ImageController {
    
    constructor(parent) {
        let backgroundDiv = document.createElement("div");
        backgroundDiv.id = "image-full-bg";
        this._containerBackground = backgroundDiv;
        parent.appendChild(backgroundDiv);
        
        let img = document.createElement("img");
        img.id = "image-full";
        img.alt = "";
        this._containerImg = img;
        backgroundDiv.appendChild(img);
        
        this._containerBackground.addEventListener("click", this._hide.bind(this));
        this._containerBackground.style.display = "none";
        
        window.addEventListener("keypress", (function (event) {
            if (event.keyCode === 37) {
                this._prev();
            } else if (event.keyCode === 39) {
                this._next();
            }
        }).bind(this));
    }
    
    set items(array) {
        this._items = array;
        
        this._items.forEach((element, i, {}) =>
            element.addEventListener("click",
                ({}) => this._show(i))
            );
    }
    
    _next() {
        if (Number.isInteger(this._index)) {
            this._show((this._index + 1) % this._items.length);
        }
    }
    
    _prev() {
        if (Number.isInteger(this._index)) {
            this._show((this._index === 0
                        ? this._items.length
                        : this._index) - 1);
        }
    }
    
    _show(index) {
        this._index = index;
        let img = this._items[index];
        this._containerBackground.style.display = "";
        this._containerBackground.className = "image-full-showed";
        this._containerImg.src = img.src;
        this._containerImg.alt = img.alt;
    }
    
    _hide() {
        this._index = undefined;
        this._containerBackground.className = "image-full-hidden";
        /*this._containerImg.src = "";
        this._containerImg.alt = "";*/
    }
}
