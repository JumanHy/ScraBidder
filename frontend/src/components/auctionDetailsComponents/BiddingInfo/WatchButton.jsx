import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Eye, EyeFill } from "react-bootstrap-icons";

function WatchButton() {
  const [isInWatchList, setIsInWatchList] = useState(false);
  const toggleWatchList = () => {
    setIsInWatchList(!isInWatchList);
  };
  return (
    <Button onClick={toggleWatchList} variant="light">
      <Stack direction="horizontal" className="gap-2">
        {isInWatchList ? (
          <EyeFill color="#003a70" size={24} />
        ) : (
          <Eye color="#003a70" size={24} />
        )}
        <span>{isInWatchList ? "Unwatch" : "Watch"}</span>
      </Stack>
    </Button>
  );
}
export default WatchButton;
