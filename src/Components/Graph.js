import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getPoly } from "../Utils/Ploy";

function Graph({ poly }) {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});

  const getTitle = () => {
    if (poly !== undefined) {
      return "Graph for " + poly;
    }
    return "Graph";
  };

  useEffect(() => {
    const makeData = () => {
      let data = [];

      for (let i = -50; i < 50; i++) {
        const parsed_poly = getPoly(poly, i, false);

        data.push([i, eval(parsed_poly)]);
      }

      return data;
    };

    const makeGraph = () => {
      const data = [["X", "Y values"], ...makeData()];

      const options = {
        title: getTitle(),
        hAxis: { title: "X-axis" },
        vAxis: { title: "Y-axis" },
        // trendlines: {
        //   0: {
        //     lineWidth: 5,
        //     color: "red",
        //     opacity: 0.5,
        //     type: "polynomial",
        //     degree: deg,
        //     visibleInLegend: true,
        //   },
        // },
      };

      setData(data);
      setOptions(options);
    };

    if (poly !== undefined) {
      makeGraph();
    }
  }, [poly]);

  return (
    <div>
      <Chart
        chartType="ScatterChart"
        data={data}
        width="100%"
        height="100vh"
        options={options}
      />
    </div>
  );
}

export default Graph;
