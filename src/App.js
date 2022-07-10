import React from "react";
import Header from "./components/Header";
import countriesData from "./data/countries";
import styles from "./App.module.css";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import Loader from "./components/Loader";

function App() {
  const [countries, setCountries] = React.useState([...countriesData]);
  const [trending, setTrending] = useState([...countriesData]);
  const [activeTrending, setActiveTrending] = useState(true);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  let cancel=false;
  useEffect(()=>{
    cancel=false;
    return ()=>{
      cancel=true;
    }
  },[countries])
  const getData = (val) => {
    console.log(`Fetching Data:${val}`);
    setLoading(true);
    // imitate backend
    setTimeout(() => {
      const data = countries.filter(
        (c) => c.name.toLowerCase().includes(val.toLowerCase()) == true
      );
      setCountries(data);
      setLoading(false);
    }, 1000);
  };
  const delayedHandleChange = React.useRef(
    debounce((eventData) => getData(eventData), 1000)
  ).current;

  const handleChange = (val) => {
    setText(val);
    if (val.length >= 3) {
      setActiveTrending(false);
      delayedHandleChange(val);
    } else {
      setActiveTrending(true);
    }
  };
  return (
    <>
      <Header />
      <main style={{ marginTop: "5%" }}>
        <center>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="smallcase it..."
              style={{
                width: "40%",
                border: "1px solid black",
                borderRadius: "2px",
                padding: "12px 20px",
              }}
              onChange={(e) => handleChange(e.target.value)}
            ></input>
          </div>
          <div
            className={styles.wrapper}
            style={{
              marginTop: "20px",
              width: "70%",
              overflowX: "scroll",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <Loader />
            ) : (
              <Table
                data={activeTrending ? trending : countries}
                rowsPerPage={5}
              />
            )}
          </div>
        </center>
      </main>
    </>
  );
}

export default App;
