"use strict";

import CollectionsView from './collections-view';
import CollectionView from './collection-view';
import $ from 'jquery';
export default {
    collectionsRender: function (page) {
      if(!this.collectionsRender.view){
          this.collectionsRender.view = new CollectionsView({page: page});
      }
      if(page){
          this.collectionsRender.view.setPage(page);
      }
      $('#root').html(this.collectionsRender.view.render().el);
    },
    collectionRender: function(id){
        let view = new CollectionView(id);
        $('#root').html(view.$el);
    }
};