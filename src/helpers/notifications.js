import { toast } from "react-toastify";

function usedHintNotif(type, amount) {
  toast.info(
    `You have used ${type} Hint, deducting ${amount} ${
      amount > 1 ? "coins" : "coin"
    }!`
  );
}

function notEnoughCoinsNotif() {
  toast.error("You don't have enough coins to use this hint.");
}

function noBorderingNotif() {
  toast.info("This country does not have any bordering countries.");
}

function correctGuessNotif(type, amount) {
  toast.success(
    `You have guessed ${type} country, adding ${amount} ${
      amount > 1 ? "coins" : "coin"
    } to your account!`
  );
}

function wrongGuessNotif() {
  toast.error("You chose the wrong country, deducting 1 coin!");
}

export {
  usedHintNotif,
  notEnoughCoinsNotif,
  noBorderingNotif,
  correctGuessNotif,
  wrongGuessNotif,
};
