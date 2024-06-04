"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  updateIsLogined,
  updateLoginDialogOpen,
} from "@/lib/store/features/login";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { useState } from "react";
import StateButton from "./StateButton";
import { useToast } from "./ui/use-toast";
import { updateUserInfo } from "@/lib/store/features/user";
import { setAuth } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
const getFormData = () => {
  const email = (document.querySelector("#email") as any).value.trim();
  const password = (document.querySelector("#password") as any).value.trim();
  return { email, password };
};
export default () => {
  const loginDialogOpen = useAppSelector(
    (state) => state.login.loginDialogOpen
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const fetchData = async () => {};
  return (
    <Dialog
      open={loginDialogOpen}
      onOpenChange={(open) => {
        console.log(open);
        if (open === false) {
          dispatch(updateLoginDialogOpen(false));
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
          <div
            style={{ fontSize: "14px" }}
            className="flex justify-end items-center mt-4"
          >
            <span style={{ color: "red" }}>⚠️</span>
            未注册的邮箱会自动注册，已注册过请使用正确的邮箱和密码登录！
          </div>
        </div>
        <DialogFooter>
          <StateButton
            loading={loginLoading}
            onClick={function (): void {
              const data = getFormData();
              if (!data.email || !data.password) {
                alert("输入无效");
                return;
              }
              setLoginLoading(true);
              //注册
              axios
                .post(`/api/user?email=${data.email}&password=${data.password}`)
                .then((res) => {
                  setLoginLoading(false);
                  if (res.status === 200 && res.data.status === true) {
                    dispatch(updateLoginDialogOpen(false));
                    dispatch(updateIsLogined(true));

                    //写入auth数据
                    const authData = {
                      email: data.email,
                      //more
                    };
                    dispatch(updateUserInfo(authData));
                    setAuth(authData);
                    toast({
                      title: "登录/注册成功！",
                    });
                  } else {
                    toast({
                      title: "操作失败，请稍后重试！",
                      variant: "destructive",
                    });
                  }
                });
            }}
          >
            确定
          </StateButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
