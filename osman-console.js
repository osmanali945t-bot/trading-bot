/**
 * Osman Master Trading Engine v5.0
 * Logic: Price Movement Analysis (UP/DOWN Auto Selection)
 */
(function () {
    if (window.__OSMAN_ACTIVE__) return;
    window.__OSMAN_ACTIVE__ = true;

    // UI creation
    const widget = document.createElement("div");
    widget.style.cssText = "position:fixed; bottom:100px; left:20px; z-index:9999999; cursor:move; width:60px; height:60px; border-radius:50%; background:#000; border:3px solid #00ff00; display:flex; align-items:center; justify-content:center;";
    widget.innerHTML = `<div id="status-light" style="width:20px; height:20px; background:#00ff00; border-radius:50%;"></div>`;
    document.body.appendChild(widget);

    // Dragging support
    let isDragging = false;
    widget.onmousedown = () => isDragging = true;
    document.onmousemove = (e) => {
        if (isDragging) {
            widget.style.left = e.clientX - 30 + "px";
            widget.style.top = e.clientY - 30 + "px";
        }
    };
    document.onmouseup = () => isDragging = false;

    // Smart Engine
    let isRunning = false;
    let lastPrice = 0;

    widget.onclick = () => {
        if (isDragging) return;
        isRunning = !isRunning;
        widget.style.borderColor = isRunning ? "#ff0000" : "#00ff00";
        
        if (isRunning) {
            window.__scanInterval = setInterval(() => {
                // রিয়েল টাইম প্রাইস ডাটা রিডিং
                const priceElement = document.querySelector('.chart-price-value') || document.querySelector('.price-value');
                const currentPrice = priceElement ? parseFloat(priceElement.innerText.replace(/[^0-9.]/g, '')) : 0;

                if (lastPrice !== 0 && currentPrice !== 0) {
                    const buttons = Array.from(document.querySelectorAll('button'));
                    const upBtn = buttons.find(b => b.innerText.toLowerCase() === 'up');
                    const downBtn = buttons.find(b => b.innerText.toLowerCase() === 'down');

                    // লজিক: প্রাইস বাড়লে UP, কমলে DOWN
                    if (currentPrice > lastPrice) {
                        if (upBtn) upBtn.click();
                        console.log("Osman Engine: Price UP -> Triggered UP");
                    } else if (currentPrice < lastPrice) {
                        if (downBtn) downBtn.click();
                        console.log("Osman Engine: Price DOWN -> Triggered DOWN");
                    }
                }
                lastPrice = currentPrice;
            }, 5000);
        } else {
            clearInterval(window.__scanInterval);
        }
    };
})();
