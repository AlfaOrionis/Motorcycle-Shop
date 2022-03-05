import { Form } from "react-bootstrap";

const AddProductImg = ({ formik }) => {
  return (
    <Form.Group className="position-relative mb-3">
      <Form.Label>Dodaj zdjęcia</Form.Label>
      <Form.Control
        type="file"
        name="file"
        multiple
        onChange={(e) => {
          formik.setFieldValue("file", e.target.files);
        }}
      />
      <Form.Text style={{ textDecoration: "underline", fontWeight: "500" }}>
        Nie dodawaj więcej niż 10 zdjęć za jednym razem! Zadbaj o jak
        najmniejszą wagę zdjęcia (mile widziane zdjęcia o wadze nie
        przekraczającej 200 kb)
      </Form.Text>
    </Form.Group>
  );
};

export default AddProductImg;
