import { Button } from "@mui/material";
import { useSetNotesDownloadedMutation } from "@state/api";

const DownloadButton = ({ status, id }) => {
  const [setNotesDownloaded, { isLoading }] = useSetNotesDownloadedMutation();
  const handleClick = () => {
    setNotesDownloaded({
      params: { id },
      body: {
        downloaded: true,
      },
    });
  };
  return (
    <Button
      variant="contained"
      color={status ? "success" : "notdownloaded"}
      size="small"
      onClick={handleClick}
      disabled={isLoading}
    >
      {status ? "Downloaded" : "Not downloaded"}
    </Button>
  );
};

export default DownloadButton;
