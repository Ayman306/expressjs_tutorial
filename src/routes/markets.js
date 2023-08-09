const { Router } = require("express");
const router = Router();

const superMarket = [
  {
    id: 1,
    store: "8 Eleven",
    miles: 0.6,
  },
  {
    id: 2,
    store: "Auchan",
    miles: 2,
  },
  {
    id: 3,
    store: "Spar",
    miles: 1,
  },
  {
    id: 4,
    store: "Lidl",
    miles: 1,
  },
  {
    id: 5,
    store: "Tesco",
    miles: 3,
  },
  {
    id: 6,
    store: "Morrisons",
    miles: 8,
  },
];

router.use((req, res, next) => {
  if (req.user) next();
  else {
    res.send(401);
  }
});
router.get("/", (req, res) => {
  const { miles } = req.query;
  console.log(req.query);
  const parsedMiles = parseInt(miles);
  if (!isNaN(parsedMiles)) {
    res.send(superMarket.filter((s) => s.miles <= parsedMiles));
  } else {
    res.send(superMarket);
  }
});

// route paramerters is used to identify resourse lies on the databse
// query parameter is used for sorting/search/filtering operations

module.exports = router;
