import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
  selectEditStrokeType,
  selectEditStrokeSize,
  selectEditStrokeColor,
  setStrokeType,
  setStrokeColor,
  setStrokeSize,
  selectStrokes,
  drawUndo,
} from "src/redux/imageEditor";
import { Listbox } from "@headlessui/react";
import { Tooltip } from "antd";
import { CheckOutlined, CloseOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";

interface IDrawingTooltipProps {
  onCancel: () => void;
  onConfirm: (strokes) => void;
}
const DrawingTooltip = ({ onCancel, onConfirm }: IDrawingTooltipProps) => {
  const dispatch = useAppDispatch();
  const strokeType = useAppSelector(selectEditStrokeType);
  const strokeSize = useAppSelector(selectEditStrokeSize);
  const strokeColor = useAppSelector(selectEditStrokeColor);
  const strokes = useAppSelector(selectStrokes);

  return (
    <>
      <div className="drawing-tool-container">
        {/* First row*/}
        <div className="drawing-tool-row-1">
          {/* Pick size */}
          <div className="drawing-tool-size-picker">
            <input
              id="size-picker"
              type="range"
              min="1"
              max="100"
              value={strokeSize}
              onChange={(e) => {
                const size = parseInt(e.target.value);
                dispatch(setStrokeSize(size));
              }}
              className="size-slider"
            ></input>
            <div className="size-preview">
              <SizePreview />
            </div>
          </div>
          {/* Cancel */}
          <button className="undo-btn" onClick={() => dispatch(drawUndo())}>
            Undo
          </button>
        </div>

        {/* Second row*/}
        <div className="drawing-tool-row-2">
          {/* Cancel drawing */}
          <Tooltip placement="top" title="Close">
            <button className="close-draw-btn" onClick={onCancel}>
              <CloseOutlined style={{ color: "white", fontSize: "18px" }} />
            </button>
          </Tooltip>
          {/* Pick color */}
          <Listbox
            as="div"
            className="color-listbox-container"
            value={strokeColor}
            onChange={(value: string) => dispatch(setStrokeColor(value))}
          >
            <Listbox.Button
              className="color-listbox-btn"
              style={{ backgroundColor: strokeColor }}
            ></Listbox.Button>
            <Listbox.Options className="color-listbox-options">
              {[
                "#2DD4BF",
                "#F87171",
                "#FB923C",
                "#A3E635",
                "#A78BFA",
                "#FFFFFF",
                "#000000",
              ].map((color) => (
                <Listbox.Option
                  key={color}
                  value={color}
                  className="color-listbox-item"
                  style={{ backgroundColor: color }}
                ></Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

          {/* Set stroke type to draw */}
          <Tooltip placement="top" title="Pen">
            <button
              className="draw-btn"
              style={{ opacity: strokeType === "draw" ? 0.4 : 1 }}
              onClick={() => dispatch(setStrokeType("draw"))}
            >
              <svg
                style={{ color: "white", height: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </button>
          </Tooltip>
          {/* Set stroke type to erase */}
          <Tooltip placement="top" title="Eraser">
            <button
              className="erase-btn"
              style={{ opacity: strokeType === "erase" ? 0.4 : 1 }}
              onClick={() => dispatch(setStrokeType("erase"))}
            >
              <svg
                viewBox="0 0 24 24"
                style={{ color: "white", height: "20px" }}
              >
                <path
                  fill="currentColor"
                  d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z"
                />
              </svg>
            </button>
          </Tooltip>
          {/* Confirm drawing */}
          <Tooltip placement="top" title="Confirm">
            <button
              className="confirm-draw-btn"
              onClick={() => onConfirm(strokes)}
            >
              <CheckOutlined style={{ color: "white", fontSize: "18px" }} />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

const SizePreview = () => {
  const strokeSize = useAppSelector(selectEditStrokeSize);
  const strokeColor = useAppSelector(selectEditStrokeColor);
  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    setHidden(false);
    const interval = setInterval(() => {
      setHidden(true);
    }, 750);
    return () => clearInterval(interval);
  }, [strokeSize, strokeColor]);

  return (
    <div
      className="size-preview-circle"
      style={{
        transform: `scale(${hidden ? 0 : 1})`,
        backgroundColor: strokeColor,
        width: strokeSize,
        height: strokeSize,
        transformOrigin: "bottom center",
        transition: "transform 0.15s ease-out",
      }}
    ></div>
  );
};

export default DrawingTooltip;
