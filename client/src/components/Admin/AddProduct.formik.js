import * as Yup from "yup";

export const validation = Yup.object({
  name: Yup.string()
    .min(3, "Name must be atleast 3 characters")
    .required("Name must be atleast 3 characters"),
  brand: Yup.string()
    .test((value) => value !== "Otwórz menu")
    .required("Product needs a brand"),
  category: Yup.mixed()
    .test((value) => value !== "Otwórz menu")
    .required("Product needs a category"),
  properties: Yup.string()
    .required("Enter some properties!")
    .test((value) => value && value.includes(":")),
  description: Yup.string().required("Product must have a description!"),
  s: Yup.number().required("Wprowadź rozmiar S! "),
  m: Yup.number().required("Wprowadź rozmiar M! "),
  l: Yup.number().required("Wprowadź rozmiar L! "),
  xl: Yup.number().required("Wprowadź rozmiar XL! "),
  xxl: Yup.number().required("Wprowadź rozmiar XXL! "),
  price: Yup.number().min(1).max(99999).required("Product must have a price"),
  shipping: Yup.boolean().required("Is shipping free?"),
  file: Yup.mixed(),
});
