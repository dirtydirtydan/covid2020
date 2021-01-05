/*eslint-disable */
import React, { Component } from "react";
import { app } from "../index";
import Spotify from "../Spotify";
import Accordion from "../CustomComponents/Accordion/Accordion";
import "./classtime.css";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import ChatBox from "../CustomComponents/Chat/ChatBox";
// VARIABLE
const alertyo = true;

// IF Statements
if (alertyo) {
    // alert ("yo")
} else {
    // alert ("no")
}

// REACT COMPONENT
class Template extends React.Component {
    render = () => {
        return <>{/* HTML CODE GOES HERE */}</>;
    };
}

// app.show
app.show(
    <>
        <Template></Template>
    </>
);

// REACT COMPONENT
class Dirty extends React.Component {
    happy = {
        name: "happy",
        text: ": )",
    };
    sad = {
        name: "sad",
        text: ": (",
    };
    angry = {
        name: "angry",
        text: ">: (",
    };

    state = this.happy;

    changeMood = () => {
        if (this.state.name === this.happy.name) {
            this.setState(this.sad);
        } else if (this.state.name === this.sad.name) {
        } else {
            this.setState(this.happy);
        }
    };
    makeAngry = () => {
        this.state(this.angry);
    };
    gaming = () => {
        if (this.state.text === "an yang haseo") {
            this.setState({ text: "goodbye" });
        } else {
            this.setState({ text: "an yang haseo" });
        }
    };

    render = () => {
        return (
            <>
                {/* HTML CODE GOES HERE */}
                <h1 className={this.state.name} onClick={this.changeMood}>
                    {this.state.text}
                </h1>
            </>
        );
    };
}

// app.show
app.show(
    <>
        <Dirty></Dirty>
    </>
);

class Doglist extends React.Component {
    list = [
        {
            breed: "germansheperd",
            color: "black",
        },
        {
            breed: "pitbull",
            color: "gray",
        },
        {
            breed: "lab",
            color: "yellow",
        },
    ];
    render = () => {
        return (
            <>
                {this.list.map(dog => (
                    <h1 key={dog.breed}>
                        {dog.breed} {dog.color}
                    </h1>
                ))}
            </>
        );
    };
}

app.show(
    <>
        <Doglist></Doglist>
    </>
);

const Example_Spotify_Data = {
    tracks: {
        items: [
            {
                name: "Song 1",
                preview_url: "Link to preview mp3 file",
                album: {
                    images: [{ url: "Link to image" }],
                },
            },
            {
                name: "Song 2",
                preview_url: "Link to preview mp3 file",
                album: {
                    images: [{ url: "Link to image" }],
                },
            },
        ],
    },
    artists: {
        items: [
            {
                name: "Mia",
                external_urls: {
                    spotify:
                        "https://open.spotify.com/artist/2nIzOTNOvPxPlgzB4GQHPc",
                },
                images: [{ url: "Link to image" }],
            },
            {
                name: "Blue October",
                external_urls: {
                    spotify:
                        "https://open.spotify.com/artist/2nIzOTNOvPxPlgzB4GQHPc",
                },
                images: [{ url: "Link to image" }],
            },
        ],
    },
    albums: {
        items: [
            {
                name: "Imminent Euphoria",
                total_tracks: 5,
                images: [{ url: "Link to image" }],
            },
            {
                name: "99.9%",
                total_tracks: 16,
                images: [{ url: "Link to image" }],
            },
        ],
    },
};

class SpotifySearch extends React.Component {
    render = () => {
        return (
            <>
                <Spotify.SearchBar />
            </>
        );
    };
}

app.show(
    <>
        <SpotifySearch />
        <Accordion title="Songs">Hello</Accordion>
    </>
);

class MyButton extends React.Component {
    state = { buttonText: "var" };

    render() {
        return (
            <Button
                color="secondary"
                variant="contained"
                onClick={() => this.setState({ buttonText: "new text" })}>
                {this.state.buttonText}
            </Button>
        );
    }
}

app.show(<MyButton />);

function EntirePage(properties) {
    function menuClicked() {
        alert("You clicked the menu");
    }
    function loginClicked() {
        alert("You Logged In");
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={menuClicked}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flex: 1 }}>
                        HELLO
                    </Typography>
                    <Button onClick={loginClicked} color="inherit">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <ChatBox />
        </>
    );
}
app.show(<EntirePage />);
