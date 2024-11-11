import { Container, Row, Col, Stack } from "react-bootstrap";
function Timer() {
  const fontSizeTimeUnit = "0.8rem";
  return (
    <Container fluid>
      <Row className="justify-content-between p-2 align-items-center bg-secondary bg-opacity-50 text-center text-primary-emphasis rounded-3">
        <Col>
          <Stack>
            <div>03</div>
            <div style={{ fontSize: fontSizeTimeUnit }}>Days</div>
          </Stack>
        </Col>
        <Col>
          <Stack>
            <div>20</div>
            <div style={{ fontSize: fontSizeTimeUnit }}>Hours</div>
          </Stack>
        </Col>
        <Col>
          <Stack>
            <div>45</div>
            <div style={{ fontSize: fontSizeTimeUnit }}>Minutes</div>
          </Stack>
        </Col>
        <Col>
          <Stack>
            <div>02</div>
            <div style={{ fontSize: fontSizeTimeUnit }}>Seconds</div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
export default Timer;
