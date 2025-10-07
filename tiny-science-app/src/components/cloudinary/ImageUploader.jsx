"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function ImageUploader({ onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    onFileSelect?.(file);
  };

  return (
    <div className="w-full mt-3">
      {/* Contenedor clickeable */}
      <label
        htmlFor="imageInput"
        className="cursor-pointer w-full border-2 border-dashed border-pink-300 bg-pink-50 hover:bg-pink-100 transition-all rounded-lg flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md text-center"
      >
        <FontAwesomeIcon
          icon={faImage}
          className="text-pink-400 text-3xl mb-2"
        />
        <p className="text-gray-600 text-sm font-medium">
          Selecciona una imagen para subir
        </p>
        {fileName && (
          <p className="text-xs text-gray-500 mt-1 truncate max-w-[90%]">
            {fileName}
          </p>
        )}
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleSelect}
          className="hidden"
        />
      </label>

      {/* Vista previa */}
      {preview && (
        <div className="mt-3 flex justify-center">
          <img
            src={preview}
            alt="Vista previa"
            className="max-h-32 rounded-lg border border-pink-200 shadow-sm object-cover"
          />
        </div>
      )}
    </div>
  );
}
