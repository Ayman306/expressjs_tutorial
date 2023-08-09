const { Router } = require("express");
const router = Router();

const list = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "bread",
    quantity: 3,
  },
  {
    item: "eggs",
    quantity: 1,
  },
];
router.use((req, res, next) => {
  if (req.user) next();
  else {
    res.send(401);
  }
});
// cookie:- can use as a guest user cart, if the user has to be shown popup only ones a DynamicsCompressorNode, it can be done
// maxAge is the time the cookie expires , itll be stored on the browser
router.get("/", (req, res) => {
  res.cookie("visited", true, {
    maxAge: 5000,
  });
  res.status(200);
  res.send(list);
});

router.get("/:item", (req, res) => {
  console.log(req.cookies);
  console.log("item on pwrams");
  const { item } = req.params;
  const gitem = list.find((g) => g.item === item);
  res.status(200);
  res.send(gitem);
});

router.post("/", (req, res) => {
  console.log(req.body);
  list.push(req.body);
  res.status(201);
});

// session is stored on server side
router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("Nothing");
  } else {
    res.send(cart);
  }
});

router.post("/shopping/cart", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  console.log(cartItem);
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});
module.exports = router;
