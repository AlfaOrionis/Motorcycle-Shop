import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./admin.module.css";
import axios from "axios";
import { getAuthHeader } from "../../utills/tolls";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const AddBrandCategory = () => {
  const dispatch = useDispatch();

  const [brandOrCategory, setBrandOrCategory] = useState("Marka");
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const toggleState = () => {
    setBrandOrCategory((prev) => (prev === "Marka" ? "Kategoria" : "Marka"));
    console.log(brandOrCategory);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTouched(true);

    if (value.length < 1) {
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
              brandName: value,
            }
          : { categoryName: value };

      await axios.post(url, body, getAuthHeader());
      dispatch(
        actions.successGlobal(`${brandOrCategory} ${value} została dodana.`)
      );
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };

  return (
    <div className={styles.AddBrandCategory}>
      <h1 className="pageTitle">Dodaj markę lub kategorię</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className={styles.brandCategoryInput}>
          <Form.Control
            isInvalid={isTouched && value.length < 1}
            onChange={(e) => {
              setIsTouched(true);
              setValue(e.target.value);
              console.log(brandOrCategory);
            }}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Musisz coś wpisać!
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Jeśli chcesz dodać kategorię, przęłącz przyciskiem poniżej!
          </Form.Text>
        </Form.Group>
        <Button style={{ backgroundColor: "green" }} onClick={toggleState}>
          {brandOrCategory === "Marka"
            ? "Dodajesz markę"
            : "Dodajesz kategorię"}
        </Button>

        <Button type="submit">Dodaj</Button>
      </Form>
    </div>
  );
};

export default AddBrandCategory;
