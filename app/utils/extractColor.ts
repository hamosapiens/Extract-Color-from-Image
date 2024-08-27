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

          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);

          // Define the central region, you can adjust these values
          const centralX = Math.floor(img.width * 0.4);
          const centralY = Math.floor(img.height * 0.4);
          const centralWidth = Math.floor(img.width * 0.2);
          const centralHeight = Math.floor(img.height * 0.2);

          // Get image data for the central area
          const imageData = context.getImageData(centralX, centralY, centralWidth, centralHeight);
          const data = imageData.data;

          // Store color occurrences
          const colorCounts: { [key: string]: number } = {};
          let dominantColor = "";

          for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const alpha = data[i + 3];

              // Skip transparent pixels
              if (alpha < 255) continue;

              const color = `rgb(${r},${g},${b})`;

              // Skip common background colors (white, gray, etc.)
              if (isCommonBackgroundColor(r, g, b)) continue;

              if (!colorCounts[color]) {
                  colorCounts[color] = 0;
              }
              colorCounts[color]++;

              if (!dominantColor || colorCounts[color] > colorCounts[dominantColor]) {
                  dominantColor = color;
              }
          }

          resolve(dominantColor);
      };

      img.onerror = reject;
  });
}

// Helper function to filter out common background colors
function isCommonBackgroundColor(r: number, g: number, b: number): boolean {
  const whiteThreshold = 240;
  const grayThreshold = 20;

  // White or near-white colors
  if (r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) {
      return true;
  }

  // Gray or near-gray colors
  if (Math.abs(r - g) < grayThreshold && Math.abs(g - b) < grayThreshold && Math.abs(r - b) < grayThreshold) {
      return true;
  }

  return false;
}
