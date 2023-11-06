import { MDBContainer } from "mdb-react-ui-kit";

export default function VideoContainer({ videoUrl }) {
  return (
    <MDBContainer>
      <div className="ratio ratio-16x9">
        <iframe src={videoUrl} title="YouTube video" allowFullScreen></iframe>
      </div>
    </MDBContainer>
  );
}
