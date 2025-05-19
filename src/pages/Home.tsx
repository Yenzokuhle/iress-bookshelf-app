import React, { useState } from "react";
import "../App.css";
import BookOne from "/book-one.jpg";
import BookTwo from "/book-two.jpeg";

import { BookCard, Header, ModalView, RemoveBookView } from "../components";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [modalViewDelete, setModalViewDelete] = useState<boolean>(false);

  return (
    <div className="w-full h-auto bg-white flex flex-col items-center p-[48px] gap-y-10">
      <ModalView
        show={modalViewDelete}
        handleClose={() => setModalViewDelete(false)}
      >
        <RemoveBookView handleCloseButton={() => setModalViewDelete(false)} />
      </ModalView>

      <Header label="Bookshelf App" />

      <div className="w-fit h-auto grid grid-cols-3 gap-6">
        <div className="w-auto h-auto flex justify-center items-center ">
          <BookCard
            title={"Different winter"}
            author={"Mia Jackson"}
            year={"2024"}
            image={BookOne}
            handleIconClick={() => {
              setModalViewDelete(true);
            }}
            handleButtonClick={() => navigate("/book/832745923874")}
          />
        </div>
        <div className="w-auto h-auto flex justify-center items-center">
          <BookCard
            title={"Create your own business"}
            author={"James Murdor"}
            year={"2024"}
            image={BookTwo}
            handleIconClick={() => {
              setModalViewDelete(true);
            }}
            handleButtonClick={() => navigate("/book/832745923874")}
          />
        </div>
        <div className="w-auto h-auto flex justify-center items-center">
          <BookCard
            title={"Different winter"}
            author={"Mia Jackson"}
            year={"2024"}
            image={BookOne}
            handleIconClick={() => {
              setModalViewDelete(true);
            }}
            handleButtonClick={() => navigate("/book/832745923874")}
          />
        </div>
        <div className="w-auto h-auto flex justify-center items-center ">
          <BookCard
            title={"Different winter"}
            author={"Mia Jackson"}
            year={"2024"}
            image={BookOne}
            handleIconClick={() => {
              setModalViewDelete(true);
            }}
            handleButtonClick={() => navigate("/book/832745923874")}
          />
        </div>
        <div className="w-auto h-auto flex justify-center items-center">
          <BookCard
            title={"Create your own business"}
            author={"James Murdor"}
            year={"2024"}
            image={BookTwo}
            handleIconClick={() => {
              setModalViewDelete(true);
            }}
            handleButtonClick={() => navigate("/book/832745923874")}
          />
        </div>
        <div className="w-auto h-auto flex justify-center items-center">
          <BookCard
            title={"Different winter"}
            author={"Mia Jackson"}
            year={"2024"}
            image={BookOne}
            handleIconClick={() => {
              setModalViewDelete(true);
            }}
            handleButtonClick={() => navigate("/book/832745923874")}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
