"use strict";

let interval;
let progress = 0;
let selectedCar = null;
let selectedFilename = null;

let download = document.getElementById("download");
let progressBar = document.getElementById("progress-bar-progress");
let cancelledText = document.getElementById("download-cancelled");
let downloadDone = document.getElementById("download-done");
let showOnCancel = document.getElementById("show-only");
let selectedFilenameEl = document.getElementById("selected-filename");
let filenameText = document.getElementById("filename-text");
let downloadedCarName = document.getElementById("downloaded-car-name");

// Car picker
document.querySelectorAll(".car-option").forEach(function(option) {
    option.addEventListener("click", function() {
        if (download.classList.contains("evil")) return; // don't change during download

        document.querySelectorAll(".car-option").forEach(function(o) {
            o.classList.remove("selected");
        });
        this.classList.add("selected");
        selectedCar = this.dataset.car;
        selectedFilename = this.dataset.filename;

        filenameText.textContent = selectedFilename;
        selectedFilenameEl.classList.remove("hidden");
    });
});

download.addEventListener("click", function(event) {
    if (!download.classList.contains("evil")) {
        if (!selectedCar) {
            // Flash the picker title to hint the user
            let title = document.querySelector(".car-picker-title");
            title.style.color = "#ff4444";
            title.textContent = "PLEASE SELECT A CAR FIRST:";
            setTimeout(function() {
                title.style.color = "";
                title.textContent = "SELECT YOUR CAR TO DOWNLOAD:";
            }, 1200);
            return;
        }

        download.innerHTML = "CANCEL";
        download.classList.add("evil");

        interval = setInterval(function() {
            progress++;
            progressBar.style.width = progress + "%";

            if (progress === 100) {
                clearInterval(interval);
                downloadedCarName.textContent = selectedFilename;
                downloadDone.classList.remove("hidden");
                let iframe = document.createElement("iframe");
                iframe.width = "100%";
                iframe.height = "166";
                iframe.scrolling = "no";
                iframe.frameBorder = "no";
                iframe.allow = "autoplay";
                iframe.src = "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/rand0ll/u-wouldnt-download-a-car&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";
                document.getElementById("soundcloud-player").appendChild(iframe);
            }
        }, 50);
    } else {
        if (progress < 100) {
            download.classList.remove("evil");
            download.classList.add("hidden");
            download.innerHTML = "DOWNLOAD CAR";
            clearInterval(interval);

            progressBar.style.width = "0%";

            cancelledText.classList.remove("hidden");

            showOnCancel.classList.add("only-showing");
        }
    }
});
