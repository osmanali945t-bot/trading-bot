/**
 * Osman Trading Engine - Expert Edition (Quotex Target)
 * Scans Chart Area & Executes Trades via Official Buttons
 */
(function () {
    if (window.__OSMAN_ACTIVE__) return;
    window.__OSMAN_ACTIVE__ = true;

    // 1. Movable UI Widget
    const widget = document.createElement("div");
    widget.style.cssText = "position:fixed; bottom:150px; left:20px; z-index:9999999; cursor:move; width:60px; height:60px; background:#000; border:3px solid #00ff00; border-radius:50%; display:flex; align-items:center; justify-content:center; touch-action:none; box-shadow:0 0 15px #00ff00;";
    widget.innerHTML = `<div id="status" style="width:20px; height:20px; background:#00ff00; border-radius:50%;"></div>`;
    document.body.appendChild(widget);

    // Drag Logic
    let isDragging = false;
    widget.onmousedown = (e) => { isDragging = true; };
    document.onmousemove = (e) => {
        if (isDragging) {
            widget.style.left = (e.clientX - 30) + "px";
            widget.style.top = (e.clientY - 30) + "px";
        }
    };
    document.onmouseup = () => { isDragging = false; };

    // 2. Intelligent Scanner
    let isRunning = false;
    widget.onclick = () => {
        if (isDragging) return;
        isRunning = !isRunning;
        document.getElementById("status").style.background = isRunning ? "#ff0000" : "#00ff00";

        if (isRunning) {
            window.__scan = setInterval(() => {
                // Targeting Quotex Specific Buttons
                const upBtn = document.querySelector('[data-test="btn-up"]');
                const downBtn = document.querySelector('[data-test="btn-down"]');
                
                // Reading Price from Chart Area
                const priceElement = document.querySelector('.chart-price-value') || document.querySelector('.price-value');
                const currentPrice = parseFloat(priceElement?.innerText.replace(/[^0-9.]/g, ''));

                if (window.__lastPrice && currentPrice) {
                    // Logic: If price increases, hit UP. If decreases, hit DOWN.
                    if (currentPrice > window.__lastPrice) {
                        if (upBtn) upBtn.click();
                        console.log("Trend: Price Up, Executing UP Trade");
                    } else if (currentPrice < window.__lastPrice) {
                        if (downBtn) downBtn.click();
                        console.log("Trend: Price Down, Executing DOWN Trade");
                    }
                }
                window.__lastPrice = currentPrice;
            }, 1000); // Scans every 1 second
        } else {
            clearInterval(window.__scan);
        }
    };
})();
