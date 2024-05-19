import { BarChart } from "./Barechart";
import "./index.scss";

export default function Home() {
  return (
    <div className="content">
      <div className="barechart">
        <BarChart
          title={"三大框架"}
          xData={["Vue", "React", "Angular"]}
          sData={[200, 500, 100]}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="barechart">
        <BarChart
          title={"三大框架使用度"}
          xData={["Vue", "React", "Angular"]}
          sData={[2000, 5000, 1000]}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
