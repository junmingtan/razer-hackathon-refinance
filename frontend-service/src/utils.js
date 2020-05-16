export function pickHex(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    function htrgb (hex) {
        return [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7), hex.slice(7,9)].map((h) => parseInt(h, 16));
    }
    color1 = htrgb(color1)
    color2 = htrgb(color2)
    function rgbth(rgb) {
        return rgb.map((d) => d.toString(16).padStart(2, "0")).reduce((a,c) => a + c, "#")
    }
    const rgba = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2),
        Math.round(color1[3] * w1 + color2[3] * w2)];
    return rgbth(rgba);
}
