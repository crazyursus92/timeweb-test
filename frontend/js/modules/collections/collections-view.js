"use strict";

import Backbone from 'backbone';
import CollectionsCollection from './collections-collection';
import templateCollections from './collections-template.jade';
import CollectionsItemView from './collections-item-view';
import vars from './../../vars';
import _ from 'underscore';
import $ from 'jquery';

export default Backbone.View.extend({
    initialize: function(params = {}){
        this.collection = new CollectionsCollection();
        this.page = params.page || 1;
        this.per_page = 9;
        this.collection.on('add reset remove sort', this.render, this);
        this.elements = {};
        this.fetchCollection();
    },
    uri: 'collections/',
    selectors: {
        list: '.collections-list',
        next: '.pager-next',
        prev: '.pager-prev',
    },
    events: {
        'click .pager-next': 'next',
        'click .pager-prev': 'prev'
    },
    setPage: function(page){
        this.page = page;
    },
    next: function (e) {
        e.preventDefault();
        this.page ++;
        this.fetchCollection();
    },
    prev: function(e){
        e.preventDefault();
        if(this.page > 1){
            this.page--;
            this.fetchCollection();
            this.elements.prev.toggleClass('disabled', this.page <= 1);
        }else{
            this.elements.prev.addClass('disabled');
        }
    },
    fetchOptions: function(){
        return {
            client_id: vars.API_KEY,
            page: this.page,
            per_page: this.per_page
        };
    },
    toJSON: function(){
        return {
            page: this.page,
            per_page: this.per_page
        };
    },
    parseElements: function(){
        _.each(this.selectors, (item, key) => {
           this.elements[key] = this.$el.find(item);
        });
        return this;
    },
    fetchCollection: function(){
        this.$el.find(this.selectors.list).addClass('load');
        this.collection.url = vars.API_URL  + this.uri + '?' + $.param(this.fetchOptions());
        this.collection.fetch();
        return this;
    },
    render: function(){
        this.$el.html(templateCollections(this.toJSON()));
        this.parseElements();
        this.collection.each(this.renderOne, this);
        this.$el.find(this.selectors.list).removeClass('load');
        return this;
    },
    renderOne: function(model){
        let view = new CollectionsItemView({model: model});
        this.elements.list.append(view.render().el);
    }
});