"use strict";

import Backbone from "backbone";
import collections from "./modules/collections/index";
import $ from "jquery";
let Router = Backbone.Router.extend({
    routes: {
        '': 'collections',
        'home/:page': 'collections',
        'collections/:id': 'collection',

    },
    collections: function (page) {
        collections.collectionsRender(page);
    },
    collection: function (id) {
        collections.collectionRender(id);
    },
    default: function () {

    }
});
$(document).ready(function () {
    let router = new Router();
    Backbone.history.start();
});