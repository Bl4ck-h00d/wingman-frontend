import { useAppSelector } from "src/redux/hooks";
import { selectCrop } from "src/redux/imageEditor";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";


interface ICroppingTooltipProps {
  onCancel: () => void;
  onConfirm: (crop) => void;
}
const CroppingTooltip = ({ onCancel, onConfirm }: ICroppingTooltipProps) => {
  const crop = useAppSelector(selectCrop);
  return (
    <>
      {/* Cancel drawing */}

      <Tooltip placement="top" title="Close">
        <button className="close-crop-btn" onClick={onCancel}>
          <CloseOutlined style={{ color: "white", fontSize: "18px" }} />
        </button>
      </Tooltip>
      {/* Confirm drawing */}
      <Tooltip placement="top" title="Confirm">
        <button className="confirm-crop-btn" onClick={() => onConfirm(crop)}>
          <CheckOutlined style={{ color: "white", fontSize: "18px" }} />
        </button>
      </Tooltip>
    </>
  );
};

export default CroppingTooltip;
