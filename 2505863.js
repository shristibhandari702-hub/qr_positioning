const reader = new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;

    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            const item = JSON.parse(text);

            // Show marker
            showMarkerAt(item.top, item.left);

            // Show inventory info
            showItemInfo(item);

            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });
}
        

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}

// NEW: Show inventory details
function showItemInfo(item) {
    name.innerText = "Name: " + item.Tablename;
    store.innerText = "In store: " + (item.instock ? "Yes" : "No");
    price.innerText = "Price: €" + item.price;
}