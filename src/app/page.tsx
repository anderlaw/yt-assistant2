"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import axios from "axios";
import Header from "@/components/header";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { loginSignup } from "@/api";
import { setAuth } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "@/lib/store/features/user";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
const LoadingButton = () => {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
};
const getFormData = () => {
  const email = (document.querySelector("#email") as any).value.trim();
  const password = (document.querySelector("#password") as any).value.trim();
  return { email, password };
};
export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const [logined, setLogined] = useState<boolean>(false);

  useEffect(() => {
    userInfo && userInfo.email && setLogined(true);
  }, [userInfo]);
  return (
    <>
      <header className="flex flex-row items-center justify-between py-4 px-7 bg-primary text-primary-foreground">
        <a href="#">YourLibrary</a>

        <section className="flex flex-row items-center justify-between">
          {logined ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" />
                  <AvatarFallback style={{ color: "blue" }}>
                    {userInfo.email}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{userInfo.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>升级</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setAuth(null);
                    dispatch(updateUserInfo({}));
                    setLogined(false);
                  }}
                >
                  退出
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <div className="mr-8">
                <Button asChild>
                  <Link href="#features">功能</Link>
                </Button>
                <Button asChild>
                  <Link href="#pricing">定价</Link>
                </Button>
                <Button asChild>
                  <Link href="#cases">案例</Link>
                </Button>
              </div>
              <Button variant="secondary" onClick={() => setOpen(true)}>
                现在登录
              </Button>
            </>
          )}
        </section>
      </header>
      <main className="flex flex-col items-center justify-between p-24">
        {userInfo.email}
      </main>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          console.log(open);
          if (open === false) {
            setOpen(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>登录/注册</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" defaultValue="" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            {loginLoading ? (
              <LoadingButton />
            ) : (
              <Button
                type="button"
                onClick={() => {
                  const data = getFormData();
                  if (!data.email || !data.password) {
                    alert("输入无效");
                    return;
                  }
                  setLoginLoading(true);
                  //注册
                  axios
                    .post(
                      `/api/user?email=${data.email}&password=${data.password}`
                    )
                    .then((res) => {
                      if (res.status === 200) {
                        setLoginLoading(false);
                        setOpen(false);
                        toast({
                          title: "注册/登录成功！",
                        });
                        //写入auth数据
                        const authData = {
                          email: data.email,
                          //more
                        };
                        dispatch(updateUserInfo(authData));
                        setLogined(true);
                        setAuth(authData);
                      }
                    });
                }}
              >
                确定
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
