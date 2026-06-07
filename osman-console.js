/**
 * Osman Master Trading Engine - Final & Movable
 */
(function () {
    if (window.__OSMAN_ACTIVE__) return;
    window.__OSMAN_ACTIVE__ = true;

    // ১. স্থির বাটন তৈরি (এটি এখন ড্র্যাগ করা যাবে)
    const widget = document.createElement("div");
    widget.style.cssText = "position:fixed; bottom:100px; left:20px; z-index:9999999; cursor:move; width:60px; height:60px; border-radius:50%; background:#000; border:3px solid #00ff00; box-shadow:0 0 15px #00ff00; display:flex; align-items:center; justify-content:center; touch-action: none;";
    widget.innerHTML = `<div id="status-light" style="width:20px; height:20px; background:#00ff00; border-radius:50%;"></div>`;
    document.body.appendChild(widget);

    // ড্র্যাগ লজিক (হাত দিয়ে সরানোর জন্য)
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

    // ২. স্ক্যানার লজিক (UP/DOWN সাপোর্ট)
    let isRunning = false;
    widget.onclick = () => {
        if (isDragging) return; 
        isRunning = !isRunning;
        const light = document.getElementById("status-light");
        widget.style.borderColor = isRunning ? "#ff0000" : "#00ff00";
        light.style.background = isRunning ? "#ff0000" : "#00ff00";

        if (isRunning) {
            window.__scanInterval = setInterval(() => {
                const buttons = document.querySelectorAll('button');
                buttons.forEach(btn => {
                    const text = btn.innerText.toLowerCase();
                    // UP এবং DOWN লজিক অনুযায়ী ক্লিক
                    if (text === 'up') {
                        btn.click();
                        console.log("Osman Engine: Triggered UP");
                    } else if (text === 'down') {
                        btn.click();
                        console.log("Osman Engine: Triggered DOWN");
                    }
                });
            }, 5000);
        } else {
            clearInterval(window.__scanInterval);
        }
    };
})();
