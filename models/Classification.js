var keystone = require('keystone');
var Types = keystone.Field.Types;

// classification Model
var Classification = new keystone.List('Classification', {
    nocreate: true,
    noedit: true,
});

Classification.add({
    classificationType: {
        type: Types.Select,
        numeric: true,
        options: [
            { label: 'I have been very happy here!', value: 1 },
            { label: 'Never experienced it, I am amazed!', value: 2 },
            { label: 'This goes straight to my bucket list!', value: 3 },
        ],
    },
    classRpost: { type: Types.Relationship, ref: 'Post', many: true },
    post: { type: Types.Relationship, ref: 'Post', index: true },
});

Classification.defaultColumns = 'post, classificationType';
Classification.register();