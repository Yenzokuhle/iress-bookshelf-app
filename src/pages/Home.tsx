import React, { useCallback, useEffect, useState } from "react";
import "../App.css";

import { BookCard, Header, ModalView, RemoveBookView } from "../components";
import { useNavigate } from "react-router-dom";
import { CustomText } from "../elements";
import type { Book } from "../helpers/types";

type DataResponse = {
  message: string;
  isSuccess: boolean;
  data: Book[];
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [modalViewDelete, setModalViewDelete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [booksFromApi, setBooksFromApi] = useState<Book[] | undefined>();
  const [bookToDelete, setBookToDelete] = useState<Book | undefined>();

  const handleGetBooks = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `${import.meta.env.VITE_PUBLIC_API_HOST}/api/Book/GetAllBooks`,
        {
          method: "GET",
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
            setBooksFromApi(data?.data);
          } else {
            setBooksFromApi(undefined);
          }
        });
      });
    } catch (error) {
      console.log(`Error: `, error);
      setIsLoading(false);
    }
  };

  const handleDeleteItem = useCallback(
    (item: Book) => {
      const newArray = booksFromApi?.filter(
        (book: Book) => book?.id !== item?.id
      );
      setBooksFromApi(newArray);
    },
    [booksFromApi]
  );

  const handleAddItem = useCallback((item: Book, books: Book[] | undefined) => {
    const newArray = books ? [...books] : [];
    newArray?.push(item);
    setBooksFromApi(newArray);
  }, []);

  useEffect(() => {
    handleGetBooks();
  }, []);

  if (isLoading) {
    return (
      <div className="grow flex justify-center items-center">
        <CustomText
          textLabel={"Loading books ..."}
          fontWeight="font-medium"
          fontSize="text-[24px]"
          fontColor={`text-black`}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-auto bg-white flex flex-col items-center p-[48px] gap-y-10">
      <ModalView
        show={modalViewDelete}
        handleClose={() => setModalViewDelete(false)}
      >
        <RemoveBookView
          handleCloseButton={() => {
            if (bookToDelete) {
              handleDeleteItem(bookToDelete);
              setModalViewDelete(false);
            }
          }}
          activeBook={bookToDelete}
        />
      </ModalView>

      <Header
        label={"Bookshelf App"}
        handleAddItem={(e) => handleAddItem(e, booksFromApi)}
      />

      <div className="w-full h-auto grid grid-cols-3 gap-6">
        {booksFromApi?.length === 0 && !isLoading && (
          <div className="w-full h-full flex flex-row justify-center items-center">
            <CustomText
              textLabel={"No books available, please add some"}
              fontWeight="font-medium"
              fontSize="text-[24px]"
              fontColor={`text-black`}
            />
          </div>
        )}
      </div>

      <div className="w-fit h-auto grid grid-cols-3 gap-6">
        {booksFromApi?.map((item: Book, idx: number) => (
          <BookCard
            key={`book-item-${idx + 1}`}
            title={item?.title}
            author={item?.author}
            year={item?.year?.toString()}
            image={item?.image}
            handleIconClick={() => {
              setModalViewDelete(true);
              setBookToDelete(item);
            }}
            handleButtonClick={() => navigate(`/book/${item?.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
