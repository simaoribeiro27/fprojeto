mongoose.connect('mongodb://alfa:alfa1963@ds159880.mlab.com:59880/bdviagens');




var travelSchema = new mongoose.Schema({
    contry: String,
    city: String,
    latitude: Number,
    longitude: Number,
    arrival: Date,
    exit: Date,
    description: String,
    image: { data: Buffer, contentType: String },
    visible: { Boolean, required: false },
    userlog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    moments: [{
        locality: { type: String, required: true },
        weathery: String,
        latitude: Number,
        longitude: Number,
        date: Date,
        description: String,
        media: String,
        classification: [{
            classi: { type: Number },
            date: Date,
        }]
    }]
});

var userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    google: {
        id: String,
        email: String
    }
});


passport.use(new GoogleStrategy({
                clientID: '122247591538-jut7ak75gtm1uuc6efp6i1cdpkrkoehd.apps.googleusercontent.com',
                clientSecret: 'cpDCXw7FAKsdxfmZDpjuIW3t',
                callbackURL: 'http://localhost:8080/auth/google/callback',
            },



            https: //console.developers.google.com/apis/credentials/key/5?project=trips-177815
            chave api = AIzaSyDyxAuCPI7bwygukAwYgIJRNVr - Bvvjy7w