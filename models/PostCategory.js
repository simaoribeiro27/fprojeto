var keystone = require('keystone');
var Types = keystone.Field.Types;


// PostCategory Model
var PostCategory = new keystone.List('PostCategory', {
    map: { name: 'title' },
    autokey: { from: 'title', path: 'key', unique: true },
});

PostCategory.add({
    title: { type: String },
    location: { type: Types.Location },
    content: { brief: { type: Types.Html, wysiwyg: true, height: 80 } },
    createdAt: { type: Types.Date, default: Date.now },
    image: { type: Types.CloudinaryImage },
    author: { type: Types.Relationship, ref: 'User', index: true },
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });
PostCategory.schema.virtual('content.full').get(function() {
    return this.content.brief;
});

PostCategory.defaultColumns = 'title, city,  createdAt|20%, author|20%';
PostCategory.register();