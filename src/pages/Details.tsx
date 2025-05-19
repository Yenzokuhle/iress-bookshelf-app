import React, { useState } from "react";
import { BookEditView, Header, ModalView, RemoveBookView } from "../components";
import { useNavigate } from "react-router-dom";
import { CustomText, IconButton, PrimaryButton } from "../elements";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import BookOne from "/book-one.jpg";

const Details: React.FC = () => {
  const navigate = useNavigate();
  const [modalViewConsent, setModalViewConsent] = useState<boolean>(false);
  const [modalViewEditBook, setModalEditBook] = useState<boolean>(false);

  return (
    <div className="w-full h-auto bg-white flex flex-col items-center p-[48px] gap-y-10">
      <ModalView
        show={modalViewEditBook}
        handleClose={() => setModalEditBook(false)}
      >
        <BookEditView
          isUpdate={true}
          handleCloseButton={() => setModalEditBook(false)}
          activeBook={{
            title: "Different winter",
            description:
              "It's not always easy running a financial services business. Every day there are more demands on time and money. More data. More information. More compliance. More reporting. More competition.",
            author: "Mia Jackson",
            genre: "Novels",
            image: BookOne,
            year: 2024,
          }}
        />
      </ModalView>
      <ModalView
        show={modalViewConsent}
        handleClose={() => setModalViewConsent(false)}
      >
        <RemoveBookView handleCloseButton={() => setModalViewConsent(false)} />
      </ModalView>
      <Header label="Bookshelf App" />
      <div className="w-full h-[500px] flex flex-row gap-x-8">
        <div className="w-full h-auto flex flex-row">
          <IconButton isNegative={false} handleClick={() => null}>
            <IoChevronBackOutline
              className="w-[24px] h-[24px]"
              onClick={() => navigate(-1)}
              fill="#black"
            />
          </IconButton>
          <div className="w-auto grow flex flex-row justify-center items-center">
            <div className="w-fit h-full border-solid border-l-[1.5px] border-r-[1.5px] border-b-[1.5px] border-[#E2E2E2] rounded-[20px] overflow-hidden">
              <img
                src={BookOne}
                alt="iress-logo"
                className="w-auto h-[456px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-between">
          <CustomText
            textLabel={"Different winter"}
            fontWeight="font-medium"
            fontSize="text-[42px]"
            fontColor={`text-black`}
          />
          <CustomText
            textLabel={
              "It's not always easy running a financial services business. Every day there are more demands on time and money. More data. More information. More compliance. More reporting. More competition."
            }
            fontWeight="font-regular"
            fontSize="text-[24px]"
            fontColor={`text-black`}
          />
          <CustomText
            textLabel={"Mia Jackson"}
            fontWeight="font-thin"
            fontSize="text-[30px]"
            fontColor={`text-black`}
          />
          <CustomText
            textLabel={"2024"}
            fontWeight="font-thin"
            fontSize="text-[30px]"
            fontColor={`text-black`}
          />

          <CustomText
            textLabel={"Genre: Novels"}
            fontWeight="font-thin"
            fontSize="text-[22px]"
            fontColor={`text-black`}
          />

          <div className="w-full h-auto flex flex-row gap-x-8 pt-2">
            <PrimaryButton
              label={"Update"}
              buttonType={"secondary"}
              handleClick={() => setModalEditBook(true)}
              isValid={true}
            />
            <IconButton isNegative={true} handleClick={() => null}>
              <MdDeleteOutline
                className="w-[24px] h-[24px]"
                onClick={() => setModalViewConsent(true)}
                fill="#EB5362"
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
