// import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import records from "../DB/DB.json"
import Navigationbar from "./Navigationbar";
import TableComponent from "./TableComponent";

export default function BarGraph() {
  const [date, setdate] = useState([])
  const [tableData, settableData] = useState([])
  const [showTable, setshowTable] = useState(false)
  const [monthVal, setmonthVal] = useState()

   const [width, setWidth]   = useState(window.innerWidth);

   const updateDimensions = () => {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
}
useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
}, []);

  useEffect(() => {
    fun()
  }, [])

  useEffect(() => {
    separate()
  }, [date])


  const fun = () => {
    const demo = records.map(data => {
      const pos = data['Date of Purchase'].indexOf('/')
      return data['Date of Purchase'].slice(0, pos)
    }
    )
    setdate(demo)
  }

  const separate = () => {
    let mL = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let fil = []
    for (var j = 1; j <= 12; j++) {
      const a = j.toString()
      const filteredval = date.filter(x => x === a).length
      fil.push({
        count: filteredval,
        month: mL[j - 1],
        monthNum: j
      })
    }
    setmonthVal(fil)
  }

  const displayData = e => {

    const dat = records.filter(data => {
      const pos = data['Date of Purchase'].indexOf('/')
      return data['Date of Purchase'].slice(0, pos) == e.payload.monthNum
    })
    console.log(dat)
    if (dat) { setshowTable(true); settableData(dat) }
  }
  return (
    <>
     {/* <Navigationbar/> */}
     <h2> Bar Graph</h2>
     <div  style={{ margin: "3rem auto" }}>
     <BarChart width={width>768?900:width*0.9 }  height={width*0.34} data={monthVal}  barSize={20}>
        <XAxis dataKey="month" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="count" fill="#8884d8" onClick={(e) => { displayData(e) }} background={{ fill: "#eee" }} />
      </BarChart>
     </div>
     
      <div style={{ marginTop: "3rem", marginLeft: "7%" }}>
        {showTable && <TableComponent search={false} Data={tableData} />}
      </div>
    </>
  );
}