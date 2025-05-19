import { CustomText } from "..";
import { BUTTON_TYPES, Primary_Button_Types } from "../../helpers/types";

type PrimaryButtonProps = {
  label: string;
  type?: keyof typeof BUTTON_TYPES;
  buttonType: keyof typeof Primary_Button_Types;
  handleClick: () => void;
  isValid: boolean;
};

const handleButtonBackground = (name: keyof typeof Primary_Button_Types) => {
  if (name) {
    switch (name) {
      case "hollow":
        return "bg-white border-solid border-[1.5px] border-iress-secondary";
      case "secondary":
        return "bg-iress-secondary";
      case "accent":
        return "bg-iress-accent";
      default:
        break;
    }
  }
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  type = BUTTON_TYPES.reset,
  buttonType,
  handleClick,
  isValid,
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`w-auto h-fit ${buttonType} ${
        !isValid ? "bg-[#a4a4a4]" : `${handleButtonBackground(buttonType)}`
      }   active:scale-[1.02] flex flex-col rounded-full  cursor-pointer px-5 py-1 items-center`}
    >
      <CustomText
        textLabel={label}
        fontWeight="font-regular"
        fontSize="text-[16px]"
        fontColor={buttonType === "hollow" ? `text-black` : `text-white`}
      />
    </button>
  );
};

export default PrimaryButton;
