/**
 * Basic method that apply to all objects will be placed here.
 * @constructor
 */
TowerDefense.Element = function () {

    /**
     * The unique id of the object
     */
    this.id = TowerDefense.elementCount++;

    /**
     * Holds the 3D (Three) mesh
     */
    this.object = {};

    /**
     * Current object is selected
     * @type {boolean}
     */
    this.selected = false;

    /**
     * Whether the current object is selectable
     * @type {boolean}
     */
    this.selectable = false;

    /**
     * Holds the current selected Object
     */
    this.selectedObject = {};

    /**
     * Holds the tween for animation
     * @type {{}}
     */
    this.tween = {};

}

TowerDefense.Element.prototype = {

    constructor: TowerDefense.Element,

    add: function () {

        TowerDefense.__addObject(this);

    },

    update: function() {

    },

    /**
     * Logical callback after user clicked on this object
     */
    select: function() {

    },

    /**
     * Logical callback after object is deselected
     */
    deselect: function() {

    }
}

TowerDefense.elementCount = 0;