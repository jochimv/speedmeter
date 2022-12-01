import React from "react";
import SpeedTest from "./SpeedTest";

const platforms = [
  {
    title: "LISA",
    connection: {
      good: { download: 20, upload: 2, ping: 250 },
      sufficient: { download: 5, upload: 1, ping: 300 }
    }
  },
  {
    title: "HUGO",
    connection: {
      good: { download: 10, upload: 5, ping: 10 },
      sufficient: { download: 1, upload: 1, ping: 50 }
    }
  }
];

const App = () => <SpeedTest platforms={platforms} />;

export default App;
