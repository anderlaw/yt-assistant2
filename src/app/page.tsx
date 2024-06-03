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
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const [logined, setLogined] = useState<boolean>(false);

  const [resourceList, setResourceList] = useState<
    Array<{
      link: string;
      isChannel: boolean;
      usage: "Podcast" | "Default" | "EnglishLearning";
    }>
  >([]);

  useEffect(() => {
    userInfo && userInfo.email && setLogined(true);
  }, [userInfo]);
  const router = useRouter();
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between p-24">
        {resourceList.length ? (
          <></>
        ) : (
          <div>
            {" "}
            空空如也，赶紧添加youtube视频或频道吧{" "}
            <Button onClick={() => router.push("/add-resource")}>Let's Go</Button>
          </div>
        )}
      </main>
    </>
  );
}
