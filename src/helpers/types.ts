import * as Yup from "yup";
import { mixed } from "yup";

export const BUTTON_TYPES = {
  button: "button",
  reset: "reset",
  submit: "submit",
} as const;

export const Primary_Button_Types = {
  hollow: "bg-white",
  secondary: "bg-iress-secondary",
  accent: "bg-iress-accent",
} as const;

export const WelcomePageValidation = Yup.object().shape({
  title: Yup.string().required("Book title is required"),
  description: Yup.string().required("Book description is required"),
  author: Yup.string().required("Book author is required"),
  genre: Yup.string().required("Book author is required"),
  image: mixed<File>()
    .test("required", "You need to provide the book image", (file) => {
      if (file?.name !== "") {
        return true;
      }
      return false;
    })
    .required(),
  year: Yup.number().required("Year published is required"),
});

export type SelectChild = {
  id?: string;
  value: string;
  label: string;
};

export type Book = {
  id?: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  image: string;
  year: number;
};

export const DefaultFile: File = {
  lastModified: 0,
  name: "",
  webkitRelativePath: "",
  size: 0,
  type: "",
  bytes: function (): Promise<Uint8Array> {
    throw new Error("Function not implemented.");
  },
  arrayBuffer: function (): Promise<ArrayBuffer> {
    throw new Error("Function not implemented.");
  },
  slice: function (start?: number, end?: number, contentType?: string): Blob {
    throw new Error(
      `Function not implemented. ${start},${end}, ${contentType},`
    );
  },
  stream: function (): ReadableStream<Uint8Array> {
    throw new Error("Function not implemented.");
  },
  text: function (): Promise<string> {
    throw new Error("Function not implemented.");
  },
};
