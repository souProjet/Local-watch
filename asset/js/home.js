const { spawn } = require("child_process");
var config = require("./config.json");

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi,
        function (m, key, value) {
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

if (!$_GET("dir")) {
    const ls = spawn("ls", [config.absolutePathToFilm]);
    ls.stdout.on("data", data => {
        for (var i = 0; i < data.toString().split("\n").length - 1; i++) {

            var film = data.toString().split("\n")[i];

            if (film.split(".").length !== 1) {
                var filmName = film.replace(/(\.[a-zA-Z0-9]+)/, "");
                var filmExtension = film.split('.').pop().toLowerCase();
                if (filmExtension != "avi") {
                    const createMiniature = spawn("ffmpeg", ["-ss", (Math.floor(Math.random() * (3000 - 300)) + 300).toString(), "-i", config.absolutePathToFilm + "/" + film, "-vframes", "1", "-y", "../miniature/" + filmName + ".png"])

                    var img = document.createElement("img");

                    img.src = "./asset/miniature/" + filmName + ".png";
                    img.style.height = "120px";
                    img.style.width = "290px";

                    var a = document.createElement("a");
                    a.href = "./player.html?film=" + i + "&dir=none";
                    a.innerHTML = filmName;


                    a.append(img);

                    document.querySelector(".box").append(a);
                }
            } else {
                var img = document.createElement("img");

                img.src = "./asset/image/dir.png";
                img.style.height = "120px";
                img.style.width = "150px";

                var a = document.createElement("a");
                a.href = "./index.html?dir=" + film;
                a.innerHTML = film;


                a.append(img);

                document.querySelector(".box").append(a);
            }
        }
    });
} else {
    var dir = decodeURI($_GET("dir"))

    const ls = spawn("ls", [config.absolutePathToFilm + "/" + dir]);
    ls.stdout.on("data", data => {
        for (var i = 0; i < data.toString().split("\n").length - 1; i++) {

            var film = data.toString().split("\n")[i];

            var filmName = film.replace(/(\.[a-zA-Z0-9]+)/, "");
            var filmExtension = film.split('.').pop().toLowerCase();
            if (filmExtension != "avi") {

                const createMiniature = spawn("ffmpeg", ["-ss", (Math.floor(Math.random() * (3000 - 300)) + 300).toString(), "-i", config.absolutePathToFilm + "/" + dir + "/" + film, "-vframes", "1", "-y", "./asset/miniature/" + filmName + ".png"])

                var img = document.createElement("img");

                img.src = "./asset/miniature/" + filmName + ".png";
                img.style.height = "120px";
                img.style.width = "290px";

                var a = document.createElement("a");
                a.href = "./player.html?film=" + i + "&dir=" + dir;
                a.innerHTML = filmName;


                a.append(img);

                document.querySelector(".box").append(a);
            }
        }
    });
}
