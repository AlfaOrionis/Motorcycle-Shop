import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./admin.module.css";
import axios from "axios";
import { getAuthHeader } from "../../utills/tolls";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { getCategories } from "../../store/actions/categories.actions";
import {
  deleteBrandCategory,
  getBrands,
} from "../../store/actions/brands.actions";

const AddBrandCategory = () => {
  //USE SELECTOR
  const notifications = useSelector((state) => state.notifications);
  const categories = useSelector((state) => state.categories.allCategories);
  const brands = useSelector((state) => state.brands.allBrands);
  const dispatch = useDispatch();

  //USE STATE
  const [brandOrCategory, setBrandOrCategory] = useState("Marka");
  const [name, setName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //USE EFFECT
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    if (notifications && notifications.success) {
      brandOrCategory === "Marka" && dispatch(getBrands());
      brandOrCategory === "Kategoria" && dispatch(getCategories());
    }
  }, [dispatch, notifications, brandOrCategory]);

  //ACTION
  const toggleState = () => {
    setBrandOrCategory((prev) => (prev === "Marka" ? "Kategoria" : "Marka"));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTouched(true);

    if (name.length < 1) {
      return;
    }

    try {
      const url =
        brandOrCategory === "Marka"
          ? "/api/brands/brand"
          : "/api/categories/category";

      const body =
        brandOrCategory === "Marka"
          ? {
              brandName: name,
              description: brandDesc,
            }
          : { categoryName: name };

      await axios.post(url, body, getAuthHeader());
      dispatch(
        actions.successGlobal(`${brandOrCategory} ${name} została dodana.`)
      );
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };

  return (
    <div className={styles.AddBrandCategory}>
      <h1 className="pageTitle">Dodaj markę lub kategorię</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nazwa marki/kategorii</Form.Label>
          <Form.Control
            isInvalid={isTouched && name.length < 1}
            onChange={(e) => {
              setIsTouched(true);
              setName(e.target.value);
            }}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Musisz coś wpisać!
          </Form.Control.Feedback>
        </Form.Group>

        {brandOrCategory === "Marka" && (
          <Form.Group className="mb-3">
            <Form.Label>Opis marki</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => {
                setIsTouched(true);
                setBrandDesc(e.target.value);
              }}
            ></Form.Control>
            <Form.Text className="text-muted">
              Jeśli chcesz dodać kategorię, przęłącz przyciskiem poniżej!
            </Form.Text>
          </Form.Group>
        )}

        <Button style={{ backgroundColor: "green" }} onClick={toggleState}>
          {brandOrCategory === "Marka"
            ? "Dodajesz markę"
            : "Dodajesz kategorię"}
        </Button>

        <Button type="submit">Dodaj</Button>
      </Form>
      {brandOrCategory === "Kategoria" && (
        <ul>
          {categories &&
            categories.map((cat) => (
              <li key={cat._id}>
                <span> {cat.name}</span>
                <button
                  onClick={() => {
                    dispatch(deleteBrandCategory("category", cat._id));
                  }}
                  className={styles.removeBtn}
                >
                  Usuń
                </button>
              </li>
            ))}
        </ul>
      )}

      {brandOrCategory === "Marka" && (
        <ul>
          {brands &&
            brands.map((brand) => (
              <li key={brand._id}>
                <span> {brand.name}</span>
                <button
                  onClick={() => {
                    dispatch(deleteBrandCategory("brand", brand._id));
                  }}
                  className={styles.removeBtn}
                >
                  Usuń
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AddBrandCategory;
