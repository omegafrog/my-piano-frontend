import { Button } from "react-bootstrap";
import Navigator from "../components/Navigator";
import axios from "axios";
import elasticsearch from "elasticsearch";

function Main() {
  let client = new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace",
  });
  return (
    <div className="Main">
      <Navigator />
      <Button
        onClick={(e) => {
          client
            .search({
              q: "인생의 회전목마",
            })
            .then((response) => {
              console.log("response:", response);
            });
        }}
      >
        하이
      </Button>
    </div>
  );
}
export default Main;
