import type { MetaFunction } from "@remix-run/node";
import { ChangeEvent, useMemo, useState } from "react";
import { InputFile } from "~/components/input-file";
import ColorThief from 'colorthief';
import { AspectRatio } from "@radix-ui/react-aspect-ratio";


console.log(ColorThief, typeof ColorThief)


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const [file, setFile] = useState<File>();
  const [color, setColor] = useState<[number, number, number]>();
  const [palettes, setPalettes] = useState<[number, number, number][]>();

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // Resolve when done
      reader.onerror = reject; // Reject if there's an error
      reader.readAsDataURL(file);
    });
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img); // Resolve when the image is loaded
      img.onerror = reject; // Reject if the image can't be loaded
      img.src = src;
    });
  }

  const rgbTupleToColor = ([r, g, b]: [number, number, number]): string => {
    // Option 1: Use the rgb() CSS function
    const rgbColor = `rgb(${r}, ${g}, ${b})`;

    // Option 2: Convert to hex color
    // const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

    return rgbColor;
  }

  const url = useMemo(() => file ? URL.createObjectURL(file) : '', [file]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const f = e.target.files[0];
      setFile(f);
      const colorThief = new ColorThief();
      const dataUrl = await readFileAsDataURL(f);
      const img = await loadImage(dataUrl);
      const color = colorThief.getColor(img);
      setColor(color);
      const palettes = colorThief.getPalette(img);
      setPalettes(palettes);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="mt-3">
        <InputFile onChange={handleFileChange} accept="image/*" />
      </div>
      {url && <img className="mt-2" width={300} src={url} alt="user upload" />}
      {color && <div className="flex flex-col justify-center items-center">
        <h3>Dominant Color</h3>
        <div className="w-16 h-16 rounded-full bg-slate-300" style={{ backgroundColor: rgbTupleToColor(color) }}></div>
      </div>}
      {palettes && <div className="flex flex-col justify-center">
        <h3>Palette</h3>
        <div className="flex gap-1">
         {
          palettes.map((palette) =>  <div className="w-12 h-12 rounded-full bg-slate-300" key={rgbTupleToColor(palette)} style={{ backgroundColor: rgbTupleToColor(palette) }}></div> )
         }
         </div>
      </div>}
    </div >
  );
}