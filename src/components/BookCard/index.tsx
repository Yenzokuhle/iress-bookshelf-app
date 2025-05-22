import { CustomText, IconButton, PrimaryButton } from "../../elements";
import { MdDeleteOutline } from "react-icons/md";

type BookCardProps = {
  title: string;
  author: string;
  year: string;
  image: string;
  handleIconClick: () => void;
  handleButtonClick: () => void;
  hideActions?: boolean;
};

export const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  year,
  image,
  handleIconClick,
  handleButtonClick,
  hideActions = false,
}: BookCardProps) => {
  return (
    <div className={`w-[300px] h-auto flex flex-col `}>
      <div className="w-full h-[60%] flex flex-col justify-center items-center rounded-t-[20px]">
        <img
          src={image}
          alt="iress-logo"
          className="w-auto h-full object-fill rounded-t-[20px] "
        />
      </div>
      <div className="w-full h-auto border-solid border-l-[1.5px] border-r-[1.5px] border-b-[1.5px] border-[#E2E2E2] rounded-b-[20px] flex flex-col gap-y-2 p-[16px]">
        <CustomText
          textLabel={title}
          fontWeight="font-medium"
          fontSize="text-[24px]"
          fontColor={`text-black`}
        />
        <div className="w-full h-auto flex flex-row justify-between">
          <CustomText
            textLabel={author}
            fontWeight="font-thin"
            fontSize="text-[18px]"
            fontColor={`text-black`}
          />
          <CustomText
            textLabel={year}
            fontWeight="font-thin"
            fontSize="text-[18px]"
            fontColor={`text-black`}
          />
        </div>

        {!hideActions && (
          <div className="w-full h-auto flex flex-row justify-between pt-2">
            <IconButton isNegative={true} handleClick={() => null}>
              <MdDeleteOutline
                className="w-[24px] h-[24px]"
                onClick={handleIconClick}
                fill="#EB5362"
              />
            </IconButton>
            <PrimaryButton
              label={"View more"}
              buttonType={"secondary"}
              handleClick={handleButtonClick}
              isValid={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
