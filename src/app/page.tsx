"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { loginSignup } from "@/api";
import { setAuth } from "@/lib/utils";
import { updateUserInfo } from "@/lib/store/features/user";
import { updateIsDialogOpen,updateVideoInfo } from "@/lib/store/features/player";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import StateButton from "@/components/StateButton";
import VideoPlay from "@/components/VideoPlay";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const [resourceList, setResourceList] = useState<
    Array<{
      link: string;
      isChannel: boolean;
      usage: "Podcast" | "Default" | "EnglishLearning";
    }>
  >([]);

  return (
    <>
      <Header />
      <VideoPlay />
      <main className="flex flex-col items-center justify-between">
        {resourceList.length ? (
          <></>
        ) : (
          <div>
            <h2
              style={{
                textAlign: "center",
                margin: "30px auto",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              输入视频链接马上去广告观看！
            </h2>
            {/* <Button onClick={() => router.push("/add-resource")}>Let's Go</Button> */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="video-url" className="text-right">
                视频链接
              </Label>
              <Input id="video-url" defaultValue="" className="col-span-3" />
            </div>
            <div className="flex justify-end mt-5">
              <StateButton
                loading={loading}
                onClick={() => {
                  const url = (
                    document.querySelector("#video-url") as any
                  ).value.trim();
                  if (!url) {
                    alert("输入有误！");
                    return;
                  }
                  setLoading(true);
                  axios.get(`/api/download?url=${url}`).then((res) => {
                    setLoading(false);
                    if (res.status === 200 && res.data) {
                      console.log(res.data);
                      dispatch(updateVideoInfo(res.data));
                      dispatch(updateIsDialogOpen(true));
                      /**
                       * filenames:[],
                       * path:'/videoId
                       */
                    }
                  });
                }}
              >
                确定
              </StateButton>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
