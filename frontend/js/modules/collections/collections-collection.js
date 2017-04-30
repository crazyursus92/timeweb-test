import Backbone from 'backbone';
import CollectionsModel from './collections-model';
import vars from './../../vars';

export default Backbone.Collection.extend({
    model: CollectionsModel,
    url: vars.API_URL + 'collections'
});