import { useState, useEffect, useMemo } from "react";
import empData from "../Data/empData.json";

const useEmployeeData = () => {
  const [data, setData] = useState([]);

  // load once
  useEffect(() => {
    setData(empData);
  }, []);

  // preprocess data
  const preprocessedData = useMemo(() => {
    return data.map((item) => {
      const lowered = {};
      for (let key in item) {
        lowered[key] =
          typeof item[key] === "string" ? item[key].toLowerCase() : item[key];
      }
      return { ...item, _lowered: lowered };
    });
  }, [data]);

  // expose getter + setter
  return {
    data: preprocessedData, // getter
    setData, // setter
  };
};

export default useEmployeeData;
