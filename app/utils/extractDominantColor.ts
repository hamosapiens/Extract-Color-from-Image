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
            const zoomFactor = 0.2;
            const zoomedWidth = img.width * (1 - zoomFactor);
            const zoomedHeight = img.height * (1 - zoomFactor);
            const offsetX = (img.width - zoomedWidth) / 2;
            const offsetY = (img.height - zoomedHeight) / 2;

            canvas.width = zoomedWidth;
            canvas.height = zoomedHeight;
            context.drawImage(img, offsetX, offsetY, zoomedWidth, zoomedHeight, 0, 0, zoomedWidth, zoomedHeight);

            // Get colors from the borders
            const borderColors = getBorderColors(context, zoomedWidth, zoomedHeight);

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

                    // Calculate weight based on distance from center
                    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                    let weight = Math.pow(1 - (distance / maxDistance), 2); // Increase weight for central pixels

                    // Compare with border colors and adjust weight
                    if (isSimilarToBorderColor(color, borderColors)) {
                        weight *= 0.5; // Reduce weight if similar to border color
                    }

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

            // Apply a slight boost to bright colors if they are dominant
            dominantColor = applyBrightColorBoost(dominantColor);

            resolve(dominantColor || "rgb(255,255,255)"); // Default to white if no color found
        };

        img.onerror = reject;
    });
}

// Function to get the average colors from the borders of the image
function getBorderColors(context: CanvasRenderingContext2D, width: number, height: number): string[] {
    const borders = [
        context.getImageData(0, 0, width, 1), // Top border
        context.getImageData(0, height - 1, width, 1), // Bottom border
        context.getImageData(0, 0, 1, height), // Left border
        context.getImageData(width - 1, 0, 1, height) // Right border
    ];

    const borderColors = [];

    for (const border of borders) {
        const data = border.data;
        const r = data[0];
        const g = data[1];
        const b = data[2];
        borderColors.push(`rgb(${r},${g},${b})`);
    }

    return borderColors;
}

// Function to check if a color is similar to any of the border colors
function isSimilarToBorderColor(color: string, borderColors: string[]): boolean {
    const rgb = color.match(/\d+/g)?.map(Number);
    if (!rgb) return false;

    for (const borderColor of borderColors) {
        const borderRgb = borderColor.match(/\d+/g)?.map(Number);
        if (!borderRgb) continue;

        const distance = Math.sqrt(
            Math.pow(rgb[0] - borderRgb[0], 2) +
            Math.pow(rgb[1] - borderRgb[1], 2) +
            Math.pow(rgb[2] - borderRgb[2], 2)
        );

        if (distance < 50) { // Adjust this threshold as needed
            return true;
        }
    }

    return false;
}

// Helper function to boost bright colors if they are dominant
function applyBrightColorBoost(color: string): string {
    const rgb = color.match(/\d+/g)?.map(Number);
    if (rgb && rgb.length === 3) {
        const [r, g, b] = rgb;
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        // If the luminance is high, boost the color slightly
        if (luminance > 200) {
            return `rgb(${Math.min(r + 10, 255)},${Math.min(g + 10, 255)},${Math.min(b + 10, 255)})`;
        }
    }
    return color;
}
