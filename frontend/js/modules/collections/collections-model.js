import Backbone from 'backbone';
import vars from './../../vars';

export default  Backbone.Model.extend({
    defaults: {
        title: '',
        id: 0,
        description: "",
        published_at: "",
        updated_at: "",
        curated: false,
        featured: false,
        total_photos: 0,
        private: false,
        "cover_photo": {}
    },
    urlRoot: vars.API_URL + 'collections/'
});

