var keystone = require('keystone');
var Types = keystone.Field.Types;


// Post Model
var Post = new keystone.List('Post', {
    map: { name: 'locality' },
    autokey: { path: 'slug', from: 'locality', unique: true },
});

Post.add({
    locality: { type: String, required: true },
    weathery: { type: String },
    location: { type: Types.Location },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    endAt: { type: Date },
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 100 },
        extended: { type: Types.Html, wysiwyg: true, height: 200 },
    },
    author: { type: Types.Relationship, ref: 'User', index: true },
    categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'locality, weathery, geo, publishedDate|20%, author|20%, endAt|20%';
Post.register();