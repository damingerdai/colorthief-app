declare module 'colorthief' {
    /**
     * ColorThief Class
     */
    class ColorThief {
        static default: ColorThief;
        /**
         * Get the dominant color from an image.
         * @param img - HTMLImageElement or HTMLCanvasElement from which to extract the color.
         * @param quality - (Optional) Number of pixels to skip. Higher quality values result in better performance but less accurate colors. Default is 10.
         * @returns An array of 3 numbers representing the RGB values of the dominant color.
         */
        getColor(img: HTMLImageElement | HTMLCanvasElement | File, quality?: number): [number, number, number];

        /**
         * Get a color palette from an image.
         * @param img - HTMLImageElement or HTMLCanvasElement from which to extract the palette.
         * @param colorCount - (Optional) Number of colors in the palette. Default is 10.
         * @param quality - (Optional) Number of pixels to skip. Default is 10.
         * @returns An array of RGB color arrays, each representing one color in the palette.
         */
        getPalette(
            img: HTMLImageElement | HTMLCanvasElement | File,
            colorCount?: number,
            quality?: number
        ): [number, number, number][];
    }

    export = ColorThief;
}