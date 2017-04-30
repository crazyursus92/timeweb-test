"use strict";

import Backbone from 'backbone';
import CollectionPhotoModel from './collection-photo-module';
import vars from './../../vars';

export default Backbone.Collection.extend({
    model: CollectionPhotoModel,
    initialize: function (id) {
        this.url = `${vars.API_URL}collections/${id}/photos?client_id=${vars.API_KEY}`;
    }
});

