import { useState, useCallback } from "react";
import ndt7 from "@m-lab/ndt7";

export const getArrayAverage = (arr) => {
  const average = arr.reduce((p, c) => p + c, 0) / arr.length;
  return Math.round(average * 100) / 100;
};

export const useSpeedTest = () => {
  const [server, setServer] = useState("");
  const [upload, setUpload] = useState([]);
  const [download, setDownload] = useState([]);
  const [ping, setPing] = useState("");
  const [completed, setCompleted] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState();

  const startTest = useCallback(() => {
    setInProgress(true);
    ndt7
      .test(
        {
          userAcceptedDataPolicy: true,
          downloadworkerfile: "./download.worker.js",
          uploadworkerfile: "./upload.worker.js",
          metadata: {
            client_name: "ndt7-html-example"
          }
        },
        {
          serverChosen: function (server) {
            setServer(`${server.machine} (${server.location.city})`);
          },
          downloadMeasurement: function (data) {
            if (data.Source === "client") {
              setDownload((download) => [
                ...download,
                Number(data.Data.MeanClientMbps.toFixed(2))
              ]);
            }
          },
          uploadComplete: function (data) {
            if (data.LastServerMeasurement) {
              setPing(
                (data.LastServerMeasurement.TCPInfo.MinRTT / 1000).toFixed(0)
              );
            }
          },
          uploadMeasurement: function (data) {
            if (data.Source === "server") {
              setUpload((upload) => [
                ...upload,
                Number(
                  (
                    (data.Data.TCPInfo.BytesReceived /
                      data.Data.TCPInfo.ElapsedTime) *
                    8
                  ).toFixed(2)
                )
              ]);
            }
          },
          error: function (err) {
            setError(err.message);
          }
        }
      )
      .then(() => {
        setCompleted(true);
        setInProgress(false);
      });
  }, []);

  const repeatTest = () => {
    setServer("");
    setUpload([]);
    setDownload([]);
    setPing("");
    setCompleted(false);
    setInProgress(false);
    setError("");
    startTest();
  };

  return {
    error,
    server,
    upload,
    download,
    ping,
    completed,
    startTest,
    repeatTest,
    inProgress
  };
};

export const getConnectionColor = (values, good, sufficient) => {
  const average = getArrayAverage(values);
  if (average >= good) {
    return "green";
  } else if (average >= sufficient) {
    return "orange";
  } else {
    return "red";
  }
};

export const getPingColor = (value, good, sufficient) => {
  if (value <= good) {
    return "green";
  } else if (value <= sufficient) {
    return "orange";
  } else {
    return "red";
  }
};
