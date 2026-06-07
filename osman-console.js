/**
 * Osman Master Engine - Native Clicker Edition
 * Targets: Quotex Trading Buttons
 */
(function () {
    if (window.__OSMAN_ACTIVE__) return;
    window.__OSMAN_ACTIVE__ = true;

    // 1. Movable UI
    const widget = document.createElement("div");
    widget.style.cssText = "position:fixed; bottom:100px; left:20px; z-index:9999999; cursor:move; width:60px; height:60px; background:#000; border:3px solid #00ff00; border-radius:50%; display:flex; align-items:center; justify-content:center; touch-action:none;";
    widget.innerHTML = `<div id="status" style="width:20px; height:20px; background:#00ff00; border-radius:50%;"></div>`;
    document.body.appendChild(widget);

    // Drag Logic
    let isDragging = false;
    widget.onmousedown = () => isDragging = true;
    document.onmousemove = (e) => {
        if (isDragging) {
            widget.style.left = (e.clientX - 30) + "px";
            widget.style.top = (e.clientY - 30) + "px";
        }
    };
    document.onmouseup = () => isDragging = false;

    // 2. Native Trigger Logic
    function triggerClick(element) {
        if (!element) return;
        // Native mouse event simulation
        const events = ['mousedown', 'mouseup', 'click'];
        events.forEach(eventType => {
            const ev = new MouseEvent(eventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            });
            element.dispatchEvent(ev);
        });
    }

    let isRunning = false;
    widget.onclick = () => {
        if (isDragging) return;
        isRunning = !isRunning;
        document.getElementById("status").style.background = isRunning ? "#ff0000" : "#00ff00";

        if (isRunning) {
            window.__scan = setInterval(() => {
                // Targeting by data-test attribute (Quotex standard)
                const upBtn = document.querySelector('[data-test="btn-up"]');
                const downBtn = document.querySelector('[data-test="btn-down"]');
                
                // Simplified Trend Logic
                const currentPrice = parseFloat(document.querySelector('.price-value')?.innerText);
                if (window.__lastPrice && currentPrice) {
                    if (currentPrice > window.__lastPrice) {
                        triggerClick(upBtn);
                        console.log("Triggered UP");
                    } else if (currentPrice < window.__lastPrice) {
                        triggerClick(downBtn);
                        console.log("Triggered DOWN");
                    }
                }
                window.__lastPrice = currentPrice;
            }, 1000);
        } else {
            clearInterval(window.__scan);
        }
    };
})();
