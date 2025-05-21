import { useState, type FC } from "react";
import { CustomText, IconButton, PrimaryButton } from "../../elements";
import { IoMdClose } from "react-icons/io";
import BookCard from "../BookCard";
import BookOne from "/book-one.jpg";
import { type Book } from "../../helpers/types";

type DataResponse = {
  message: string;
  isSuccess: boolean;
  data: number;
};

type RemoveBookViewProps = {
  handleCloseButton: () => void;
  activeBook?: Book;
};

const RemoveBookView: FC<RemoveBookViewProps> = ({
  handleCloseButton,
  activeBook,
}: RemoveBookViewProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const customHandleSubmit = async (id: string) => {
    setIsLoading(true);

    try {
      setIsLoading(true);
      await fetch(
        `${import.meta.env.VITE_PUBLIC_API_HOST}/api/Book/DeleteBook/${id}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        res.json().then(async (data: DataResponse) => {
          console.log(`DATA: `, data);
          setIsLoading(false);

          if (data?.isSuccess) {
            handleCloseButton();
          } else {
            //set error message
          }
        });
      });
    } catch (error) {
      console.log(`Error: `, error);
      setIsLoading(false);
    }
  };

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
            title={activeBook?.title || ""}
            author={activeBook?.author || ""}
            year={activeBook?.year.toString() || ""}
            image={activeBook?.image || BookOne}
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
              textLabel={activeBook?.title || ""}
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
              {isLoading ? (
                <CustomText
                  textLabel={"Loading ..."}
                  fontWeight="font-medium"
                  fontSize="text-[24px]"
                  fontColor={`text-black`}
                />
              ) : (
                <PrimaryButton
                  label={"Delete book"}
                  buttonType={"accent"}
                  handleClick={() => customHandleSubmit(activeBook?.id || "")}
                  isValid={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBookView;
