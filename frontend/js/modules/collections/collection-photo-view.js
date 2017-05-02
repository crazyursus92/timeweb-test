"use strict";

import Backbone from 'backbone';
import template from './collection-photo-template.jade';




export default Backbone.View.extend({
   initialize: function(){

   },
    render: function(){
       let data = {};
       if(this.model){
           data = this.model.toJSON();
       }
        this.$el.html(template(data));
       return this;
    }
});