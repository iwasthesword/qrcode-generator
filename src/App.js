import React, { useState } from "react";
import useQRCodeGenerator from "react-hook-qrcode-svg";

const QRCODE_SIZE = 512;
const QRCODE_LEVEL = "Q";
const QRCODE_BORDER = 0;

export default function App() {
  const [value, setValue] = useState("");
  const { path, viewBox } = useQRCodeGenerator(
    value,
    QRCODE_LEVEL,
    QRCODE_BORDER
  );

  function SVGURI() {
    const svgToDataURL = require("svg-to-dataurl");
    var SVGStr =
      '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="' +
      QRCODE_SIZE +
      '" height="' +
      QRCODE_SIZE +
      '" viewBox="' +
      viewBox +
      '" stroke="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="100%" height="100%" fill="#ffffff" /><path d="' +
      path +
      '" fill="#000000" /></svg>';
    return svgToDataURL(SVGStr);
  }
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <input style={{width: "90%"}} value={value} onChange={(e) => setValue(e.target.value)} />
        <p>{value.replace(/[^a-z0-9]/gi, "_").toLowerCase()}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <a href={SVGURI()} download={value.replace(/[^a-z0-9]/gi, "_").toLowerCase()}>
          <svg
            width={QRCODE_SIZE}
            height={QRCODE_SIZE}
            viewBox={viewBox}
            stroke="none"
          >
            <rect width="100%" height="100%" fill="#ffffff" />
            <path d={path} fill="#000000" />
          </svg>
        </a>
      </div>
    </div>
  );
}
