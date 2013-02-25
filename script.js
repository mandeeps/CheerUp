// I don't know what I'm doing!
var xhr = new XMLHttpRequest();
var imgSrc = 0;
var lastImg = 0;
var x;
var list = [];

function loadImgur() {
// Got help from https://github.com/crsrusl/imgurGallery/blob/master/app.js
    for (i = 0; i < 10; i++) {
        $.ajax({
            dataType: "json",
            mimeType: "textPlain", // Firefox needs this?
            type: "GET",
            crossDomain:true,
            url: "https://api.imgur.com/3/gallery/r/aww/top/all/" + i,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Client-ID da42354d6ffb19a");
            },
            success: function(imgur) {
                for (i = 0; i < imgur.data.length; i++) {
                    list.push(imgur.data[i].link);
                }
            }
        });
    }
}

function pickImage() {
    x = Math.floor(Math.random()*list.length);
    if (imgSrc != 0) {lastImg = imgSrc;}
    imgSrc = list[x];
    $('#main').html('<img src=' + imgSrc + '/>');
}

$(document).ready(function() {
    loadImgur();
    navigator.mozApps.getSelf().onsuccess = function() {
        if (navigator.mozApps.getSelf().result) {
            // already installed as Firefox webapp
        }
        else {
            // not installed so show install button
            $('#B2G').css('visibility', 'visible');
        }
    }

    $('#ImgurAPI').click(function() {
        pickImage();
    });
    
    $('#LastImg').click(function() {
        if (lastImg != 0) {
            $('#main').html('<img src=' + lastImg + '/>');
            imgSrc = 0;
        }
    });
    
    $('#B2G').click(function() {
        navigator.mozApps.install('http://mandeeps.github.com/CheerUp/manifest.webapp'); return false;
    });
});
