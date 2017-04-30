import Backbone from 'backbone';
import template from './collections-item-template.jade';

export default Backbone.View.extend({
   render: function(){
       let data = {};
       if(this.model){
           data = this.model.toJSON();
       }
       this.$el.html(template(data));
       return this;
   }
});