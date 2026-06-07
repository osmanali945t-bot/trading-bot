/**
 * Osman Final Trading Engine v4.0
 * Features: Volatility Analysis, Auto-Entry, UI Toggle
 */
(function () {
    if (window.__OSMAN_ACTIVE__) return;
    window.__OSMAN_ACTIVE__ = true;

    const LOGO_URL = "https://cdn-icons-png.flaticon.com/512/3233/3233519.png";
    let isScanning = false;
    let scanInterval = null;

    // UI Creation
    const widget = document.createElement("div");
    widget.style.cssText = "position:fixed; bottom:30px; left:30px; z-index:9999999; cursor:pointer; width:60px; height:60px; border-radius:50%; background:#000; border:2px solid #0f0; box-shadow:0 0 15px #0f0; transition:0.3s;";
    widget.innerHTML = `<img src="${LOGO_URL}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    document.body.appendChild(widget);

    // Core Analysis Engine
    function analyzeMarket() {
        // রিয়েল টাইম প্রাইস রিডিং লজিক (আপনার প্ল্যাটফর্মের ক্লাস অনুযায়ী এটি বসান)
        const priceElement = document.querySelector(".chart-price-value") || document.querySelector(".price-value");
        if (!priceElement) return;

        const currentPrice = parseFloat(priceElement.innerText.replace(/[^0-9.]/g, ''));
        
        // ভলাটিলিটি লজিক: গত ৫ সেকেন্ডের মুভমেন্ট অ্যানালাইসিস
        if (window.__lastPrice) {
            const diff = currentPrice - window.__lastPrice;
            
            // যদি প্রাইস দ্রুত উপরের দিকে মুভ করে (Strong Bullish)
            if (diff > 0.0005) {
                executeOrder('UP');
            } 
            // যদি প্রাইস দ্রুত নিচের দিকে মুভ করে (Strong Bearish)
            else if (diff < -0.0005) {
                executeOrder('DOWN');
            }
        }
        window.__lastPrice = currentPrice;
    }

    function executeOrder(direction) {
        const selector = (direction === 'UP') ? ".btn-call" : ".btn-put";
        const btn = document.querySelector(selector);
        if (btn) {
            btn.click();
            console.log(`Osman Engine: Executed ${direction} Entry.`);
        }
    }

    widget.addEventListener("click", () => {
        isScanning = !isScanning;
        if (isScanning) {
            widget.style.boxShadow = "0 0 30px #0f0, 0 0 60px #0f0";
            scanInterval = setInterval(analyzeMarket, 5000);
            console.log("Osman Engine: Scanning Active.");
        } else {
            widget.style.boxShadow = "0 0 15px #0f0";
            clearInterval(scanInterval);
            console.log("Osman Engine: Scanning Inactive.");
        }
    });
})();
