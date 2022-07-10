import React from "react";
import Header from "./components/Header";
import countriesData from "./data/countries";
import styles from "./App.module.css";
import Table from "./components/Table";
import { useState, useEffect ,useRef} from "react";
import debounce from "lodash/debounce";
import Loader from "./components/Loader";


// error management
function App() {
  const [countries, setCountries] = React.useState([...countriesData]);
  const [trending, setTrending] = useState([...countriesData]);
  const [activeTrending, setActiveTrending] = useState(true);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err,setErr]=useState(false);
  

  const lastAbortController = useRef()

  const getData = (val) => {
    if (lastAbortController.current) {
      lastAbortController.current.abort();
    }
    console.log(`Fetching Data:${val}`);
    const currentAbortController = new AbortController();
    lastAbortController.current = currentAbortController;

    // const currentPromise = fetch(id, {
    //   signal: currentAbortController.signal,
    // }).then(async data => {
    //   return data;
    // });

    // currentPromise.then(
    //   result => setData(result),
    // ).catch(e)=> setErr(true);

    // imitate backend
    try {
      let data=JSON.parse(localStorage.getItem(val));
      if(data){
        setLoading(false);
        setCountries(data);
        return ;
      }
      setTimeout(() => {
        const data = countries.filter(
          (c) => c.name.toLowerCase().includes(val.toLowerCase()) == true
        );
        setCountries(data);
        localStorage.setItem(val,JSON.stringify(data));
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setErr(true);
    }
  };

 
  const delayedHandleChange = React.useRef(
    debounce((eventData) => getData(eventData), 1000)
  ).current;

  const handleChange = (val) => {
    setText(val);
    if (val.length >= 3) {
      setActiveTrending(false);
      setLoading(true)
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
                border:'none',
                borderRadius: "2px",
                padding: "12px 20px",
                backgroundColor:'#F1F1F1'
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
