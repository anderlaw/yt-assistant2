import { createConn } from "@/lib/db";
import fs from "fs";
import { type NextRequest } from 'next/server';
const exec = require("child_process").execSync;
type AddUserParams = {
    email: string
}
// __dirname
//下载资源
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get('url');
    //查询视频id
    console.log('获取视频信息')
    const stdout1 = exec(`yt-dlp -j -s --no-cache-dir ${url}`);
    const videoInfo = JSON.parse(stdout1);
    const videoId = videoInfo.id;
    const videoTitle = videoId.title;

    //读取本地目录，看是否有缓存视频
    const filenames = fs.readdirSync(`./public/${videoId}`).filter(name => name.indexOf('.') !== 0 && name.indexOf('part') === -1);
    if (filenames && filenames.length) {
        return new Response(JSON.stringify({
            title: videoTitle,
            path: `/${videoId}`,
            filenames
        }), {
            status: 200,
        })
    }
    console.log('下载视音频频中')

    fs.writeFileSync('./data.json', 'xxxx')
    const execString = `yt-dlp https://www.youtube.com/watch?v=${videoId} -f "bv[ext=mp4],ba[ext=m4a]" -o "./public/%(id)s/file.%(ext)s"`;
    const stdout = exec(execString, {
        maxBuffer: 1024 * 1024 * 1024,
    });
    console.log('下载视频音频完毕')
    //读取下载的文件
    // fs.readdirSync("./public/"+videoId);
    return new Response(JSON.stringify(
        {
            path: `/${videoId}`,
            title: videoTitle,
            filenames: fs.readdirSync(`./public/${videoId}`)
        }
    ), {
        status: 200,
    })
}