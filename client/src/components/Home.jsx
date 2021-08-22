import React, { useState, useEffect } from "react";

function Home() {

    //------------------STATES--------------------


    const [songs, setSongs] = useState([]);
    const [song, setSong] = useState({
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
    const [update, setUpdate] = useState(false);


    //------------------INITIAL_EFFECTS--------------------


    useEffect(() => {
        fetch("http://localhost:5000/", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }
        })
        .then(resp => resp.json())
        .then(res => setSongs(res))
        .catch(err => console.log(err));
    }, []);


    //------------------BUTTONS_FUNCTIONS--------------------

    const handleChange = e => {
        e.preventDefault();
        setSong({...song, [e.target.name]: e.target.value});
        console.log(song);
    };


    const addSong = () => {
        fetch("http://127.0.0.1:5000/add", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(song)
        })
        .then(resp => resp.json())
        .catch(err => console.log(err));
        window.location.reload();
    };

    const updater = e => {
        e.preventDefault();
        setUpdate(!update);
    };

    const remover = (e, id) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:5000/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json"
            }
        })
        .then(res => console.log("removed"))
        .catch(err => console.log(err));
        window.location.reload();
    };


    //------------------RETURN--------------------


    return(
        <div className="homeContainer">
            <h1>Insert New Song</h1>
            <form onSubmit={addSong}>
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
                <button type="submit">Add</button>
            </form>
            <h1>Songs Data</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Title</th>
                        <th>Album</th>
                        <th>Year</th>
                        <th>Format</th>
                        <th>Genre</th>
                        <th>Sound Engineer</th>
                        <th>Peak</th>
                        <th>True Peak</th>
                        <th>RMS Max</th>
                        <th>RMS Av</th>
                        <th>LUFS Max</th>
                        <th>LUFS Av</th>
                    </tr>
                </thead>
                <tbody>
                    {!songs ? "" : songs.map(song => {
                        return <tr key={song.id}>
                            <td>{song.artist}</td>
                            <td>{song.title}</td>
                            <td>{song.album}</td>
                            <td>{song.year}</td>
                            <td>{song.format}</td>
                            <td>{song.genre}</td>
                            <td>{song.sound_engineer}</td>
                            <td>{song.peak} dB</td>
                            <td>{song.true_peak} dB</td>
                            <td>{song.rms_max} dB</td>
                            <td>{song.rms_av} dB</td>
                            <td>{song.lufs_max} LUFS</td>
                            <td>{song.lufs_av} LUFS</td>
                            <td>
                                <button onClick={updater}>Update</button>
                                <button onClick={e => remover(e, song.id)}>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Home;