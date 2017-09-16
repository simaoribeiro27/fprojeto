var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Travel Model
 * ==========
 */

var Travel = new keystone.List('Travel', {
    map: { name: 'contry' },
    autokey: { path: 'travel', from: 'contry', unique: true },
});

Travel.add({
    // contry: { type: String, required: true },
    city: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    description: {
        brief: { type: Types.Html, wysiwyg: true, height: 100 },
        extended: { type: Types.Html, wysiwyg: true, height: 300 },
    },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    createdAt: { type: Date, default: Date.now },
    image: { type: Types.CloudinaryImage },
    author: { type: Types.Relationship, ref: 'User', index: true },
    // Travel: { type: Types.Relationship, ref: 'moment', many: true }
});

Travel.schema.virtual('descricao.full').get(function() {
    return this.description.brief || this.description.extended;
});

Travel.defaultColumns = 'contry, state, brief, createdAt|20%, author|20%';
Travel.register();