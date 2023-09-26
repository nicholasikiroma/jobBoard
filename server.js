import app from "./app/index";

port = process.env.PORT || 3000;

app.listen(port, () => {
  `App running on ${port}`;
});
