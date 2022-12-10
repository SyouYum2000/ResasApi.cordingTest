import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [prefPopulation, setPrefPopulation] = useState([]);
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.REACT_APP_API_KEY }
      })
      .then((res) => {
        setPrefectures(res.data.result);
      });
  }, []);
  const handleChange = async (e) => {
    const res = await axios.get(
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
        e.target.value,
      {
        headers: { "X-API-KEY": process.env.REACT_APP_API_KEY }
      }
    );
    setPrefPopulation(res.data.result.data[0].data);
  };
  return (
    <div className="App">
      <h1>日本の人口データ</h1>
      <div className="Select">
        <h2>都道府県</h2>
        <select onChange={handleChange}>
          <option hidden>選択してね</option>
          {prefectures.map((prefecture) => {
            return (
              <option key={prefecture.prefCode} value={prefecture.prefCode}>
                {prefecture.prefName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="Table">
        <table>
          <tr>
            <th>年度</th>
            <th>総人口</th>
          </tr>
          {prefPopulation.map((item) => {
            return (
              <tr key={item.value}>
                <td>{item.year}</td>
                <td>{item.value}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

// process.env.REACT_APP_API_KEY
