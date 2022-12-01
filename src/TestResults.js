import React from "react";
import MeasurementResult from "./MeasurementResult";
import { getConnectionColor, getPingColor } from "./utils";

const TestResults = ({ platforms, download, upload, ping }) => (
  <>
    <h2>Results</h2>
    {platforms.map((platform) => (
      <div key={platform.title}>
        <h3>{platform.title}</h3>

        <MeasurementResult
          type="download"
          color={getConnectionColor(
            download,
            platform.connection.good.download,
            platform.connection.sufficient.download
          )}
        />

        <MeasurementResult
          type="upload"
          color={getConnectionColor(
            upload,
            platform.connection.good.upload,
            platform.connection.sufficient.upload
          )}
        />
        <MeasurementResult
          type="ping"
          color={getPingColor(
            ping,
            platform.connection.good.ping,
            platform.connection.sufficient.ping
          )}
        />
      </div>
    ))}
  </>
);

export default TestResults;
