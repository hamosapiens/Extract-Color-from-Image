export async function advancedExtractColorFromImage(imageUrl: string): Promise<string> {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    return new Promise<string>((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) {
                reject("Context not available");
                return;
            }

            // Slightly zoom into the image to avoid the edges
            const zoomFactor = 0.1;
            const zoomedWidth = img.width * (1 - zoomFactor);
            const zoomedHeight = img.height * (1 - zoomFactor);
            const offsetX = (img.width - zoomedWidth) / 2;
            const offsetY = (img.height - zoomedHeight) / 2;

            canvas.width = zoomedWidth;
            canvas.height = zoomedHeight;
            context.drawImage(img, offsetX, offsetY, zoomedWidth, zoomedHeight, 0, 0, zoomedWidth, zoomedHeight);

            // Define a central region excluding corners and edges
            const centralStartX = Math.floor(zoomedWidth * 0.25);
            const centralStartY = Math.floor(zoomedHeight * 0.25);
            const centralWidth = Math.floor(zoomedWidth * 0.5);
            const centralHeight = Math.floor(zoomedHeight * 0.5);

            const imageData = context.getImageData(centralStartX, centralStartY, centralWidth, centralHeight);
            const data = imageData.data;

            // Color occurrences with increased central weighting
            const colorCounts: { [key: string]: { count: number, weight: number } } = {};
            let dominantColor = "";
            let maxWeightedCount = 0;

            const centerX = centralWidth / 2;
            const centerY = centralHeight / 2;
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

            for (let y = 0; y < centralHeight; y++) {
                for (let x = 0; x < centralWidth; x++) {
                    const index = (y * centralWidth + x) * 4;
                    const r = data[index];
                    const g = data[index + 1];
                    const b = data[index + 2];
                    const alpha = data[index + 3];

                    if (alpha < 255) continue; // Skip transparent pixels

                    const color = `rgb(${r},${g},${b})`;

                    if (isCommonBackgroundColor(r, g, b)) continue; // Skip background colors

                    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                    const weight = Math.pow(1 - (distance / maxDistance), 2); // Increase weight for central pixels

                    if (!colorCounts[color]) {
                        colorCounts[color] = { count: 0, weight: 0 };
                    }

                    colorCounts[color].count++;
                    colorCounts[color].weight += weight;

                    // Determine if this color should be the dominant color
                    if (colorCounts[color].weight > maxWeightedCount) {
                        maxWeightedCount = colorCounts[color].weight;
                        dominantColor = color;
                    }
                }
            }

            resolve(dominantColor || "rgb(255,255,255)"); // Default to white if no color found
        };

        img.onerror = reject;
    });
}

// Helper function to filter out common background colors
function isCommonBackgroundColor(r: number, g: number, b: number): boolean {
    const whiteThreshold = 140;
    const grayThreshold = 10;

    // White or near-white colors
    if (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) {
        return true;
    }

    // Gray or near-gray colors
    if (
        Math.abs(r - g) < grayThreshold &&
        Math.abs(g - b) < grayThreshold &&
        Math.abs(r - b) < grayThreshold
    ) {
        return true;
    }

    return false;
}
