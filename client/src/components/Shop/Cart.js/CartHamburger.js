import { useState } from "react";
import styles from "./Cart.module.css";

const CartHamburger = ({ show, onHandleShow }) => {
  const [showShipping, setShowShipping] = useState(false);

  return (
    <div className={`${styles.cartHamburger} ${show ? styles.active : ""}`}>
      <header>
        <button onClick={() => onHandleShow(false)}>
          <i className="fa-solid fa-angle-left " />
        </button>
        <h1>Koszyk</h1>
        <span></span>
      </header>

      <main id="cart_main">
        <ul>
          <li>
            <div className={styles.imgWrapper}>
              <img
                src="https://res.cloudinary.com/moturcieprzescignie/image/upload/v1646222172/MotorcycleShop_img/1646222170855.jpg"
                alt="cart_product"
              />
            </div>
            <div className={styles.infoWrapper}>
              <div>
                <p>Kask caberg evo v2 aginal abgel</p>
                <button>
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
              </div>
              <div>
                <span>Rozmiar : XXL</span>
              </div>
              <div>
                <button>-</button> <span>ile: 22</span> <button>+</button>
              </div>
              <div>
                <p>349,00zł</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.imgWrapper}>
              <img
                src="https://res.cloudinary.com/moturcieprzescignie/image/upload/v1646222172/MotorcycleShop_img/1646222170855.jpg"
                alt="cart_product"
              />
            </div>
            <div className={styles.infoWrapper}>
              <div>
                <p>Kask caberg evo v2 aginal abgel</p>
                <button>
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
              </div>
              <div>
                <span>Rozmiar : XXL</span>
              </div>
              <div>
                <button>-</button> <span>ile: 22</span> <button>+</button>
              </div>
              <div>
                <p>349,00zł</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.imgWrapper}>
              <img
                src="https://res.cloudinary.com/moturcieprzescignie/image/upload/v1646222172/MotorcycleShop_img/1646222170855.jpg"
                alt="cart_product"
              />
            </div>
            <div className={styles.infoWrapper}>
              <div>
                <p>Kask caberg evo v2 aginal abgel</p>
                <button>
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
              </div>
              <div>
                <span>Rozmiar : XXL</span>
              </div>
              <div>
                <button>-</button> <span>ile: 22</span> <button>+</button>
              </div>
              <div>
                <p>349,00zł</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.imgWrapper}>
              <img
                src="https://res.cloudinary.com/moturcieprzescignie/image/upload/v1646222172/MotorcycleShop_img/1646222170855.jpg"
                alt="cart_product"
              />
            </div>
            <div className={styles.infoWrapper}>
              <div>
                <p>Kask caberg evo v2 aginal abgel</p>
                <button>
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
              </div>
              <div>
                <span>Rozmiar : XXL</span>
              </div>
              <div>
                <button>-</button> <span>ile: 22</span> <button>+</button>
              </div>
              <div>
                <p>349,00zł</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.imgWrapper}>
              <img
                src="https://res.cloudinary.com/moturcieprzescignie/image/upload/v1646222172/MotorcycleShop_img/1646222170855.jpg"
                alt="cart_product"
              />
            </div>
            <div className={styles.infoWrapper}>
              <div>
                <p>Kask caberg evo v2 aginal abgel</p>
                <button>
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
              </div>
              <div>
                <span>Rozmiar : XXL</span>
              </div>
              <div>
                <button>-</button> <span>ile: 22</span> <button>+</button>
              </div>
              <div>
                <p>349,00zł</p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.imgWrapper}>
              <img
                src="https://res.cloudinary.com/moturcieprzescignie/image/upload/v1646222172/MotorcycleShop_img/1646222170855.jpg"
                alt="cart_product"
              />
            </div>
            <div className={styles.infoWrapper}>
              <div>
                <p>Kask caberg evo v2 aginal abgel</p>
                <button>
                  <i className="fa-solid fa-circle-minus"></i>
                </button>
              </div>
              <div>
                <span>Rozmiar : XXL</span>
              </div>
              <div>
                <button>-</button> <span>ile: 22</span> <button>+</button>
              </div>
              <div>
                <p>349,00zł</p>
              </div>
            </div>
          </li>
        </ul>
      </main>

      <footer>
        <div className={styles.shippingDiv}>
          <button onClick={() => setShowShipping((prev) => !prev)}>
            Metody dostawy
          </button>
          {
            <div
              className={`${styles.shippingOptions} ${
                showShipping ? styles.active : ""
              }`}
            >
              <ul>
                <li>
                  <span>Kurier</span> <span>15,00 zł</span>
                </li>
                <li>
                  <span>Kurier za pobraniem</span> <span>15,00 zł</span>
                </li>
                <li>
                  <span>Odbiór osobity</span> <span>0,00 zł</span>
                </li>
                <li>
                  <span>Paczkomat inPost</span> <span>12,00 zł</span>
                </li>
              </ul>
            </div>
          }
        </div>
        <div className={styles.priceDiv}>
          <div>
            <p>W sumie</p> <span>155,00zł</span>
          </div>
          <div>
            <p>Z dostawą</p> <span>210,00zł</span>
          </div>
        </div>
        <button className={styles.submitBtn}>Dalej</button>
      </footer>
    </div>
  );
};

export default CartHamburger;
