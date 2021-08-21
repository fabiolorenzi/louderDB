from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:sVChIQwU.wqjqsM7@localhost/louderDB'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(db)


#---------------------MODEL-----------------------

class Songs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artist = db.Column(db.String(100))
    title = db.Column(db.String(100))
    album = db.Column(db.String(100))
    year = db.Column(db.Integer)
    format = db.Column(db.String(20))
    genre = db.Column(db.String(50))
    sound_engineer = db.Column(db.String(30))
    peak = db.Column(db.Float)
    true_peak = db.Column(db.Float)
    rms_max = db.Column(db.Float)
    rms_av = db.Column(db.Float)
    lufs_max = db.Column(db.Float)
    lufs_av = db.Column(db.Float)

    def __init__(self, artist, title, album, year, format, genre, sound_engineer, peak, true_peak, rms_max, rms_av, lufs_max, lufs_av):
        self.artist = artist
        self.title = title
        self.album = album
        self.year = year
        self.format = format
        self.genre = genre
        self.sound_engineer = sound_engineer
        self.peak = peak
        self.true_peak = true_peak
        self.rms_max = rms_max
        self.rms_av = rms_av
        self.lufs_max = lufs_max
        self.lufs_av = lufs_av

class SongSchema(ma.Schema):
    class Meta:
        fields = ("id", "artist", "title", "album", "year", "format", "genre", "sound_engineer", "peak", "true_peak",
                "rms_max", "rms_av", "lufs_max", "lufs_av")

song_schema = SongSchema()
songs_schema = SongSchema(many=True)

#---------------------ROUTES-----------------------

@app.route("/", methods = ["GET"])
def getdata():
    allSongs = Songs.query.all()
    results = songs_schema.dump(allSongs)
    return jsonify(results)

@app.route("/<id>", methods = ["GET"])
def getSongById(id):
    song = Songs.query.get(id)
    return song_schema.jsonify(song)

@app.route("/add", methods = ["POST"])
def addSong():
    artist = request.json["artist"]
    title = request.json["title"]
    album = request.json["album"]
    year = request.json["year"]
    format = request.json["format"]
    genre = request.json["genre"]
    sound_engineer = request.json["sound_engineer"]
    peak = request.json["peak"]
    true_peak = request.json["true_peak"]
    rms_max = request.json["rms_max"]
    rms_av = request.json["rms_av"]
    lufs_max = request.json["lufs_max"]
    lufs_av = request.json["lufs_av"]

    songs = Songs(artist, title, album, year, format, genre, sound_engineer, peak, true_peak, rms_max, rms_av, lufs_max, lufs_av)
    db.session.add(songs)
    db.session.commit()
    return song_schema.jsonify(songs)

if __name__ == "__main__":
    app.run(debug=True)