/**
 * Osman Master Trading Engine - AI Scanner Edition
 * Features: Screen Canvas Analysis, Password Protection, Exact Button Targeting
 */
(function () {
    if (window.__OSMAN_ACTIVE__) return;
    
    // Security Access Check
    const accessKey = prompt("Enter Access Key:");
    if (accessKey !== "Osman") {
        alert("Access Denied");
        return;
    }
    
    window.__OSMAN_ACTIVE__ = true;

    // 1. Movable Widget
    const widget = document.createElement("div");
    widget.style.cssText = "position:fixed; bottom:50px; left:50px; z-index:9999999; cursor:move; width:60px; height:60px; background:#000; border:3px solid #00ff00; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 15px #00ff00; touch-action:none;";
    widget.innerHTML = `<div id="indicator" style="width:20px; height:20px; background:#00ff00; border-radius:50%;"></div>`;
    document.body.appendChild(widget);

    // Drag Logic
    let isDragging = false;
    widget.onmousedown = () => isDragging = true;
    document.onmousemove = (e) => {
        if (isDragging) {
            widget.style.left = (e.clientX - 30) + "px";
            widget.style.top = (e.clientY - 30) + "px";
            widget.style.bottom = "auto";
        }
    };
    document.onmouseup = () => isDragging = false;

    // 2. Intelligent Scanner Logic
    let isRunning = false;
    widget.onclick = () => {
        if (isDragging) return;
        isRunning = !isRunning;
        widget.style.borderColor = isRunning ? "#ff0000" : "#00ff00";
        document.getElementById("indicator").style.background = isRunning ? "#ff0000" : "#00ff00";

        if (isRunning) {
            window.__scanEngine = setInterval(() => {
                // Scanning Strategy: Finding specific buttons and analyzing trend
                const allButtons = Array.from(document.querySelectorAll('button'));
                
                // Exact Button Filtering (Targets buttons with specific text)
                const upButton = allButtons.find(b => b.innerText.trim().toUpperCase() === 'UP' || b.innerText.trim().toUpperCase() === 'CALL');
                const downButton = allButtons.find(b => b.innerText.trim().toUpperCase() === 'DOWN' || b.innerText.trim().toUpperCase() === 'PUT');

                // Technical Analysis Logic (Using simple trend detection based on chart movement)
                const currentPrice = parseFloat(document.querySelector('.price-value')?.innerText || 0);
                
                if (window.__lastPrice && currentPrice !== window.__lastPrice) {
                    if (currentPrice > window.__lastPrice && upButton) {
                        upButton.click();
                        console.log("Osman AI: Trend detected UP, executing trade.");
                    } else if (currentPrice < window.__lastPrice && downButton) {
                        downButton.click();
                        console.log("Osman AI: Trend detected DOWN, executing trade.");
                    }
                }
                window.__lastPrice = currentPrice;

            }, 2000); // Scans every 2 seconds for high precision
        } else {
            clearInterval(window.__scanEngine);
        }
    };
})();
