import { UserInfo } from "@/lib/store/features/user";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { updateUserInfo } from "@/lib/store/features/user";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { setAuth } from "@/lib/utils";
import {
  updateIsLogined,
  updateLoginDialogOpen,
} from "@/lib/store/features/login";
const Header = () => {
  const isLogined = useAppSelector((state) => state.login.isLogined);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  return (
    <header className="flex flex-row items-center justify-between py-4 px-7 bg-primary text-primary-foreground">
      <a href="#">YourLibrary</a>
      <section className="flex flex-row items-center justify-between">
        {isLogined ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" />
                <AvatarFallback style={{ color: "blue" }}>
                  {userInfo?.email}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{userInfo?.email}</DropdownMenuLabel>
              <DropdownMenuLabel>{'普通等级'}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>升级</DropdownMenuItem>
              <DropdownMenuItem>我的添加</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setAuth(null);
                  dispatch(updateUserInfo(null));
                  dispatch(updateIsLogined(false));
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
            <Button
              variant="secondary"
              onClick={() => dispatch(updateLoginDialogOpen(true))}
            >
              现在登录
            </Button>
          </>
        )}
      </section>
    </header>
  );
};
export default Header;
