// ==UserScript==
// @name         Melan platform overlay
// @namespace    http://tampermonkey.net/
// @version      69
// @description  Overlay the melanistic star with a custom SVG on all detected composite images
// @author       han
// @match        https://*.pokefarm.com/*
// @match        https://pokefarm.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Tampermonkey script for overlay initialized.");


    function overlaySVG() {
        const targetImages = document.querySelectorAll('img.bbcode_image[src*="platform.png"]');

        if (targetImages.length > 0) {
            console.log(`Found ${targetImages.length} composite images, applying overlay.`);

            targetImages.forEach((targetImage) => {
                // Check if an overlay already exists for this image
                if (!targetImage.parentNode.querySelector('.custom-svg-overlay')) {
                    console.log("No existing overlay found, adding overlay.");

                    // Create a new div to hold the overlay
                    const overlayDiv = document.createElement('div');
                    overlayDiv.className = 'custom-svg-overlay';
                    overlayDiv.style.position = 'absolute';
                    overlayDiv.style.top = '102px';
                    overlayDiv.style.left = '86px';
                    overlayDiv.style.width = '16px';
                    overlayDiv.style.height = '16px';
                    overlayDiv.style.backgroundImage = 'url("https://svgur.com/i/199a.svg")';
                    overlayDiv.style.backgroundSize = 'contain';
                    overlayDiv.style.zIndex = '1000';

                    // Wrap the composite image in a relative container
                    const wrapperDiv = document.createElement('div');
                    wrapperDiv.style.position = 'relative';
                    wrapperDiv.style.display = 'inline-block';
                    targetImage.parentNode.insertBefore(wrapperDiv, targetImage);
                    wrapperDiv.appendChild(targetImage);
                    wrapperDiv.appendChild(overlayDiv);
                } else {
                    console.log("Overlay already exists for this image, skipping.");
                }
            });
        } else {
            console.log("No composite images found.");
        }
    }


    overlaySVG();

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                overlaySVG();
            }
        });
    });

    observer.observe(document, { childList: true, subtree: true });

})();
