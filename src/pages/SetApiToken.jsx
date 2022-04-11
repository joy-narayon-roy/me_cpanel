import React, { useEffect, useState } from "react";
import "../styles/setApiToken.css";

export default function SetApiToken() {
  const url = `${
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_SERVER
      : process.env.REACT_APP_SERVER
  }/cpanel/apikey`;
  const [data, setData] = useState(null);
  const [token, settoken] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        password: process.env.REACT_APP_APIKEY_PASSWORD,
      },
    })
      .then((res) => res.json())
      .then((dat) => {
        setData(dat[0]);
        settoken(dat[0].token);
      })
      .catch((err) => console.log(err));
  }, [url]);

  const handelInput = ({ target }) => {
    if (target.name === "password") {
      setpassword(target.value);
    } else {
      settoken(target.value);
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(password, token);

    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        password: password,
        key: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="container">
      <form onSubmit={handelSubmit} className="updatekey" id="dataform1">
        <h1>Set Api Token {data && `(${data.name})`}</h1>
        {data && (
          <>
            <div>
              <label>Password</label>
              <input
                required
                type="password"
                name="password"
                onChange={handelInput}
                value={password}
              />
            </div>

            <div>
              <label>Token</label>
              <textarea name="token" onChange={handelInput} value={token} />
            </div>
          </>
        )}

        <button
          disabled={
            process.env.REACT_APP_APIKEY_PASSWORD === password ? false : true
          }
          type="submit"
        >
          Set
        </button>

        <div className="status">
          <b>
            Updated at :- {data && new Date(data.updatedAt).toLocaleString()}
          </b>
        </div>
      </form>
    </section>
  );
}
