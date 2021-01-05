import React from "react";

function debounce(fn, wait = 400) {
    let timeout = null;
    return (...args) => {
        clearTimeout(timeout);
        return new Promise((resolve) => {
            timeout = setTimeout(() => {
                timeout = null;
                resolve(fn(...args));
            }, wait);
        });
    };
}

export default class Spotify {
    static baseURL = "https://api.spotify.com/v1/";
    static client_creds = btoa(
        "2d38679d03b04cdfb39384814e2b8d0e:03013c1224e34de0ba46dd98e1f38739"
    );
    static access_token;

    static GET_Request = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Spotify.access_token}`,
        },
    };

    static async authenticate() {
        const formData = new FormData();
        formData.append("grant_type", "client_credentials");

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Spotify.client_creds}`,
            },
            body: new URLSearchParams(formData),
        });
        const json = await response.json();

        Spotify.access_token = json.access_token;
    }

    static async fetch(url, request) {
        if (!Spotify.access_token) await Spotify.authenticate();
        request.headers.Authorization = `Bearer ${Spotify.access_token}`;
        const response = await fetch(Spotify.baseURL + url, request);
        return await response.json();
    }

    static GET(url) {
        return Spotify.fetch(url, Spotify.GET_Request);
    }

    // mia's id: 5cbHD2ZEOKgTdLt9i8IOlE
    static async getTopTracks(artistId) {
        const json = await Spotify.GET(
            `artists/${artistId}/top-tracks?country=US`
        );
        return json.tracks;
    }

    static search = debounce((string) =>
        Spotify.GET(
            `search?q=${encodeURIComponent(string)}&type=artist%2Ctrack%2Calbum`
        )
    );

    static playlists = debounce((string) =>
        Spotify.GET(`search?q=${encodeURIComponent(string)}&type=playlist`)
    );

    static SearchBar(props) {
        return (
            <>
                <input
                    type="text"
                    placeholder="Search for Artists, Songs, or Albums"
                    autoCorrect="off"
                    maxLength="80"
                    autoCapitalize="off"
                    spellCheck="false"
                    onChange={(event) => {
                        if (!props.onFound) return;
                        const safe_results = {
                            albums: { items: [] },
                            tracks: { items: [] },
                            artists: { items: [] },
                        };
                        if (event.currentTarget.value.length < 3) {
                            props.onFound(safe_results);
                            return;
                        }
                        Spotify.search(event.currentTarget.value).then(
                            (results) => {
                                Object.assign(safe_results, results);
                                props.onFound(safe_results);
                            }
                        );
                    }}
                    style={{
                        color: "rgb(0, 0, 0)",
                        padding: "14px 48px",
                        width: "550px",
                        fontSize: "x-large",
                        border: "0px",
                        margin: "50px auto",
                        borderRadius: "500px",
                        textOverflow: "ellipsis",
                        boxSizing: "border-box",
                        outline: "none",
                        display: "block",
                    }}
                />
            </>
        );
    }
}
