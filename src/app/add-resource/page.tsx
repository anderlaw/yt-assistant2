"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Header from "@/components/Header";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { loginSignup } from "@/api";
import { setAuth } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "@/lib/store/features/user";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StateButton from "@/components/StateButton";
const getFormData = () => {
  const email = (document.querySelector("#email") as any).value.trim();
  const password = (document.querySelector("#password") as any).value.trim();
  return { email, password };
};
export default () => {
  return (
    <>
      <Header />

      <div className="max-w-screen-md mx-auto mt-10">
        <h2 style={{fontSize:'18px',fontWeight:'bold',marginBottom:'18px'}}>请选择要添加的类型</h2>
        <div className="flex justify-between">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>单个视频</CardTitle>
              <CardDescription>
                针对您喜欢或中意的单独youtube视频，即刻帮您下载同步视频的信息，同时免除广告的烦扰，专注喜欢的事情。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="video-url">视频地址</Label>
                <Input id="video-url" />
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="video-goal">用途/目的</Label>
                <Select>
                  <SelectTrigger id="video-goal" className="w-[180px]">
                    <SelectValue placeholder="用途/目的" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="podcast">播客</SelectItem>
                    <SelectItem value="english-learning">英语学习</SelectItem>
                    <SelectItem value="video">无广告看视频</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <StateButton>确定</StateButton>
            </CardFooter>
          </Card>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>订阅频道</CardTitle>
              <CardDescription>
                订阅您喜欢的youtube频道，定期帮您检查并下载频道的最新视频，节省您的时间，同时免除广告的烦扰。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="channel-url">频道地址</Label>
                <Input id="channel-url" />
              </div>
              <div className="flex flex-col space-y-1.5 mt-4">
                <Label htmlFor="channel-goal">用途/目的</Label>
                <Select>
                  <SelectTrigger id="channel-goal" className="w-[180px]">
                    <SelectValue placeholder="用途/目的" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="podcast">播客</SelectItem>
                    <SelectItem value="english-learning">英语学习</SelectItem>
                    <SelectItem value="video">无广告看视频</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <StateButton>确定</StateButton>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
