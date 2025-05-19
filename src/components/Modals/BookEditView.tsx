import { useEffect, useState, type FC } from "react";
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
};

const BookEditView: FC<BookEditViewProps> = ({
  isUpdate,
  handleCloseButton,
  activeBook,
}: BookEditViewProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

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
  const [selectImage, setSelectedimage] = useState<string | undefined>();

  console.log(`isValid YOW: `, isValid);

  const customHandleSubmit = async (
    dataResults: WelcomePageItem,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    console.log("Submitting results: ", dataResults, errorMessage);
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
      setSelectedimage(activeBook?.image);
      setValue("image", {
        ...DefaultFile,
        name: activeBook?.image,
      });
    }
  }, [activeBook, reset, setSelectedimage, setValue]);

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
                  handleImageChange={setSelectedimage}
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
                          setSelectedimage(undefined);
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
                        label={"Select genre"}
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
                        label={"Year"}
                        type={"number"}
                        hideLabel={true}
                        value={defaultValues?.year?.toString()}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto pt-[24px]">
                  <PrimaryButton
                    label={"Continue"}
                    type={BUTTON_TYPES.submit}
                    buttonType={"secondary"}
                    handleClick={() => null}
                    isValid={isValid}
                  />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default BookEditView;
