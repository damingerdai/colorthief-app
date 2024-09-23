import type { MetaFunction } from "@remix-run/node";
import { ChangeEvent, useMemo, useState } from "react";
import { InputFile } from "~/components/input-file";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  
  const [file, setFile] = useState<File>();

  const url = useMemo(() =>  file ? URL.createObjectURL(file) : '', [file])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mt-3">
         <InputFile onChange={handleFileChange} accept="image/*"/>
         { url && <img className="mt-2" width={300} src={url} alt="user upload"/>}
      </div>
    </div>
  );
}