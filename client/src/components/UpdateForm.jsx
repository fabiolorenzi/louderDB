import React, { useState } from "react";

function UpdateForm({id}) {
    const [song, setSong] = useState({
        id: id,
        artist: "",
        title: "",
        album: "",
        year: 0,
        format: "",
        genre: "",
        sound_engineer: "",
        peak: 0,
        true_peak: 0,
        rms_max: 0,
        rms_av: 0,
        lufs_max: 0,
        lufs_av: 0
    });

    const handleChange = e => {
        e.preventDefault();
        setSong({...song, [e.target.name]: e.target.value});
    };

    const updateSong = () => {
        fetch("http://127.0.0.1:5000/update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(song)
        })
        .then(resp => resp.json())
        .catch(err => console.log(err));
        window.location.reload();
    };

    return(
        <div className="formContainer">
            <form onSubmit={updateSong}>
                <input type="text" name="artist" value={song.artist} placeholder="Artist" onChange={handleChange} />
                <input type="text" name="title" value={song.title} placeholder="Title" onChange={handleChange} />
                <input type="text" name="album" value={song.album} placeholder="Album" onChange={handleChange} />
                <label htmlFor="year">Year</label>
                <input type="number" name="year" value={song.year} onChange={handleChange} />
                <input type="text" name="format" value={song.format} placeholder="Format" onChange={handleChange} />
                <input type="text" name="genre" value={song.genre} placeholder="Genre" onChange={handleChange} />
                <input type="text" name="sound_engineer" value={song.sound_engineer} placeholder="Sound Engineer" onChange={handleChange} />
                <label htmlFor="peak">Peak</label>
                <input type="number" step="0.1" name="peak" value={song.peak} placeholder="Peak" onChange={handleChange} />
                <label htmlFor="true_peak">True Peak</label>
                <input type="number"  step="0.1" name="true_peak" value={song.true_peak} placeholder="True Peak" onChange={handleChange} />
                <label htmlFor="rms_max">RMS Max</label>
                <input type="number" step="0.1" name="rms_max" value={song.rms_max} placeholder="RMS Max" onChange={handleChange} />
                <label htmlFor="rms_av">RMS Av</label>
                <input type="number" step="0.1" name="rms_av" value={song.rms_av} placeholder="RMS Av" onChange={handleChange} />
                <label htmlFor="lufs_max">LUFS Max</label>
                <input type="number" step="0.1" name="lufs_max" value={song.lufs_max} placeholder="LUFS Max" onChange={handleChange} />
                <label htmlFor="lufs_av">LUFS Av</label>
                <input type="number" step="0.1"  name="lufs_av" value={song.lufs_av} placeholder="LUFS Av" onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;