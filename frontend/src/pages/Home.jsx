import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function Home() {
  return (
    <div style={{ height: "90vh" }}>
      <APIProvider apiKey={"AIzaSyBvteHlt2nfprfyLXqGWNdTohSw_fsrWUo"}>
        <Map zoom={10} center={{ lat: 44.837789, lng: -0.57918 }}></Map>
      </APIProvider>
    </div>
  );
}
