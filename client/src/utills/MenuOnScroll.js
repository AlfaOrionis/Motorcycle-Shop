import styles from "../components/Shop/ProductDetails.module.css";

//This is function is used on productDetails in Shop folder

let done = false;
export const showMenu = (buySection, shoppingColumn, newsLetter) => {
  console.log("AWD");
  if (window.scrollY > buySection.offsetHeight + buySection.offsetTop) {
    shoppingColumn.classList.add(`${styles.shoppingColumnActive}`);
  }
  if (window.scrollY < buySection.offsetHeight + buySection.offsetTop) {
    shoppingColumn.classList.remove(`${styles.shoppingColumnActive}`);
  }
  //Place of contact is the height at which shoppingColumn touches the newsLetter sphere (including 20px margin)
  const placeOfContact =
    newsLetter.offsetTop -
    window.innerHeight +
    (window.innerHeight -
      shoppingColumn.offsetHeight -
      shoppingColumn.offsetTop -
      20);
  //This is actually the same height but since the position has been changed to absolute, the values also changed so i had to calculate it again
  const backToFixed =
    newsLetter.offsetTop -
    window.innerHeight +
    (window.innerHeight -
      shoppingColumn.offsetHeight -
      window.innerHeight * 0.05) -
    20; //20px are margins, and 0.05 is just 5vh which is value of position fixed top in css
  if (window.scrollY > placeOfContact) {
    if (!done) {
      console.log("DODANIE POSITION");
      shoppingColumn.style.position = "absolute";
      shoppingColumn.style.top = placeOfContact + 36 + "px";

      done = true;
    }
  }

  if (window.scrollY < backToFixed && done) {
    console.log("USUNIECIE POSITION");
    console.log(backToFixed);
    shoppingColumn.removeAttribute("style");

    done = false;
  }
};
