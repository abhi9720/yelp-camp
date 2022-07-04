var paths =
    [

        "../img/bg7.jpg",
        "../img/bg4.jpg",
        "../img/bg6.avif",
        "../img/bg8.jpg",
        "../img/bg9.webp",
        "../img/bg11.jpg",
        "../img/bg10.webp",

        "../img/bg12.jpeg",
        "../img/landing.avif",
        "../img/bg13.jpg",
        "../img/landing.avif",
        "../img/gghxttyun7a4labvdsce1sbxkiv0_1615884301_shutterstock_796094905.jpg.webp",
        "../img/9bpxv2xsz4jndv5aiquycl4v21kq_1616055191_shutterstock_1394470064.jpg.jpg",
        "../img/bg2.jpg",
        "../img/bgimg.jpg"


    ];

// https://images.thrillophilia.com/image/upload/s--grqL7Fr3--/c_fill,g_auto,h_642,w_1400/dpr_1.5/v1/collections/images/014/965/483/original/1637752197_TRV-Main-Villa-One-Infinity-Pools-Evening.jpg.jpg"
var bgimagenavbar = document.querySelector("#navbar-search");

var i = 0;

var timer = setInterval(function () {
    // If we've reached the end of the array...

    i = (i + 1) % paths.length;
    bgimagenavbar.style.backgroundImage = 'url(' + paths[i++] + ')'; // Sete the path to the current counter and then increase the counter
}, 9000);



function scrolldown() {
    window.scrollBy(0, 560)
}
