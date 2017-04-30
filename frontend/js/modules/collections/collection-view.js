"use strict";

import Backbone from 'backbone';
import CollectionModel from './collections-model';
import template from './collection-template.jade';
import CollectionPhotoCollection from './collection-photos-collection';
import CollectionPhotoView from './collection-photo-view';
import vars from './../../vars';

const selectors = {
    'photos': '.collection-photos'
};

export default Backbone.View.extend({
   initialize: function(id){
       this.model = new CollectionModel({id: id});
       this.model.on('change', this.render, this);
       this.collection_photo = new CollectionPhotoCollection(id);
       this.collection_photo.on('add remove reset sort', this.renderCollection, this);
       this.fetchModel();
   },
    fetchModel: function(){
       this.model.url = vars.API_URL + 'collections/' + this.model.get('id') + '?client_id=' + vars.API_KEY;
       this.model.fetch({success: this.fetchCollection.bind(this) });
    },
    fetchCollection: function(){
        this.collection_photo.fetch();
    },
    render: function(){
        let data = {};
        if(this.model){
            data = this.model.toJSON();
        }
        this.$el.html(template(data));
       return this;
    },
    renderCollection: function (model) {
        if(model && model.id) {
            this.renderCollectionPhoto(model);
        }
    },
    renderCollectionPhoto: function(model){
        let view = new CollectionPhotoView({model: model});
        this.$el.find(selectors.photos).append(view.render().el);
    }
});