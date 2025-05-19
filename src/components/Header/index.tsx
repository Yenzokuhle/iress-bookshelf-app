import { useState } from "react";
import { BookEditView, ModalView } from "..";
import { CustomText, PrimaryButton } from "../../elements";
import LogoIcon from "/logo.png";

type HeaderProps = {
  label: string;
};

export const Header: React.FC<HeaderProps> = ({ label }: HeaderProps) => {
  const [modalViewNewBook, setModalNewBook] = useState<boolean>(false);

  return (
    <div
      className={`w-full h-auto px-[24px] py-[8px] bg-iress-primary rounded-full flex flex-row justify-between items-center`}
    >
      <ModalView
        show={modalViewNewBook}
        handleClose={() => setModalNewBook(false)}
      >
        <BookEditView
          isUpdate={false}
          handleCloseButton={() => setModalNewBook(false)}
        />
      </ModalView>
      <div className="w-auto h-auto">
        <img src={LogoIcon} alt="iress-logo" className="w-auto h-[68px]" />
      </div>
      <CustomText
        textLabel={label}
        fontWeight="font-regular"
        fontSize="text-[24px]"
        fontColor={`text-white`}
      />

      <div className="w-auto h-auto">
        <PrimaryButton
          label={"Add book"}
          buttonType={"hollow"}
          handleClick={() => setModalNewBook(true)}
          isValid={true}
        />
      </div>
    </div>
  );
};

export default Header;
