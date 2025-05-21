import React, { useEffect, useState } from "react";
import { BookEditView, Header, ModalView, RemoveBookView } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { CustomText, IconButton, PrimaryButton } from "../elements";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import BookOne from "/book-one.jpg";
import type { Book } from "../helpers/types";
//import { useQueryParam } from "../helpers/utilities";

type DataResponse = {
  message: string;
  isSuccess: boolean;
  data: Book;
};

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { bookID } = useParams();
  const [modalViewConsent, setModalViewConsent] = useState<boolean>(false);
  const [modalViewEditBook, setModalEditBook] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookFromApi, setBookFromApi] = useState<Book | undefined>();

  const handleGetBooks = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `${
          import.meta.env.VITE_PUBLIC_API_HOST
        }/api/Book/GetBookById/${bookID}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        res.json().then(async (data: DataResponse) => {
          setIsLoading(false);
          if (data?.isSuccess) {
            setBookFromApi(data?.data);
          } else {
            setBookFromApi(undefined);
          }
        });
      });
    } catch (error) {
      console.log(`Error: `, error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetBooks();
  }, []);

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
            id: bookFromApi?.id,
            title: bookFromApi?.title || "",
            description: bookFromApi?.description || "",
            author: bookFromApi?.author || "",
            genre: bookFromApi?.genre || "",
            image: bookFromApi?.image || "",
            year: bookFromApi?.year || 0,
          }}
          handleUpdate={(e: Book) => setBookFromApi(e)}
        />
      </ModalView>
      <ModalView
        show={modalViewConsent}
        handleClose={() => setModalViewConsent(false)}
      >
        <RemoveBookView
          handleCloseButton={() => {
            setModalViewConsent(false);
            navigate(-1);
          }}
          activeBook={bookFromApi}
        />
      </ModalView>
      <Header label="Bookshelf App" />
      {isLoading && (
        <div className="grow flex justify-center items-center">
          <CustomText
            textLabel={"Loading books ..."}
            fontWeight="font-medium"
            fontSize="text-[24px]"
            fontColor={`text-black`}
          />
        </div>
      )}

      {!isLoading && !bookFromApi && (
        <div className="grow flex justify-center items-center">
          <CustomText
            textLabel={"Oops, something went wrong .."}
            fontWeight="font-medium"
            fontSize="text-[24px]"
            fontColor={`text-red`}
          />
        </div>
      )}
      {!isLoading && bookFromApi && (
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
                  src={bookFromApi?.image}
                  alt="iress-logo"
                  className="w-auto h-[456px]"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-between">
            <CustomText
              textLabel={bookFromApi?.title}
              fontWeight="font-medium"
              fontSize="text-[42px]"
              fontColor={`text-black`}
            />
            <CustomText
              textLabel={bookFromApi?.description}
              fontWeight="font-regular"
              fontSize="text-[24px]"
              fontColor={`text-black`}
            />
            <CustomText
              textLabel={bookFromApi?.author}
              fontWeight="font-thin"
              fontSize="text-[30px]"
              fontColor={`text-black`}
            />
            <CustomText
              textLabel={bookFromApi?.year?.toString() || ""}
              fontWeight="font-thin"
              fontSize="text-[30px]"
              fontColor={`text-black`}
            />

            <CustomText
              textLabel={`Genre: ${bookFromApi?.genre}`}
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
      )}
    </div>
  );
};

export default Details;
