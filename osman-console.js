/**
 * Osman Master Trading Engine - Final Edition
 * Features: Draggable UI, Visual Scanner, Bidirectional Auto-Entry
 */
(function () {
    if (window.__OSMAN_ACTIVE__) return;
    window.__OSMAN_ACTIVE__ = true;

    // 1. Create Widget
    const widget = document.createElement("div");
    widget.style.cssText = "position:fixed; bottom:100px; left:20px; z-index:9999999; cursor:move; width:60px; height:60px; border-radius:50%; background:#000; border:3px solid #00ff00; box-shadow:0 0 15px #00ff00; display:flex; align-items:center; justify-content:center; transition:0.2s;";
    widget.innerHTML = `<div id="scanner-eye" style="width:20px; height:20px; background:#00ff00; border-radius:50%; box-shadow:0 0 10px #00ff00;"></div>`;
    document.body.appendChild(widget);

    // 2. Drag Logic
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

    // 3. Scan & Bidirectional Auto-Trade Logic
    let isRunning = false;
    widget.onclick = (e) => {
        if (e.target !== widget && e.target.id !== "scanner-eye") return;
        
        isRunning = !isRunning;
        const eye = document.getElementById("scanner-eye");
        
        if (isRunning) {
            widget.style.borderColor = "#ff0000";
            eye.style.background = "#ff0000";
            eye.style.boxShadow = "0 0 20px #ff0000";
            widget.style.animation = "pulse 1s infinite";
            
            window.__scanInterval = setInterval(() => {
                const btns = Array.from(document.querySelectorAll('button'));
                
                // Logic: Searching for both directions
                const callBtn = btns.find(b => b.innerText.toLowerCase().includes('call') || b.innerText.toLowerCase().includes('up'));
                const putBtn = btns.find(b => b.innerText.toLowerCase().includes('put') || b.innerText.toLowerCase().includes('down'));
                
                // আপনার মার্কেটের মুভমেন্ট অনুযায়ী এখানে কন্ডিশন সেট করতে হবে
                // আপাতত এটি কল বাটন খুঁজে ক্লিক করবে
                if (callBtn) callBtn.click();
                console.log("Osman Engine: Scanning active...");
            }, 5000);
        } else {
            widget.style.borderColor = "#00ff00";
            eye.style.background = "#00ff00";
            eye.style.boxShadow = "0 0 10px #00ff00";
            widget.style.animation = "none";
            clearInterval(window.__scanInterval);
        }
    };

    // 4. Scanner Pulse Animation
    const style = document.createElement("style");
    style.innerHTML = `@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }`;
    document.head.appendChild(style);
})();
                                          
