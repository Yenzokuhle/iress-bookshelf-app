import { useCallback, useEffect, useState, type FC } from "react";
import {
  CustomText,
  IconButton,
  ImageButton,
  PrimaryButton,
  TextInputField,
  LongTextInputField,
  SelectInputField,
} from "../../elements";
import { IoMdClose } from "react-icons/io";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BUTTON_TYPES,
  DefaultFile,
  WelcomePageValidation,
  type Book,
} from "../../helpers/types";
import { MdDeleteOutline } from "react-icons/md";
import BookCard from "../BookCard";

type WelcomePageItem = {
  title: string;
  description: string;
  author: string;
  genre: string;
  image: File;
  year: number;
};

const WelcomePageDefaultValues: WelcomePageItem = {
  title: "",
  description: "",
  author: "",
  genre: "",
  image: DefaultFile,
  year: 0,
};

type BookEditViewProps = {
  isUpdate: boolean;
  handleCloseButton: () => void;
  activeBook?: Book;
  handleUpdate?: (e: Book) => void;
};
type DataResponse = {
  message: string;
  isSuccess: boolean;
  data: Book;
};

const BookEditView: FC<BookEditViewProps> = ({
  isUpdate,
  handleCloseButton,
  activeBook,
  handleUpdate,
}: BookEditViewProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bookFromApi, setBookFromApi] = useState<Book | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { defaultValues, isValid },
    ...rest
  } = useForm<WelcomePageItem>({
    resolver: yupResolver(WelcomePageValidation),
    defaultValues: WelcomePageDefaultValues,
  });
  const [selectImage, setSelectedImage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateItem = useCallback(async (dataResults: WelcomePageItem) => {
    const payloadInput = {
      title: dataResults?.title,
      description: dataResults?.description,
      author: dataResults?.author,
      genre: dataResults?.genre,
      imageName: "",
      year: dataResults?.year,
    };

    try {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_PUBLIC_API_HOST}/api/Book/AddBook`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(payloadInput),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then(async (data: DataResponse) => {
          console.log(`DATA: `, data);
          //setIsLoading(false);
          if (data?.isSuccess) {
            console.log(`Got it here: `, data?.data?.id);
            handleCreateImage(data?.data?.id || "", dataResults?.image);
          } else {
            setErrorMessage("Oops, something went wrong");
            setIsLoading(false);
          }
        });
      });
    } catch (error) {
      console.log(`Error: `, error);
      setIsLoading(false);
    }
  }, []);

  const handleCreateImage = useCallback(
    async (bookID: string, selectImage: File) => {
      const form = new FormData();
      form.append("BookId", bookID);
      form.append("BookImage", selectImage);
      console.log(`form: `, form.entries(), bookID);

      try {
        setIsLoading(true);
        await fetch(
          `${import.meta.env.VITE_PUBLIC_API_HOST}/api/Book/UploadImage`,
          {
            method: "POST",
            mode: "cors",
            body: form,
          }
        ).then((res) => {
          res.json().then(async (data: DataResponse) => {
            console.log(`DATA: `, data);
            setIsLoading(false);
            if (data?.isSuccess && data?.data) {
              setBookFromApi({
                id: data?.data?.id,
                title: data?.data?.title,
                description: data?.data?.description,
                author: data?.data?.author,
                genre: data?.data?.genre,
                image: data?.data?.image,
                year: data?.data?.year,
              });
            } else {
              setErrorMessage("Oops, something went wrong");
            }
          });
        });
      } catch (error) {
        console.log(`Error: `, error);
        setIsLoading(false);
      }
    },
    []
  );

  const handleUpdateImage = useCallback(
    async (bookID: string, selectImage: File) => {
      const form = new FormData();
      form.append("BookId", bookID);
      form.append("BookImage", selectImage);

      try {
        setIsLoading(true);
        await fetch(
          `${import.meta.env.VITE_PUBLIC_API_HOST}/api/Book/UpdateOldImage`,
          {
            method: "POST",
            mode: "cors",
            body: form,
          }
        ).then((res) => {
          res.json().then(async (data: DataResponse) => {
            console.log(`DATA: `, data);
            setIsLoading(false);
            if (data?.isSuccess && data?.data && handleUpdate) {
              handleUpdate(data.data);
              handleCloseButton();
              setBookFromApi(data?.data);
            } else if (
              !data?.isSuccess &&
              data?.data &&
              data?.message?.includes("No new image to upload") &&
              handleUpdate
            ) {
              handleUpdate(data.data);
              handleCloseButton();
              setBookFromApi(data?.data);
            } else {
              setErrorMessage("Oops, something went wrong");
            }
          });
        });
      } catch (error) {
        console.log(`Error: `, error);
        setIsLoading(false);
      }
    },
    []
  );

  const handleUpdateItem = useCallback(async (dataResults: WelcomePageItem) => {
    const payloadInput = {
      id: parseInt(activeBook?.id || "0"),
      title: dataResults?.title,
      description: dataResults?.description,
      author: dataResults?.author,
      genre: dataResults?.genre,
      ImageName: activeBook?.image,
      year: dataResults?.year,
    };

    console.log(`payloadInput: `, payloadInput);

    try {
      setIsLoading(true);
      await fetch(
        `${import.meta.env.VITE_PUBLIC_API_HOST}/api/Book/UpdateBook`,
        {
          method: "PATCH",
          body: JSON.stringify(payloadInput),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        res.json().then(async (data: DataResponse) => {
          console.log(`DATA: `, data);

          if (data?.isSuccess) {
            console.log(`Is it here: `, dataResults?.image);

            if (dataResults?.image?.size !== 0) {
              handleUpdateImage(data?.data?.id || "", dataResults?.image);
            }

            if (handleUpdate) {
              handleUpdate(data.data);
              handleCloseButton();
              setBookFromApi(data?.data);
            }
          } else {
            setErrorMessage("Oops, something went wrong");
            setIsLoading(false);
          }
        });
      });
    } catch (error) {
      console.log(`Error: `, error);
      setIsLoading(false);
    }
  }, []);

  const customHandleSubmit = async (
    dataResults: WelcomePageItem,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    setIsLoading(true);

    if (!isUpdate) {
      handleCreateItem(dataResults);
    } else {
      handleUpdateItem(dataResults);
    }
  };

  // eslint-disable-next-line
  const onError = (errors: any) => {
    setErrorMessage(errors);
    console.log("Submitting onError: ", errors);
  };

  useEffect(() => {
    reset({
      title: activeBook?.title || "",
      description: activeBook?.description || "",
      author: activeBook?.author || "",
      genre: activeBook?.genre || "",
      image: !activeBook?.image ? DefaultFile : undefined,
      year: activeBook?.year || 0,
    });

    if (activeBook) {
      setSelectedImage(activeBook?.image);
      setValue("genre", activeBook?.genre);
      setValue("image", {
        ...DefaultFile,
        name: activeBook?.image,
      });
    }
  }, [activeBook, reset, setSelectedImage, setValue]);

  return (
    <div className="w-[700px] h-auto flex flex-col gap-y-4 bg-white rounded-[24px] mMD:rounded-[20px] overflow-hidden py-8 relative pr-[24px]">
      <div className="w-full h-auto bg-iress-primary flex flex-row justify-between px-[20px] py-[16px] rounded-r-full">
        <CustomText
          textLabel={isUpdate ? "Update book" : "Create new book"}
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
      <div className="w-full h-auto flex flex-row pl-[16px] pt-[16px]">
        {!bookFromApi && (
          <FormProvider
            control={control}
            handleSubmit={handleSubmit}
            reset={reset}
            setValue={setValue}
            formState={formState}
            {...rest}
          >
            <form
              onSubmit={handleSubmit(customHandleSubmit, onError)}
              className="w-full h-full flex flex-row"
            >
              <div className="w-full h-auto px-[24px] flex justify-center items-center">
                {!selectImage && (
                  <ImageButton
                    handleImageChange={setSelectedImage}
                    name={"image"}
                  />
                )}
                {selectImage && (
                  <div className="w-fit h-full border-solid border-l-[1.5px] border-r-[1.5px] border-b-[1.5px] border-[#E2E2E2] rounded-[20px] overflow-hidden relative">
                    <img
                      src={selectImage}
                      alt="iress-logo"
                      className="w-auto max-h-[400px]"
                    />
                    <div className="w-auto h-auto absolute bottom-[16px] right-[8px]">
                      <IconButton isNegative={true} handleClick={() => null}>
                        <MdDeleteOutline
                          className="w-[24px] h-[24px]"
                          onClick={() => {
                            setSelectedImage(undefined);
                            setValue("image", DefaultFile);
                          }}
                          fill="#EB5362"
                        />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-full flex flex-col gap-y-8 justify-center">
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="w-full h-auto flex flex-col gap-y-6">
                    <div className="w-full h-auto self-start">
                      <TextInputField
                        name={"title"}
                        label={"Title"}
                        type={"string"}
                        hideLabel={false}
                        value={defaultValues?.title}
                      />
                    </div>
                    <div className="w-full h-auto self-start">
                      <LongTextInputField
                        name={"description"}
                        label={"Description"}
                        placeholder={"Enter book description here"}
                        type={"text"}
                        hideLabel={false}
                        value={defaultValues?.description}
                      />
                    </div>
                    <div className="w-full h-auto self-start">
                      <TextInputField
                        name={"author"}
                        label={"Author"}
                        type={"text"}
                        hideLabel={false}
                        value={defaultValues?.author}
                      />
                    </div>

                    <div className="w-full h-auto flex flex-row justify-between items-center">
                      <CustomText
                        textLabel={"Genre"}
                        fontWeight="font-regular"
                        fontSize="text-[20px]"
                        fontColor={`text-black`}
                      />
                      <div className="min-w-[140px] h-auto">
                        <SelectInputField
                          name={"genre"}
                          label={"Genre"}
                          handleValueChange={(e: string) => {
                            setValue("genre", e);
                          }}
                          value={defaultValues?.genre}
                        />
                      </div>
                    </div>
                    <div className="w-full h-auto flex flex-row justify-between items-center">
                      <CustomText
                        textLabel={"Year"}
                        fontWeight="font-regular"
                        fontSize="text-[20px]"
                        fontColor={`text-black`}
                      />
                      <div className="w-[140px] h-auto">
                        <TextInputField
                          name={"year"}
                          label={"Release year"}
                          type={"number"}
                          hideLabel={true}
                          value={activeBook?.id?.toString()}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-auto pt-[24px]">
                    {isLoading ? (
                      <CustomText
                        textLabel={"Loading ..."}
                        fontWeight="font-medium"
                        fontSize="text-[24px]"
                        fontColor={`text-black`}
                      />
                    ) : (
                      <PrimaryButton
                        label={"Continue"}
                        type={BUTTON_TYPES.submit}
                        buttonType={"secondary"}
                        handleClick={() => null}
                        isValid={isValid}
                      />
                    )}
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        )}

        {bookFromApi && (
          <div className="w-full h-auto flex flex-row pl-[24px]">
            <div className="w-full h-auto">
              <BookCard
                title={bookFromApi?.title}
                author={bookFromApi?.author}
                year={bookFromApi?.year.toString()}
                image={bookFromApi?.image}
                handleIconClick={() => null}
                handleButtonClick={() => null}
                hideActions={true}
              />
            </div>
            <div className="w-full h-full flex flex-col gap-y-8 justify-center">
              <div className="w-full h-auto flex flex-col gap-y-2">
                <CustomText
                  textLabel={
                    "You have successfully added a new book to the shelf!"
                  }
                  fontWeight="font-regular"
                  fontSize="text-[22px]"
                  fontColor={`text-black`}
                />

                <CustomText
                  textLabel={bookFromApi?.title}
                  fontWeight="font-medium"
                  fontSize="text-[22px]"
                  fontColor={`text-black`}
                />
              </div>
              <div className="w-full h-auto flex flex-col gap-y-2">
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
                      label={"Done"}
                      buttonType={"secondary"}
                      handleClick={handleCloseButton}
                      isValid={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookEditView;
