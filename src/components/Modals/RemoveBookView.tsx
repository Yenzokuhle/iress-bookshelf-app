import type { FC } from "react";
import { CustomText, IconButton, PrimaryButton } from "../../elements";
import { IoMdClose } from "react-icons/io";
import BookCard from "../BookCard";
import BookOne from "/book-one.jpg";
import { type Book } from "../../helpers/types";

type RemoveBookViewProps = {
  handleCloseButton: () => void;
  activeBook?: Book;
};

const RemoveBookView: FC<RemoveBookViewProps> = ({
  handleCloseButton,
}: RemoveBookViewProps) => {
  return (
    <div className="w-[700px] h-auto flex flex-col gap-y-4 bg-white rounded-[24px] mMD:rounded-[20px] overflow-hidden py-8 relative pr-[24px]">
      <div className="w-full h-auto bg-iress-primary flex flex-row justify-between px-[20px] py-[16px] rounded-r-full">
        <CustomText
          textLabel={"Remove book"}
          fontWeight="font-regular"
          fontSize="text-[26px]"
          fontColor={`text-white`}
        />

        <IconButton isNegative={false} handleClick={() => null}>
          <IoMdClose
            className="w-[24px] h-[24px]"
            onClick={handleCloseButton}
            fill="#black"
          />
        </IconButton>
      </div>
      <div className="w-full h-auto flex flex-row pl-[24px]">
        <div className="w-full h-auto">
          <BookCard
            title={"Different winter"}
            author={"Mia Jackson"}
            year={"2024"}
            image={BookOne}
            handleIconClick={() => null}
            handleButtonClick={() => null}
            hideActions={true}
          />
        </div>
        <div className="w-full h-full flex flex-col gap-y-8 justify-center">
          <div className="w-full h-auto flex flex-col gap-y-2">
            <CustomText
              textLabel={"Are you sure you want to delete the following book?"}
              fontWeight="font-regular"
              fontSize="text-[22px]"
              fontColor={`text-black`}
            />

            <CustomText
              textLabel={"Different Winter"}
              fontWeight="font-medium"
              fontSize="text-[22px]"
              fontColor={`text-black`}
            />
          </div>
          <div className="w-full h-auto flex flex-col gap-y-2">
            <CustomText
              textLabel={"This action cannot be undone."}
              fontWeight="font-regular"
              fontSize="text-[12px]"
              fontColor={`text-black`}
            />

            <div className="w-fit h-auto">
              <PrimaryButton
                label={"Delete book"}
                buttonType={"accent"}
                handleClick={() => null}
                isValid={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBookView;
