import "./styles.css";
import TestText from "./TestText";
import TestResults from "./TestResults";
import Error from "./Error";
import { useSpeedTest } from "./utils";

const SpeedTest = ({ platforms = [] }) => {
  const {
    server,
    upload,
    download,
    ping,
    completed,
    error,
    startTest,
    inProgress,
    repeatTest
  } = useSpeedTest();

  return (
    <div className="App">
      {!completed && !inProgress && (
        <button onClick={startTest}>Start test</button>
      )}
      {inProgress && (
        <>
          <TestText text="Testing to" value={server} />
          <TestText
            text="Download"
            value={download[download.length - 1]}
            unit="Mb/s"
          />
          <TestText
            text="Upload"
            value={upload[upload.length - 1]}
            unit="Mb/s"
          />
        </>
      )}
      {completed && (
        <>
          <button onClick={repeatTest}>Repeat test</button>
          <TestResults
            platforms={platforms}
            download={download}
            upload={upload}
            ping={ping}
          />
        </>
      )}
      {error && <Error text={error} />}
    </div>
  );
};

export default SpeedTest;
