"use strict";

import Backbone from 'backbone';

export default  Backbone.Model.extend({
   defaults: {
       id: "",
       created_at: "",
       updated_at: "",
       likes: 0,
       user: {
           name: "",
       },
       urls: {
           regular: "/img/default.jpg",
           small: "/img/default.jpg",
       },
   }
});