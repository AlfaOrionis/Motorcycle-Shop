import styles from "./Cart.module.css";

const CartHamburger = () => {
  return (
    <div className={styles.cartHamburger}>
      <header>
        <button>
          <i className="fa-solid fa-angle-left " />
        </button>
        <h1>Koszyk</h1>
      </header>

      <main>
        <ul>
          <li>
            <div className={styles.imgWrapper}>
              <img
                src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
                alt="cart_product"
              />
            </div>
            <div className={styles.infoWrapper}>
              <div>
                <p>NAZWA PRODUKTU KASK Xv2</p> <button>x</button>
              </div>
              <div>Kolor: black rozmiar: s</div>
              <div>
                <button>-</button> ile: <span>22</span> <button>+</button>
              </div>
              <div>
                <p>349,00zł</p>
              </div>
            </div>
          </li>
        </ul>
      </main>

      <footer></footer>
    </div>
  );
};

export default CartHamburger;
