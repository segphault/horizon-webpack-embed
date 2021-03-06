
import React from "react";
import ReactDOM from "react-dom";
import App from "./views/app.jsx";

const horizon = Horizon();
const collection = horizon("test");

(async () => {
    await collection.store([{item: 1}, {item: 2}, {item: 3}]).toPromise();
    let items = await collection.order("item").fetch().toArray().toPromise();
    ReactDOM.render(<App items={items} />, document.getElementById("app"));
})();