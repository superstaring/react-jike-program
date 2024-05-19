import { useEffect, useState } from "react";
import { getchannels } from "@/apis/publish";

function useChannel() {
  const [channels, setChannel] = useState([]);

  useEffect(() => {
    const getchannelsList = async () => {
      const res = await getchannels();
      setChannel(res.data.channels);
    };

    getchannelsList();
  }, []);

  return {
    channels,
  };
}

export { useChannel };
