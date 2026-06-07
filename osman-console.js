/**
 * Osman Smart Trading Engine - Final Directional Logic
 * Features: Drag & Drop, Smart Auto-Entry (Separated Buttons)
 */
(function () {
    if (window.__OSMAN_ACTIVE__) return;
    window.__OSMAN_ACTIVE__ = true;

    // ১. মুভেবল বাটন তৈরি
    const widget = document.createElement("div");
    widget.style.cssText = "position:fixed; bottom:100px; left:20px; z-index:9999999; cursor:move; width:60px; height:60px; border-radius:50%; background:#000; border:3px solid #00ff00; box-shadow:0 0 15px #00ff00; display:flex; align-items:center; justify-content:center; touch-action: none;";
    widget.innerHTML = `<div id="status-light" style="width:20px; height:20px; background:#00ff00; border-radius:50%;"></div>`;
    document.body.appendChild(widget);

    // ড্র্যাগ লজিক
    let isDragging = false;
    widget.addEventListener('mousedown', (e) => { isDragging = true; });
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            widget.style.left = (e.clientX - 30) + "px";
            widget.style.top = (e.clientY - 30) + "px";
            widget.style.bottom = "auto";
        }
    });
    document.addEventListener('mouseup', () => { isDragging = false; });

    // ২. স্মার্ট স্ক্যানার ও ডিরেকশন লজিক
    let isRunning = false;
    widget.onclick = () => {
        if (isDragging) return;
        isRunning = !isRunning;
        const light = document.getElementById("status-light");
        widget.style.borderColor = isRunning ? "#ff0000" : "#00ff00";
        light.style.background = isRunning ? "#ff0000" : "#00ff00";

        if (isRunning) {
            window.__scanInterval = setInterval(() => {
                // স্মার্ট বাটন ডিটেকশন
                const buttons = Array.from(document.querySelectorAll('button'));
                const upBtn = buttons.find(b => b.innerText.trim().toLowerCase() === 'up');
                const downBtn = buttons.find(b => b.innerText.trim().toLowerCase() === 'down');

                // আপনার কন্ডিশন অনুযায়ী এন্ট্রি (বর্তমানে শুধু ডেমো লজিক)
                // আপনি এখানে আপনার এনালাইসিস যোগ করবেন
                const shouldGoUp = true; // এখানে আপনার লজিক বসবে
                
                if (shouldGoUp && upBtn) {
                    upBtn.click();
                    console.log("Osman Engine: Successfully clicked UP");
                } else if (!shouldGoUp && downBtn) {
                    downBtn.click();
                    console.log("Osman Engine: Successfully clicked DOWN");
                }
            }, 5000);
        } else {
            clearInterval(window.__scanInterval);
        }
    };
})();
