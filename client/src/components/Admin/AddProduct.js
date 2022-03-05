import styles from "./admin.module.css";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { getBrands } from "../../store/actions/brands.actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions/categories.actions";
import { validation } from "./AddProduct.formik";
import { addProduct } from "../../store/actions/products.actions";
import AddProductImg from "./AddProductImg";

import Loader from "../../utills/Loader";

const AddProduct = () => {
  const brands = useSelector((state) => state.brands.allBrands);
  const categories = useSelector((state) => state.categories.allCategories);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //USE EFFECT
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    if (notifications && (notifications.error || notifications.success)) {
      setLoading(false);
    }
  }, [notifications]);

  //FORMIK
  const formik = useFormik({
    initialValues: {
      file: "",
      name: "",
      brand: "",
      category: "",
      description: "",
      properties: "",
      price: "",
      s: 0,
      m: 0,
      l: 0,
      xl: 0,
      xxl: 0,
      shipping: "",
    },
    validationSchema: validation,
    validateOnChange: true,

    onSubmit: (values) => {
      //ADDING PRODUCT ON REDUX
      setLoading(true);
      dispatch(addProduct(values));
    },
  });

  const sizes = ["s", "m", "l", "xl", "xxl"];
  return (
    <Form onSubmit={formik.handleSubmit} className={styles.addProductForm}>
      {loading && <Loader side />}
      <AddProductImg formik={formik} />
      <Form.Group className="mb-3" id="name">
        <Form.Label htmlFor="name">Nazwa produktu</Form.Label>
        <Form.Control
          isInvalid={formik.errors.name && formik.touched.name}
          onChange={formik.handleChange}
          value={formik.values.name}
          type="name"
          placeholder="Nazwa produktu"
          id="name"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" id="description">
        <Form.Label htmlFor="description">Opis produktu</Form.Label>
        <Form.Control
          isInvalid={formik.errors.description && formik.touched.description}
          onChange={formik.handleChange}
          value={formik.values.description}
          type="description"
          as="textarea"
          placeholder="Opis produktu"
          id="description"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.description}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" id="properties">
        <Form.Label htmlFor="properties">Właściwości</Form.Label>
        <Form.Control
          isInvalid={formik.errors.properties && formik.touched.properties}
          onChange={formik.handleChange}
          value={formik.values.properties}
          type="properties"
          as="textarea"
          placeholder="Właściwości"
          id="properties"
        />
        <Form.Text className="text-muted">
          Cechy produktu wpisuj, rozdzielając właściwość od wartości
          dwukropkiem, natomiast do kolejnej cechy przejdź po przecinku, tak jak
          w przykładzie:
          <span style={{ color: "blue" }}>
            Ochraniacze na łokcie: Tak, Wodoodporna: Nie, Materiał: Skóra
            bydlęca
          </span>
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {formik.errors.properties}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" id="brand">
        <Form.Label htmlFor="brand">Marka </Form.Label>
        <Form.Select
          isInvalid={formik.errors.brand && formik.touched.brand}
          onChange={formik.handleChange}
          value={formik.values.brand}
          id="brand"
          type="brand"
          aria-label="Brand select "
        >
          <option value={""}>Otwórz menu</option>
          {brands &&
            brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.brand}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" id="category">
        <Form.Label htmlFor="category">Kategoria </Form.Label>
        <Form.Select
          isInvalid={formik.errors.category && formik.touched.category}
          onChange={formik.handleChange}
          value={formik.values.category}
          id="category"
          type="category"
          aria-label="Category select"
        >
          <option value={""}>Otwórz menu</option>
          {categories &&
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.category}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" id="price">
        <Form.Label htmlFor="price">Cena</Form.Label>
        <Form.Control
          size="sm"
          style={{ width: "50%" }}
          isInvalid={formik.errors.price && formik.touched.price}
          onChange={formik.handleChange}
          value={formik.values.price}
          type="price"
          placeholder="Cena"
          id="price"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.price}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Label>Ilość sztuk dostępnych w danym rozmiarze</Form.Label>
      {sizes.map((size) => {
        return (
          <Form.Group key={size} className="mb-3" id={size}>
            <Form.Label htmlFor="sizes">{`Rozmiar ${size}`} </Form.Label>
            <Form.Control
              size="sm"
              style={{ width: "50%" }}
              isInvalid={formik.errors[size] && formik.touched[size]}
              onChange={formik.handleChange}
              value={formik.values[size]}
              type={size}
              placeholder="Rozmiar"
              id={size}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors[size]}
            </Form.Control.Feedback>
          </Form.Group>
        );
      })}
      <Form.Group className="mb-3" id="shipping">
        <Form.Label htmlFor="shipping">Darmowa dostawa </Form.Label>
        <Form.Select
          isInvalid={formik.errors.shipping && formik.touched.shipping}
          onChange={formik.handleChange}
          value={formik.values.shipping}
          id="shipping"
          type="shipping"
          aria-label="shipping select "
        >
          <option value={""}>Otwórz menu</option>
          <option value={true}>Tak</option>
          <option value={false}>Nie</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.shipping}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Dodaj produkt
      </Button>
    </Form>
  );
};
export default AddProduct;
