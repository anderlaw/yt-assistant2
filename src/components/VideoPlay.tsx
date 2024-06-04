"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Plyr from "plyr";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import {
  updateIsDialogOpen,
  updateVideoInfo,
} from "@/lib/store/features/player";
import { setAuth } from "@/lib/utils";
const getFormData = () => {
  const email = (document.querySelector("#email") as any).value.trim();
  const password = (document.querySelector("#password") as any).value.trim();
  return { email, password };
};
export default () => {
  const loginDialogOpen = useAppSelector(
    (state) => state.login.loginDialogOpen
  );
  const [player, setPlayer] = useState<any>(null);
  const playerOpen = useAppSelector((state) => state.player.isDialogOpen);
  const playerInfo = useAppSelector((state) => state.player.videoInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      const videoEle = document.querySelector("#video-player") as any;
      if (playerOpen && playerInfo && videoEle) {
        videoEle.src = `./${playerInfo.path}/file.mp4`;
        const player = new Plyr("#video-player");
        player.play();
        setPlayer(player);
      }
    });
  }, [playerInfo, playerOpen]);

  useEffect(() => {
    if (player && !playerOpen) {
      player.stop();
      player.destroy();
    }
  }, [playerOpen, player]);
  return (
    <Dialog
      open={playerOpen}
      onOpenChange={(open) => {
        if (open === false) {
          dispatch(updateIsDialogOpen(false));
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>播放</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <video
            style={{
              maxWidth: "800px",
              width: "100%",
            }}
            id="video-player"
          ></video>
        </div>
      </DialogContent>
    </Dialog>
  );
};
