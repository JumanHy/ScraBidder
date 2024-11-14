import { Container, Row, Col, Stack } from "react-bootstrap";
import FlipCountdown from "@rumess/react-flip-countdown";
function Timer() {
  return (
    <Container fluid>
      <Row className="justify-content-between p-2  align-items-center bg-secondary bg-opacity-50 text-center text-primary-emphasis rounded-3">
        <FlipCountdown
          endAt="2024-11-18 23:55:55"
          size="small"
          titlePosition="top"
          hideYear
          hideMonth
          dayTitle="Days"
          hourTitle="Hours"
          minuteTitle="Mins"
          secondTitle="Secs"
        />
      </Row>
    </Container>
  );
}
export default Timer;
